// ============================================================
// FREE SPEECH v2 - Game Engine
// Free conversation scoring, state management, game loops
// ============================================================

(function () {
  "use strict";

  // ── ConversationScorer ─────────────────────────────────────
  class ConversationScorer {
    score(spokenText, challenge) {
      const words = spokenText.toLowerCase().split(/\s+/).filter(w => w.length > 0);
      const wordCount = words.length;
      const uniqueWords = new Set(words);
      const spoken = spokenText.toLowerCase();

      // 1. Topic Relevance (40%)
      let keywordHits = 0;
      for (const kw of challenge.topicKeywords) {
        if (spoken.includes(kw)) keywordHits++;
      }
      const expectedMin = Math.min(3, challenge.topicKeywords.length);
      const relevanceScore = Math.min(100, (keywordHits / expectedMin) * 100);

      // 2. Vocabulary Richness (25%)
      let vocabScore = Math.min(60, (uniqueWords.size / Math.max(5, wordCount * 0.7)) * 60);
      let bonusHits = 0;
      if (challenge.bonusVocab) {
        for (const bv of challenge.bonusVocab) {
          if (spoken.includes(bv.toLowerCase())) bonusHits++;
        }
        vocabScore += Math.min(40, bonusHits * 15);
      }
      vocabScore = Math.min(100, vocabScore);

      // 3. Sentence Quality (20%)
      const connectors = GAME_DATA.connectors;
      let connectorCount = 0;
      for (const c of connectors) {
        if (spoken.includes(c)) connectorCount++;
      }
      const hasCapI = /\bI\b/.test(spokenText);
      const sentences = spokenText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const avgWordsPerSentence = wordCount / Math.max(1, sentences.length);
      let sentenceScore = 0;
      sentenceScore += Math.min(40, connectorCount * 15);
      sentenceScore += avgWordsPerSentence >= 5 ? 30 : avgWordsPerSentence >= 3 ? 15 : 0;
      sentenceScore += hasCapI ? 10 : 0;
      sentenceScore += sentences.length >= 2 ? 20 : 0;
      sentenceScore = Math.min(100, sentenceScore);

      // 4. Speech Length (15%)
      let lengthScore;
      if (wordCount < 5) lengthScore = 0;
      else if (wordCount < 10) lengthScore = 25;
      else if (wordCount < 20) lengthScore = 60;
      else if (wordCount < 30) lengthScore = 85;
      else lengthScore = 100;

      // Final weighted score
      const finalScore = Math.round(
        relevanceScore * 0.40 +
        vocabScore * 0.25 +
        sentenceScore * 0.20 +
        lengthScore * 0.15
      );

      // Stars: >=70 = 3, >=40 = 2, >=15 = 1
      let stars;
      if (finalScore >= 70) stars = 3;
      else if (finalScore >= 40) stars = 2;
      else if (finalScore >= 15) stars = 1;
      else stars = 0;

      // Response tier
      let tier;
      if (relevanceScore < 15) tier = "off_topic";
      else if (stars >= 3) tier = "great";
      else if (stars >= 2) tier = "good";
      else tier = "weak";

      return {
        finalScore, stars, tier, wordCount,
        relevance: Math.round(relevanceScore),
        vocabulary: Math.round(vocabScore),
        sentences: Math.round(sentenceScore),
        length: Math.round(lengthScore),
        bonusWordsUsed: bonusHits,
        keywordsHit: keywordHits
      };
    }
  }

  // ── State ──────────────────────────────────────────────────
  const DEFAULT_STATE = {
    character: null,
    level: 1,
    xp: 0,
    gold: 0,
    goldEarned: 0,
    hp: 5,
    maxHp: 5,
    streak: 0,
    lastPlayDate: null,
    challengesCompleted: 0,
    perfectCount: 0,
    consecutivePerfect: 0,
    bossesDefeated: [],
    achievements: [],
    inventory: {},
    equippedItems: {},
    titles: [],
    activeTitle: null,
    activeEffects: [],
    arenaBest: 0,
    dailyQuests: null,
    dailyQuestDate: null,
    shopPurchases: 0,
    wordsSpoken: 0,
    tavernNpcsVisited: [],
    realmStats: {
      storytellers_glen: { completed: 0, perfect: 0 },
      wordsmiths_workshop: { completed: 0, perfect: 0 },
      council_chamber: { completed: 0, perfect: 0 },
      quick_wit_arena: { completed: 0, bestScore: 0 },
      dragons_lair: { completed: 0, bossesDefeated: 0 },
      tavern: { completed: 0, npcsVisited: [] }
    }
  };

  let state = {};
  let currentScreen = "title";

  // ── Speech API ─────────────────────────────────────────────
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSynth = window.speechSynthesis;
  let recognition = null;
  let isListening = false;
  let micPermissionGranted = null;

  function speak(text, callback) {
    if (!speechSynth) { if (callback) callback(); return; }
    speechSynth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    utter.pitch = 1;
    if (callback) utter.onend = callback;
    speechSynth.speak(utter);
  }

  async function requestMicPermission() {
    if (micPermissionGranted === true) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      micPermissionGranted = true;
      return true;
    } catch (e) {
      micPermissionGranted = false;
      notify("Microphone access denied. Please allow mic access in browser settings.");
      return false;
    }
  }

  async function startListening(button, callback) {
    if (!SpeechRecognition) {
      notify("Speech recognition not supported. Try Chrome!");
      return;
    }
    if (isListening) return;

    const permitted = await requestMicPermission();
    if (!permitted) return;

    // Cleanup previous
    if (recognition) {
      try { recognition.abort(); } catch (e) { /* ignore */ }
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;
    isListening = true;

    if (button) button.classList.add("listening");
    updateMicStatus("listening");

    // 10-second timeout
    const timeoutId = setTimeout(() => {
      if (isListening) {
        try { recognition.stop(); } catch (e) { /* ignore */ }
        isListening = false;
        if (button) button.classList.remove("listening");
        updateMicStatus("ready");
        notify("No speech detected. Tap to try again!");
      }
    }, 10000);

    recognition.onresult = (event) => {
      clearTimeout(timeoutId);
      if (!event.results || !event.results[0]) {
        isListening = false;
        if (button) button.classList.remove("listening");
        updateMicStatus("ready");
        return;
      }
      const results = [];
      for (let i = 0; i < event.results[0].length; i++) {
        results.push(event.results[0][i].transcript.trim());
      }
      isListening = false;
      if (button) button.classList.remove("listening");
      updateMicStatus("processing");
      setTimeout(() => updateMicStatus("ready"), 1500);
      if (callback) callback(results);
    };

    recognition.onerror = (event) => {
      clearTimeout(timeoutId);
      isListening = false;
      if (button) button.classList.remove("listening");
      updateMicStatus("ready");
      const msgs = {
        "not-allowed": "Mic access denied. Check browser permissions.",
        "network": "Network error. Check your connection.",
        "no-speech": "No speech detected. Try again!",
        "audio-capture": "No microphone found. Check your device.",
        "aborted": null
      };
      const msg = msgs[event.error] || "Speech error. Try again!";
      if (msg) notify(msg);
    };

    recognition.onend = () => {
      clearTimeout(timeoutId);
      isListening = false;
      if (button) button.classList.remove("listening");
    };

    try {
      recognition.start();
    } catch (e) {
      clearTimeout(timeoutId);
      isListening = false;
      if (button) button.classList.remove("listening");
      updateMicStatus("ready");
    }
  }

  function stopListening() {
    if (recognition && isListening) {
      try { recognition.abort(); } catch (e) { /* ignore */ }
      isListening = false;
    }
  }

  function updateMicStatus(status) {
    const bar = document.getElementById("mic-status-bar");
    if (!bar) return;
    bar.setAttribute("data-state", status);
    const label = bar.querySelector(".mic-status-label");
    if (status === "listening") {
      bar.classList.add("active", "listening");
      bar.classList.remove("processing");
      if (label) label.textContent = "Listening...";
    } else if (status === "processing") {
      bar.classList.add("active", "processing");
      bar.classList.remove("listening");
      if (label) label.textContent = "Processing...";
    } else {
      bar.classList.remove("active", "listening", "processing");
      if (label) label.textContent = "Ready";
    }
  }

  // ── State Management ───────────────────────────────────────
  function loadState() {
    try {
      const saved = localStorage.getItem("freespeech_save");
      if (saved) {
        state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
        // Ensure nested objects are merged
        state.realmStats = { ...DEFAULT_STATE.realmStats, ...state.realmStats };
        // Migrate old saves
        if (!state.wordsSpoken) state.wordsSpoken = 0;
        if (!state.tavernNpcsVisited) state.tavernNpcsVisited = [];
        return true;
      }
    } catch (e) { /* ignore */ }
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    return false;
  }

  function saveState() {
    try {
      localStorage.setItem("freespeech_save", JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function resetState() {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    localStorage.removeItem("freespeech_save");
  }

  // ── XP & Leveling ─────────────────────────────────────────
  function getXpForLevel(level) {
    return GAME_DATA.levelThresholds[level] || Infinity;
  }

  function getXpProgress() {
    const currentLevelXp = getXpForLevel(state.level);
    const nextLevelXp = getXpForLevel(state.level + 1);
    const progress = state.xp - currentLevelXp;
    const needed = nextLevelXp - currentLevelXp;
    return { progress: Math.max(0, progress), needed, percent: Math.min(100, (progress / needed) * 100) };
  }

  function addXp(amount, realm) {
    if (state.character && GAME_DATA.classes[state.character.class]) {
      const classData = GAME_DATA.classes[state.character.class];
      if (classData.bonus.realm === realm) {
        amount = Math.floor(amount * classData.bonus.xpMultiplier);
      }
    }
    const xpEffect = state.activeEffects.find(e => e.effect === "double_xp");
    if (xpEffect) {
      amount *= 2;
      xpEffect.remaining--;
      if (xpEffect.remaining <= 0) {
        state.activeEffects = state.activeEffects.filter(e => e !== xpEffect);
      }
    }
    state.xp += amount;
    floatingNumber("+" + amount + " XP", "xp");
    while (state.level < 50 && state.xp >= getXpForLevel(state.level + 1)) {
      state.level++;
      showLevelUp(state.level);
      checkLevelAchievements();
    }
    updateMapUI();
    saveState();
  }

  function addGold(amount) {
    const goldEffect = state.activeEffects.find(e => e.effect === "gold_boost");
    if (goldEffect) {
      amount = Math.floor(amount * 1.5);
      goldEffect.remaining--;
      if (goldEffect.remaining <= 0) {
        state.activeEffects = state.activeEffects.filter(e => e !== goldEffect);
      }
    }
    state.gold += amount;
    state.goldEarned += amount;
    floatingNumber("+" + amount + " Gold", "gold");
    updateMapUI();
    saveState();
    checkAchievement("gold_hoarder", state.goldEarned >= 1000);
  }

  // ── Streak ─────────────────────────────────────────────────
  function updateStreak() {
    const today = new Date().toDateString();
    if (state.lastPlayDate === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (state.lastPlayDate === yesterday.toDateString()) {
      state.streak++;
    } else if (state.lastPlayDate !== today) {
      state.streak = 1;
    }
    state.lastPlayDate = today;
    saveState();
    checkAchievement("streak_3", state.streak >= 3);
    checkAchievement("streak_7", state.streak >= 7);
    checkAchievement("streak_30", state.streak >= 30);
  }

  // ── Hearts ─────────────────────────────────────────────────
  function renderHearts(containerId, hp, maxHp) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < maxHp; i++) {
      const span = document.createElement("span");
      span.className = "heart" + (i >= hp ? " lost" : "");
      span.innerHTML = SPRITES.icon.heart(i < hp, 20);
      container.appendChild(span);
    }
  }

  function loseHeart(containerId, hp, maxHp) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const hearts = container.querySelectorAll(".heart");
    if (hearts[hp]) {
      hearts[hp].classList.add("damage");
      setTimeout(() => hearts[hp].classList.replace("damage", "lost"), 500);
    }
  }

  // ── Daily Quests ───────────────────────────────────────────
  function generateDailyQuests() {
    const today = new Date().toDateString();
    if (state.dailyQuestDate === today && state.dailyQuests) return;
    const templates = [...GAME_DATA.dailyQuests];
    const shuffled = templates.sort(() => Math.random() - 0.5).slice(0, 3);
    state.dailyQuests = shuffled.map(t => {
      const count = t.countRange[0] + Math.floor(Math.random() * (t.countRange[1] - t.countRange[0] + 1));
      return {
        ...t,
        description: t.description.replace("{count}", count),
        target: count,
        progress: 0,
        completed: false
      };
    });
    state.dailyQuestDate = today;
    saveState();
  }

  function updateDailyQuest(type, amount) {
    if (!state.dailyQuests) return;
    state.dailyQuests.forEach(q => {
      if (q.completed) return;
      if (q.type === type || q.type === "any") {
        q.progress = Math.min(q.target, q.progress + amount);
        if (q.progress >= q.target) {
          q.completed = true;
          notify("Quest Complete: " + q.description + "!");
          addXp(q.xpReward, null);
          addGold(q.goldReward);
        }
      }
    });
    if (state.dailyQuests.every(q => q.completed)) {
      checkAchievement("daily_hero", true);
    }
    saveState();
  }

  // ── Achievements ───────────────────────────────────────────
  function checkAchievement(id, condition) {
    if (!condition) return;
    if (state.achievements.includes(id)) return;
    const achievement = GAME_DATA.achievements.find(a => a.id === id);
    if (!achievement) return;
    state.achievements.push(id);
    showAchievementToast(achievement);
    state.xp += achievement.xpReward;
    saveState();
  }

  function checkLevelAchievements() {
    checkAchievement("level_5", state.level >= 5);
    checkAchievement("level_10", state.level >= 10);
    checkAchievement("level_25", state.level >= 25);
    checkAchievement("level_50", state.level >= 50);
  }

  function showAchievementToast(achievement) {
    const toast = document.getElementById("achievement-toast");
    const iconEl = document.getElementById("achievement-toast-icon");
    const nameEl = document.getElementById("achievement-toast-name");
    if (iconEl) iconEl.textContent = "\u2B50";
    if (nameEl) nameEl.textContent = achievement.name;
    toast.style.display = "flex";
    toast.style.animation = "none";
    void toast.offsetWidth;
    toast.style.animation = "";
    setTimeout(() => { toast.style.display = "none"; }, 4000);
  }

  // ── UI Helpers ─────────────────────────────────────────────
  function showScreen(id) {
    stopListening();
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const screen = document.getElementById("screen-" + id);
    if (screen) {
      screen.classList.add("active");
      currentScreen = id;
    }
  }

  function notify(text) {
    const container = document.getElementById("notifications");
    const div = document.createElement("div");
    div.className = "notification";
    div.textContent = text;
    container.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }

  function floatingNumber(text, type, x, y) {
    const el = document.createElement("div");
    el.className = "floating-number " + type;
    el.textContent = text;
    if (x && y) {
      el.style.left = x + "px";
      el.style.top = y + "px";
    } else {
      el.style.left = "50%";
      el.style.top = "40%";
      el.style.transform = "translateX(-50%)";
    }
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }

  function showLevelUp(level) {
    const overlay = document.getElementById("level-up-overlay");
    document.getElementById("level-up-number").textContent = level;
    let unlockText = "";
    for (const [realm, lvl] of Object.entries(GAME_DATA.realmUnlocks)) {
      if (lvl === level) {
        const name = GAME_DATA.realmNames[realm] || realm;
        unlockText += "New realm unlocked: " + name + "! ";
      }
    }
    document.getElementById("level-up-unlocks").textContent = unlockText || "Keep adventuring!";

    const particleContainer = document.getElementById("level-up-particles");
    particleContainer.innerHTML = "";
    const colors = ["#f0c040", "#6a5acd", "#4169e1", "#e74c3c", "#28a745"];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = "50%";
      p.style.top = "50%";
      p.style.setProperty("--tx", (Math.random() - 0.5) * 300 + "px");
      p.style.setProperty("--ty", (Math.random() - 0.5) * 300 + "px");
      p.style.animationDelay = Math.random() * 0.5 + "s";
      particleContainer.appendChild(p);
    }
    overlay.style.display = "flex";
  }

  function renderStars(count) {
    let s = "";
    for (let i = 0; i < 3; i++) {
      s += i < count ? "\u2B50" : "\u2606";
    }
    return s;
  }

  function useItem(effectType) {
    for (const [itemId, count] of Object.entries(state.inventory)) {
      if (count <= 0) continue;
      const item = GAME_DATA.shop.items.find(i => i.id === itemId);
      if (item && item.effect === effectType) {
        state.inventory[itemId]--;
        if (state.inventory[itemId] <= 0) delete state.inventory[itemId];
        if (item.duration) {
          state.activeEffects.push({ effect: item.effect, remaining: item.duration });
        }
        saveState();
        return true;
      }
    }
    return false;
  }

  function hasItem(effectType) {
    for (const [itemId, count] of Object.entries(state.inventory)) {
      if (count <= 0) continue;
      const item = GAME_DATA.shop.items.find(i => i.id === itemId);
      if (item && item.effect === effectType) return true;
    }
    return false;
  }

  // ── Map UI ─────────────────────────────────────────────────
  function updateMapUI() {
    if (!state.character) return;
    const classData = GAME_DATA.classes[state.character.class];

    // Set SVG avatar
    const avatarEl = document.getElementById("map-avatar");
    if (avatarEl) avatarEl.innerHTML = SPRITES.hero[state.character.class](28);

    document.getElementById("map-name").textContent = state.character.name;
    document.getElementById("map-level").textContent = "Lv." + state.level;
    document.getElementById("map-gold").textContent = state.gold;
    document.getElementById("map-streak").textContent = state.streak;

    const xpProg = getXpProgress();
    document.getElementById("map-xp-bar").style.width = xpProg.percent + "%";
    document.getElementById("map-xp-text").textContent = xpProg.progress + "/" + xpProg.needed + " XP";

    // Update realm locks
    document.querySelectorAll(".realm-card").forEach(card => {
      const realm = card.dataset.realm;
      if (!realm) return;
      const required = GAME_DATA.realmUnlocks[realm] || 1;
      const lock = card.querySelector(".realm-lock");
      if (state.level >= required) {
        card.classList.remove("locked");
        if (lock) lock.style.display = "none";
      } else {
        card.classList.add("locked");
        if (lock) lock.style.display = "block";
      }
    });

    // Inject realm illustrations
    for (const [realmId, fn] of Object.entries(SPRITES.realm)) {
      const illEl = document.getElementById("realm-ill-" + realmId);
      if (illEl && !illEl.innerHTML) {
        illEl.innerHTML = fn(120);
      }
    }
  }

  // ── Screen: Title ──────────────────────────────────────────
  function initTitle() {
    const hasSave = loadState();
    const continueBtn = document.getElementById("btn-continue");
    if (hasSave && state.character) {
      continueBtn.style.display = "block";
    }

    document.getElementById("btn-new-game").addEventListener("click", () => {
      resetState();
      showScreen("character");
    });

    continueBtn.addEventListener("click", () => {
      updateStreak();
      generateDailyQuests();
      updateMapUI();
      showScreen("map");
    });

    // Inject title emblem
    const emblemEl = document.getElementById("title-emblem");
    if (emblemEl) {
      emblemEl.innerHTML = SPRITES.icon.mic(48);
    }
  }

  // ── Screen: Character Creation ─────────────────────────────
  function initCharacterCreation() {
    let selectedClass = null;

    // Inject class portraits
    for (const cls of ["bard", "wizard", "knight"]) {
      const el = document.getElementById("class-portrait-" + cls);
      if (el) el.innerHTML = SPRITES.hero[cls](100);
    }

    document.querySelectorAll(".class-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".class-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedClass = card.dataset.class;
        checkReady();
      });
    });

    const nameInput = document.getElementById("hero-name");
    const startBtn = document.getElementById("btn-start-adventure");

    nameInput.addEventListener("input", checkReady);

    function checkReady() {
      startBtn.disabled = !(nameInput.value.trim() && selectedClass);
    }

    startBtn.addEventListener("click", () => {
      state.character = {
        name: nameInput.value.trim(),
        class: selectedClass,
        createdAt: Date.now()
      };
      state.streak = 1;
      state.lastPlayDate = new Date().toDateString();
      saveState();
      generateDailyQuests();
      updateMapUI();
      notify("Welcome, " + state.character.name + " the " + GAME_DATA.classes[selectedClass].name + "!");
      showScreen("map");
    });
  }

  // ── Screen: Map ────────────────────────────────────────────
  function initMap() {
    document.querySelectorAll(".realm-card").forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("locked")) {
          const realm = card.dataset.realm;
          notify("Reach Level " + GAME_DATA.realmUnlocks[realm] + " to unlock this realm!");
          return;
        }
        const realm = card.dataset.realm;
        navigateToRealm(realm);
      });
    });

    document.getElementById("btn-profile").addEventListener("click", () => {
      renderProfile();
      showScreen("profile");
    });
    document.getElementById("btn-daily-quests").addEventListener("click", () => {
      renderDailyQuests();
      showScreen("quests");
    });
    document.getElementById("btn-shop").addEventListener("click", () => {
      renderShop();
      showScreen("shop");
    });
    document.getElementById("btn-achievements").addEventListener("click", () => {
      renderAchievements();
      showScreen("achievements");
    });
  }

  function navigateToRealm(realm) {
    switch (realm) {
      case "storytellers_glen":
        initConversation("storytellers_glen");
        break;
      case "wordsmiths_workshop":
        initConversation("wordsmiths_workshop");
        break;
      case "council_chamber":
        initConversation("council_chamber");
        break;
      case "quick_wit_arena":
        initArena();
        showScreen("arena");
        break;
      case "dragons_lair":
        initDragonsLair();
        showScreen("boss");
        break;
      case "tavern":
        initTavern();
        showScreen("tavern");
        break;
    }
  }

  // ── Conversation Screen (Glen, Workshop, Council) ──────────
  let convState = {};

  function initConversation(realmId) {
    const challenges = GAME_DATA[realmId];
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];

    convState = {
      realm: realmId,
      challenge: challenge,
      phase: "greeting",
      hp: 5,
      maxHp: 5,
      followUpDone: false
    };

    // Set screen title
    document.getElementById("conv-realm-title").textContent = GAME_DATA.realmNames[realmId];

    // Set NPC portrait
    const npcMap = { storytellers_glen: "bard_npc", wordsmiths_workshop: "merchant", council_chamber: "elder_sage" };
    const npcKey = npcMap[realmId] || "innkeeper";
    document.getElementById("conv-npc-portrait").innerHTML = '<div class="npc-portrait-frame">' + SPRITES.npc[npcKey](140) + '</div>';

    // Show NPC greeting
    document.getElementById("conv-npc-dialogue").textContent = challenge.npcGreeting;
    document.getElementById("conv-topic-text").textContent = challenge.prompt;

    // Reset UI elements
    document.getElementById("conv-score-breakdown").style.display = "none";
    document.getElementById("conv-npc-response").style.display = "none";
    document.getElementById("conv-followup").style.display = "none";
    document.getElementById("conv-result").style.display = "none";
    document.getElementById("conv-next").style.display = "none";
    document.getElementById("conv-speak").style.display = "";
    document.getElementById("conv-mic-status").textContent = "Tap to speak";

    // Reset score bars
    document.getElementById("relevance-bar").style.width = "0%";
    document.getElementById("vocabulary-bar").style.width = "0%";
    document.getElementById("sentences-bar").style.width = "0%";
    document.getElementById("length-bar").style.width = "0%";
    document.getElementById("relevance-value").textContent = "0";
    document.getElementById("vocabulary-value").textContent = "0";
    document.getElementById("sentences-value").textContent = "0";
    document.getElementById("length-value").textContent = "0";

    renderHearts("conv-hearts", convState.hp, convState.maxHp);

    // Speak greeting via TTS
    speak(challenge.npcGreeting);

    showScreen("conversation");
  }

  function handleConversationSpeech(results) {
    const spokenText = results[0];
    const scorer = new ConversationScorer();
    const challenge = convState.challenge;

    let scoreData;
    if (convState.phase === "greeting") {
      scoreData = scorer.score(spokenText, challenge);
      convState.phase = "scored";
    } else if (convState.phase === "followup_speaking") {
      scoreData = scorer.score(spokenText, challenge.followUp);
      convState.phase = "followup_scored";
    } else {
      return;
    }

    // Track words spoken
    state.wordsSpoken = (state.wordsSpoken || 0) + scoreData.wordCount;
    updateDailyQuest("words_spoken", scoreData.wordCount);

    // Show score breakdown with animated bars
    showScoreBreakdown(scoreData);

    // Show NPC response
    const responses = convState.phase === "followup_scored"
      ? (challenge.followUp.npcResponses || challenge.npcResponses)
      : challenge.npcResponses;
    const responseText = responses[scoreData.tier];
    document.getElementById("conv-npc-response-text").textContent = responseText;
    document.getElementById("conv-npc-response").style.display = "block";
    speak(responseText);

    // Show result
    showConversationResult(scoreData, spokenText);

    // Check for follow-up availability
    if (convState.phase === "scored" && challenge.followUp && !convState.followUpDone) {
      document.getElementById("conv-followup").style.display = "block";
      document.getElementById("conv-followup-text").textContent = challenge.followUp.npcLine;
    }

    // Award XP and gold
    const xpReward = Math.floor(scoreData.finalScore / 10) * 5 + scoreData.stars * 10;
    const goldReward = scoreData.stars * 5 + Math.floor(scoreData.bonusWordsUsed * 3);

    if (scoreData.stars > 0) {
      addXp(xpReward, convState.realm);
      addGold(goldReward);
      state.challengesCompleted++;
      state.realmStats[convState.realm].completed++;
      if (scoreData.stars === 3) {
        state.consecutivePerfect++;
        state.perfectCount++;
        state.realmStats[convState.realm].perfect++;
        updateDailyQuest("perfect", 1);
      } else {
        state.consecutivePerfect = 0;
      }
      updateDailyQuest(convState.realm, 1);
      updateDailyQuest("any", 1);

      document.getElementById("conv-result-xp").textContent = "+" + xpReward + " XP  +" + goldReward + " Gold";
    } else {
      document.getElementById("conv-result-xp").textContent = "";
      state.consecutivePerfect = 0;

      // Lose heart on 0 stars
      if (hasItem("shield")) {
        useItem("shield");
        notify("Shield Potion absorbed the damage!");
      } else {
        convState.hp--;
        loseHeart("conv-hearts", convState.hp, convState.maxHp);
        if (convState.hp <= 0) notify("Out of hearts! Starting fresh...");
      }
    }

    // Achievement checks
    checkAchievement("first_word", true);
    checkAchievement("eloquent", scoreData.finalScore >= 90);
    checkAchievement("chatterbox", (state.wordsSpoken || 0) >= 1000);
    const realmStats = state.realmStats[convState.realm];
    if (convState.realm === "storytellers_glen") {
      checkAchievement("storyteller_10", realmStats.completed >= 10);
      checkAchievement("storyteller_50", realmStats.completed >= 50);
    } else if (convState.realm === "wordsmiths_workshop") {
      checkAchievement("wordsmith_10", realmStats.completed >= 10);
      checkAchievement("wordsmith_50", realmStats.completed >= 50);
    } else if (convState.realm === "council_chamber") {
      checkAchievement("council_10", realmStats.completed >= 10);
    }
    checkAchievement("three_stars_25", state.perfectCount >= 25);

    // Show next button, hide mic
    document.getElementById("conv-next").style.display = "block";
    document.getElementById("conv-speak").style.display = "none";

    saveState();
  }

  function showScoreBreakdown(scoreData) {
    document.getElementById("conv-score-breakdown").style.display = "block";

    // Animate bars after a short delay
    setTimeout(() => {
      document.getElementById("relevance-bar").style.width = scoreData.relevance + "%";
      document.getElementById("vocabulary-bar").style.width = scoreData.vocabulary + "%";
      document.getElementById("sentences-bar").style.width = scoreData.sentences + "%";
      document.getElementById("length-bar").style.width = scoreData.length + "%";
    }, 100);

    document.getElementById("relevance-value").textContent = scoreData.relevance + "%";
    document.getElementById("vocabulary-value").textContent = scoreData.vocabulary + "%";
    document.getElementById("sentences-value").textContent = scoreData.sentences + "%";
    document.getElementById("length-value").textContent = scoreData.length + "%";
  }

  function showConversationResult(scoreData, spokenText) {
    document.getElementById("conv-result").style.display = "block";
    const resultStars = document.getElementById("conv-result-stars");
    resultStars.textContent = renderStars(scoreData.stars) + " Score: " + scoreData.finalScore + "/100";

    const resultGold = document.getElementById("conv-result-gold");
    if (resultGold) {
      resultGold.textContent = 'You said: "' + spokenText + '"';
      resultGold.className = "result-gold " + (scoreData.stars >= 3 ? "correct" : scoreData.stars >= 1 ? "partial" : "incorrect");
    }
  }

  function handleFollowUp() {
    convState.phase = "followup_speaking";
    convState.followUpDone = true;

    const followUp = convState.challenge.followUp;
    document.getElementById("conv-npc-dialogue").textContent = followUp.npcLine;
    document.getElementById("conv-topic-text").textContent = "Respond to the follow-up question";

    // Reset score display
    document.getElementById("conv-score-breakdown").style.display = "none";
    document.getElementById("conv-npc-response").style.display = "none";
    document.getElementById("conv-result").style.display = "none";
    document.getElementById("conv-followup").style.display = "none";
    document.getElementById("conv-next").style.display = "none";
    document.getElementById("conv-speak").style.display = "";
    document.getElementById("conv-mic-status").textContent = "Tap to speak";

    // Reset bar widths
    document.getElementById("relevance-bar").style.width = "0%";
    document.getElementById("vocabulary-bar").style.width = "0%";
    document.getElementById("sentences-bar").style.width = "0%";
    document.getElementById("length-bar").style.width = "0%";

    speak(followUp.npcLine);
    updateDailyQuest("followup", 1);
  }

  function setupConversationHandlers() {
    document.getElementById("conv-speak").addEventListener("click", () => {
      startListening(document.getElementById("conv-speak"), (results) => {
        handleConversationSpeech(results);
      });
    });

    document.getElementById("conv-next").addEventListener("click", () => {
      if (convState.hp <= 0) {
        convState.hp = 5;
        renderHearts("conv-hearts", convState.hp, convState.maxHp);
      }
      initConversation(convState.realm);
    });

    document.getElementById("conv-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });

    // Follow-up click: clicking on the follow-up section triggers follow-up
    document.getElementById("conv-followup").addEventListener("click", () => {
      handleFollowUp();
    });
  }

  // ── Quick Wit Arena ────────────────────────────────────────
  let arenaState = {};
  let arenaTimer = null;

  function initArena() {
    arenaState = { score: 0, combo: 0, maxCombo: 0, correct: 0, total: 0, timeLeft: 60, running: false, current: null };
    document.getElementById("arena-best").textContent = state.arenaBest;
    document.getElementById("arena-score").textContent = "0";
    document.getElementById("arena-combo").textContent = "";
    document.getElementById("arena-timer").textContent = "60";
    document.getElementById("arena-start").style.display = "block";
    document.getElementById("arena-challenge").style.display = "none";
    document.getElementById("arena-results").style.display = "none";
  }

  function startArenaRound() {
    arenaState.running = true;
    arenaState.timeLeft = 60;
    if (hasItem("extra_time")) {
      useItem("extra_time");
      arenaState.timeLeft += 15;
      notify("Time Crystal: +15 seconds!");
    }

    document.getElementById("arena-start").style.display = "none";
    document.getElementById("arena-challenge").style.display = "block";
    document.getElementById("arena-results").style.display = "none";
    document.getElementById("arena-timer").textContent = arenaState.timeLeft;

    loadArenaChallenge();
    arenaTimer = setInterval(() => {
      arenaState.timeLeft--;
      document.getElementById("arena-timer").textContent = arenaState.timeLeft;
      if (arenaState.timeLeft <= 0) {
        endArena();
      }
    }, 1000);
  }

  function loadArenaChallenge() {
    const challenges = GAME_DATA.quick_wit_arena;
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    arenaState.current = challenge;
    document.getElementById("arena-type-badge").textContent = "TOPIC";
    document.getElementById("arena-question").textContent = challenge.prompt;
    document.getElementById("arena-feedback").style.display = "none";
  }

  function handleArenaResult(results) {
    if (!arenaState.running) return;
    const scorer = new ConversationScorer();
    const scoreData = scorer.score(results[0], arenaState.current);

    state.wordsSpoken = (state.wordsSpoken || 0) + scoreData.wordCount;
    arenaState.total++;

    const feedback = document.getElementById("arena-feedback");
    feedback.style.display = "block";
    feedback.style.animation = "none";
    void feedback.offsetWidth;
    feedback.style.animation = "";

    if (scoreData.finalScore >= 40) {
      arenaState.combo++;
      arenaState.correct++;
      if (arenaState.combo > arenaState.maxCombo) arenaState.maxCombo = arenaState.combo;

      let multiplier = 1;
      if (arenaState.combo >= 10) multiplier = 5;
      else if (arenaState.combo >= 7) multiplier = 3;
      else if (arenaState.combo >= 3) multiplier = 2;

      const points = Math.floor(scoreData.finalScore * multiplier);
      arenaState.score += points;

      feedback.textContent = renderStars(scoreData.stars) + " +" + points + " pts" + (multiplier > 1 ? " (" + multiplier + "x!)" : "");
      feedback.className = "arena-feedback correct";
      document.getElementById("arena-score").textContent = arenaState.score;
      document.getElementById("arena-combo").textContent = arenaState.combo >= 2 ? arenaState.combo + "x Combo!" : "";
    } else {
      arenaState.combo = 0;
      feedback.textContent = "Too brief! Speak more about the topic.";
      feedback.className = "arena-feedback incorrect";
      document.getElementById("arena-combo").textContent = "";
    }

    setTimeout(() => {
      if (arenaState.running) loadArenaChallenge();
    }, 1200);
  }

  function endArena() {
    arenaState.running = false;
    clearInterval(arenaTimer);

    document.getElementById("arena-challenge").style.display = "none";
    document.getElementById("arena-results").style.display = "block";

    document.getElementById("arena-final-score").textContent = arenaState.score + " Points!";

    const statsGrid = document.getElementById("arena-stats-grid");
    statsGrid.innerHTML =
      '<div class="arena-stat-item"><div class="stat-value">' + arenaState.correct + '</div><div class="stat-label">Good Answers</div></div>' +
      '<div class="arena-stat-item"><div class="stat-value">' + arenaState.total + '</div><div class="stat-label">Attempted</div></div>' +
      '<div class="arena-stat-item"><div class="stat-value">' + arenaState.maxCombo + 'x</div><div class="stat-label">Best Combo</div></div>';

    if (arenaState.score > state.arenaBest) {
      state.arenaBest = arenaState.score;
      state.realmStats.quick_wit_arena.bestScore = arenaState.score;
      notify("New personal best!");
    }
    state.realmStats.quick_wit_arena.completed++;
    state.challengesCompleted += arenaState.correct;

    const xpReward = Math.floor(arenaState.score / 5);
    const goldReward = Math.floor(arenaState.score / 10);
    addXp(xpReward, "quick_wit_arena");
    addGold(goldReward);
    updateDailyQuest("quick_wit_arena", arenaState.score);
    updateDailyQuest("any", arenaState.correct);

    checkAchievement("speed_demon", arenaState.score >= 500);
    checkAchievement("arena_champion", arenaState.score >= 1000);
    saveState();
  }

  function setupArenaHandlers() {
    document.getElementById("arena-go").addEventListener("click", startArenaRound);

    document.getElementById("arena-speak").addEventListener("click", () => {
      startListening(document.getElementById("arena-speak"), (results) => {
        handleArenaResult(results);
      });
    });

    document.getElementById("arena-retry").addEventListener("click", () => {
      initArena();
      startArenaRound();
    });

    document.getElementById("arena-exit").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });

    document.getElementById("arena-back").addEventListener("click", () => {
      if (arenaState.running) {
        arenaState.running = false;
        clearInterval(arenaTimer);
      }
      showScreen("map");
      updateMapUI();
    });
  }

  // ── Dragon's Lair ──────────────────────────────────────────
  let bossState = {};

  function initDragonsLair() {
    const grid = document.getElementById("boss-grid");
    grid.innerHTML = "";

    GAME_DATA.bosses.forEach(boss => {
      const card = document.createElement("div");
      const unlockLevel = GAME_DATA.bossUnlocks[boss.id] || 15;
      const isDefeated = state.bossesDefeated.includes(boss.id);
      const isLocked = state.level < unlockLevel;

      card.className = "boss-card" + (isLocked ? " locked" : "") + (isDefeated ? " defeated" : "");
      card.innerHTML =
        '<div class="boss-emoji">' + SPRITES.boss[boss.id](80) + '</div>' +
        '<h4>' + boss.name + '</h4>' +
        '<p>' + boss.title + '</p>' +
        (isDefeated ? '<div class="defeated-badge">Defeated</div>' : "") +
        (isLocked ? '<div style="color:var(--text-dim);font-size:0.8rem;margin-top:0.3rem;">Level ' + unlockLevel + '</div>' : "");

      card.addEventListener("click", () => {
        if (isLocked) {
          notify("Reach Level " + unlockLevel + " to challenge this boss!");
          return;
        }
        startBossBattle(boss);
      });

      grid.appendChild(card);
    });

    document.getElementById("boss-selection").style.display = "block";
    document.getElementById("boss-battle").style.display = "none";
    document.getElementById("boss-end").style.display = "none";
  }

  function startBossBattle(boss) {
    bossState = {
      boss: boss,
      bossHp: boss.hp,
      bossMaxHp: boss.hp,
      playerHp: 5,
      maxHp: 5,
      roundIndex: 0,
      rounds: [...boss.rounds]
    };

    document.getElementById("boss-selection").style.display = "none";
    document.getElementById("boss-battle").style.display = "block";
    document.getElementById("boss-end").style.display = "none";

    // Set boss portrait using SVG sprite
    document.getElementById("boss-portrait").innerHTML = SPRITES.boss[boss.id](180);
    document.getElementById("boss-portrait").style.color = boss.color;
    document.getElementById("boss-name").textContent = boss.name;
    document.getElementById("boss-name").style.color = boss.color;
    document.getElementById("boss-title-text").textContent = boss.title;
    document.getElementById("boss-hp-bar").style.width = "100%";
    document.getElementById("boss-hp-text").textContent = boss.hp + "/" + boss.hp;

    renderHearts("boss-hearts", bossState.playerHp, bossState.maxHp);
    document.getElementById("boss-dialogue").textContent = '"' + boss.intro + '"';

    speak(boss.intro, () => loadBossRound());
  }

  function loadBossRound() {
    if (bossState.roundIndex >= bossState.rounds.length) {
      bossState.roundIndex = 0;
    }
    const round = bossState.rounds[bossState.roundIndex];
    document.getElementById("boss-question").textContent = round.npcLine;
    document.getElementById("boss-dialogue").textContent = '"' + round.npcLine + '"';
    document.getElementById("boss-feedback").style.display = "none";

    speak(round.npcLine);
  }

  function handleBossResult(results) {
    const round = bossState.rounds[bossState.roundIndex];
    const scorer = new ConversationScorer();
    const scoreData = scorer.score(results[0], round);

    state.wordsSpoken = (state.wordsSpoken || 0) + scoreData.wordCount;

    const feedback = document.getElementById("boss-feedback");
    feedback.style.display = "block";
    feedback.style.animation = "none";
    void feedback.offsetWidth;
    feedback.style.animation = "";

    if (scoreData.finalScore >= 30) {
      // Player damages boss
      const damage = Math.max(5, Math.floor(scoreData.finalScore * bossState.bossMaxHp / 100));
      bossState.bossHp = Math.max(0, bossState.bossHp - damage);
      const hpPercent = (bossState.bossHp / bossState.bossMaxHp) * 100;
      document.getElementById("boss-hp-bar").style.width = hpPercent + "%";
      document.getElementById("boss-hp-text").textContent = bossState.bossHp + "/" + bossState.bossMaxHp;

      feedback.textContent = renderStars(scoreData.stars) + " HIT! -" + damage + " damage! (Score: " + scoreData.finalScore + ")";
      feedback.className = "battle-feedback hit";
      floatingNumber("-" + damage, "damage");
      updateDailyQuest("boss", damage);

      // Screen shake
      const bossScreen = document.getElementById("screen-boss");
      if (bossScreen) {
        bossScreen.classList.add("screen-shake");
        setTimeout(() => bossScreen.classList.remove("screen-shake"), 400);
      }

      if (bossState.bossHp <= 0) {
        setTimeout(() => endBossBattle(true), 1000);
        return;
      }
    } else {
      // Boss attacks player
      const attackMsg = bossState.boss.attacks[Math.floor(Math.random() * bossState.boss.attacks.length)];

      if (hasItem("shield")) {
        useItem("shield");
        feedback.textContent = attackMsg + " Shield blocks it!";
        feedback.className = "battle-feedback hit";
      } else {
        bossState.playerHp--;
        loseHeart("boss-hearts", bossState.playerHp, bossState.maxHp);
        feedback.textContent = attackMsg + " (Score: " + scoreData.finalScore + " -- too low!)";
        feedback.className = "battle-feedback miss";
        floatingNumber("-1 heart", "damage");

        if (bossState.playerHp <= 0) {
          if (hasItem("revive")) {
            useItem("revive");
            bossState.playerHp = bossState.maxHp;
            renderHearts("boss-hearts", bossState.playerHp, bossState.maxHp);
            notify("Phoenix Feather revives you!");
          } else {
            setTimeout(() => endBossBattle(false), 1000);
            return;
          }
        }
      }
    }

    bossState.roundIndex++;
    setTimeout(() => {
      document.getElementById("boss-dialogue").textContent = scoreData.finalScore >= 30
        ? '"' + bossState.boss.victory.substring(0, 40) + '... Gah!"'
        : '"' + bossState.boss.attacks[Math.floor(Math.random() * bossState.boss.attacks.length)] + '"';
      loadBossRound();
    }, 1500);
  }

  function endBossBattle(victory) {
    document.getElementById("boss-battle").style.display = "none";
    document.getElementById("boss-end").style.display = "block";

    const endIcon = document.getElementById("boss-end-icon");
    const endTitle = document.getElementById("boss-end-title");
    const endMessage = document.getElementById("boss-end-message");
    const endRewards = document.getElementById("boss-end-rewards");

    if (victory) {
      endIcon.textContent = "\uD83C\uDFC6";
      endTitle.textContent = "VICTORY!";
      endTitle.style.color = "var(--gold)";
      endMessage.textContent = '"' + bossState.boss.victory + '"';

      const rewards = bossState.boss.rewards;
      endRewards.innerHTML =
        '<div class="reward-item">+' + rewards.xp + ' XP</div>' +
        '<div class="reward-item">+' + rewards.gold + ' Gold</div>' +
        '<div class="reward-item">Title: ' + rewards.title + '</div>';

      if (!state.bossesDefeated.includes(bossState.boss.id)) {
        state.bossesDefeated.push(bossState.boss.id);
      }
      if (!state.titles.includes(rewards.title)) {
        state.titles.push(rewards.title);
        if (!state.activeTitle) state.activeTitle = rewards.title;
      }
      state.realmStats.dragons_lair.completed++;
      state.realmStats.dragons_lair.bossesDefeated = state.bossesDefeated.length;

      addXp(rewards.xp, "dragons_lair");
      addGold(rewards.gold);

      checkAchievement("dragon_slayer", state.bossesDefeated.includes("accent_dragon"));
      checkAchievement("boss_crusher", state.bossesDefeated.length >= 5);
      checkAchievement("comeback_kid", bossState.playerHp === 1);
    } else {
      endIcon.textContent = "\uD83D\uDC80";
      endTitle.textContent = "DEFEATED";
      endTitle.style.color = "var(--red)";
      endMessage.textContent = '"' + bossState.boss.defeat + '"';
      endRewards.innerHTML = '<div class="reward-item">Try again when you are stronger!</div>';
    }
    saveState();
  }

  function setupBossHandlers() {
    document.getElementById("boss-speak").addEventListener("click", () => {
      startListening(document.getElementById("boss-speak"), (results) => {
        handleBossResult(results);
      });
    });

    document.getElementById("boss-end-btn").addEventListener("click", () => {
      initDragonsLair();
    });

    document.getElementById("boss-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  // ── The Tavern ─────────────────────────────────────────────
  let tavernState = {};

  function initTavern() {
    // Inject NPC portraits and completion badges into the static HTML NPC cards
    const npcGrid = document.getElementById("npc-grid");
    if (!npcGrid) return;

    GAME_DATA.tavern.forEach(npcData => {
      const card = npcGrid.querySelector('[data-npc="' + npcData.npc + '"]');
      if (!card) return;

      // Inject portrait
      const portraitEl = card.querySelector(".npc-portrait");
      if (portraitEl) {
        portraitEl.innerHTML = SPRITES.npc[npcData.npc](120);
      }

      // Show name and description
      const h4 = card.querySelector("h4");
      if (h4) h4.textContent = npcData.name;
      const p = card.querySelector("p");
      if (p) p.textContent = npcData.description;

      // Show completed badge
      const visited = (state.tavernNpcsVisited || []).includes(npcData.id);
      let badge = card.querySelector(".completed-badge");
      if (visited && !badge) {
        badge = document.createElement("p");
        badge.className = "completed-badge";
        badge.style.color = "var(--green)";
        badge.style.fontSize = "0.8rem";
        badge.textContent = "Visited";
        card.appendChild(badge);
      } else if (!visited && badge) {
        badge.remove();
      }
    });

    document.getElementById("tavern-npcs").style.display = "block";
    document.getElementById("tavern-conversation").style.display = "none";
  }

  function startTavernConversation(npcData) {
    tavernState = {
      npc: npcData,
      topicIndex: 0
    };

    document.getElementById("tavern-npcs").style.display = "none";
    document.getElementById("tavern-conversation").style.display = "block";

    // Set NPC info
    const avatarEl = document.getElementById("tavern-npc-avatar");
    if (avatarEl) avatarEl.innerHTML = SPRITES.npc[npcData.npc](40);
    const nameEl = document.getElementById("tavern-npc-name");
    if (nameEl) nameEl.textContent = npcData.name;

    // Clear conversation log
    const log = document.getElementById("conversation-log");
    log.innerHTML = "";

    // Load first topic
    loadTavernTopic();
  }

  function loadTavernTopic() {
    const topic = tavernState.npc.topics[tavernState.topicIndex];
    if (!topic) {
      finishTavernConversation();
      return;
    }
    addChatBubble(tavernState.npc.name, topic.npcGreeting, "npc");
    speak(topic.npcGreeting);
  }

  function addChatBubble(speaker, text, type) {
    const log = document.getElementById("conversation-log");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + type;
    bubble.innerHTML = '<div class="speaker">' + speaker + '</div><div>' + text + '</div>';
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  function handleTavernResult(results) {
    const topic = tavernState.npc.topics[tavernState.topicIndex];
    if (!topic) return;

    const spokenText = results[0];
    addChatBubble(state.character.name, spokenText, "player");

    const scorer = new ConversationScorer();
    const scoreData = scorer.score(spokenText, topic);

    state.wordsSpoken = (state.wordsSpoken || 0) + scoreData.wordCount;

    // Show NPC response based on score tier
    const response = topic.npcResponses[scoreData.tier];
    setTimeout(() => {
      addChatBubble(tavernState.npc.name, response, "npc");
      speak(response);

      // Move to next topic
      tavernState.topicIndex++;
      if (tavernState.topicIndex < tavernState.npc.topics.length) {
        setTimeout(() => loadTavernTopic(), 2000);
      } else {
        setTimeout(() => finishTavernConversation(), 1500);
      }
    }, 800);
  }

  function finishTavernConversation() {
    addChatBubble(tavernState.npc.name, "It was wonderful talking to you! Come back anytime!", "npc");

    if (!state.tavernNpcsVisited) state.tavernNpcsVisited = [];
    if (!state.tavernNpcsVisited.includes(tavernState.npc.id)) {
      state.tavernNpcsVisited.push(tavernState.npc.id);
    }
    state.realmStats.tavern.completed++;

    addXp(50, "tavern");
    addGold(20);
    updateDailyQuest("tavern", 1);
    updateDailyQuest("any", 1);

    checkAchievement("tavern_regular", (state.tavernNpcsVisited || []).length >= GAME_DATA.tavern.length);

    notify("Conversation complete! +50 XP +20 Gold");
    saveState();
  }

  function setupTavernHandlers() {
    // NPC card clicks
    document.querySelectorAll("#npc-grid .npc-card").forEach(card => {
      card.addEventListener("click", () => {
        const npcKey = card.dataset.npc;
        const npcData = GAME_DATA.tavern.find(n => n.npc === npcKey);
        if (npcData) startTavernConversation(npcData);
      });
    });

    document.getElementById("tavern-speak").addEventListener("click", () => {
      startListening(document.getElementById("tavern-speak"), (results) => {
        handleTavernResult(results);
      });
    });

    document.getElementById("tavern-npc-back").addEventListener("click", () => {
      initTavern();
    });

    document.getElementById("tavern-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  // ── Shop ───────────────────────────────────────────────────
  function renderShop() {
    document.getElementById("shop-gold").textContent = state.gold;
    const grid = document.getElementById("shop-grid");
    grid.innerHTML = "";

    GAME_DATA.shop.items.forEach(item => {
      const owned = state.inventory[item.id] || 0;
      const canAfford = state.gold >= item.price;

      const card = document.createElement("div");
      card.className = "shop-item";
      card.innerHTML =
        '<div class="item-icon">' + (SPRITES.icon[item.icon] ? SPRITES.icon[item.icon](32) : item.icon) + '</div>' +
        '<h4>' + item.name + '</h4>' +
        '<p>' + item.description + '</p>' +
        '<div class="item-price">' + item.price + ' Gold</div>' +
        (owned > 0 ? '<p style="color:var(--green);font-size:0.8rem;">Owned: ' + owned + '</p>' : "") +
        '<button class="btn btn-primary btn-small shop-buy-btn" data-item="' + item.id + '" ' + (!canAfford ? "disabled" : "") + '>' +
          (canAfford ? "Buy" : "Not enough gold") +
        '</button>';
      grid.appendChild(card);
    });

    grid.querySelectorAll(".shop-buy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.item;
        buyItem(itemId);
      });
    });
  }

  function buyItem(itemId) {
    const item = GAME_DATA.shop.items.find(i => i.id === itemId);
    if (!item || state.gold < item.price) return;

    state.gold -= item.price;
    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    state.shopPurchases++;
    saveState();

    notify("Purchased " + item.name + "!");
    checkAchievement("shopaholic", state.shopPurchases >= 10);
    renderShop();
    updateMapUI();
  }

  function setupShopHandlers() {
    document.getElementById("shop-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  // ── Profile ────────────────────────────────────────────────
  function renderProfile() {
    if (!state.character) return;
    const classData = GAME_DATA.classes[state.character.class];
    document.getElementById("profile-avatar").innerHTML = SPRITES.hero[state.character.class](80);
    document.getElementById("profile-name").textContent = state.character.name;
    document.getElementById("profile-class").textContent = classData.name;
    document.getElementById("profile-title").textContent = state.activeTitle || "Novice Adventurer";
    document.getElementById("profile-level").textContent = state.level;
    document.getElementById("profile-xp").textContent = state.xp;
    document.getElementById("profile-gold-total").textContent = state.goldEarned;
    document.getElementById("profile-streak").textContent = state.streak;
    document.getElementById("profile-challenges").textContent = state.challengesCompleted;
    document.getElementById("profile-bosses").textContent = state.bossesDefeated.length;

    const invGrid = document.getElementById("profile-inventory");
    invGrid.innerHTML = "";
    const entries = Object.entries(state.inventory).filter(([, count]) => count > 0);
    if (entries.length === 0) {
      invGrid.innerHTML = '<p style="color:var(--text-dim);">No items yet. Visit the shop!</p>';
    } else {
      entries.forEach(([itemId, count]) => {
        const item = GAME_DATA.shop.items.find(i => i.id === itemId);
        if (!item) return;
        const div = document.createElement("div");
        div.className = "inventory-item";
        div.innerHTML = (SPRITES.icon[item.icon] ? SPRITES.icon[item.icon](18) : "") + " " + item.name + ' <span class="item-count">' + count + '</span>';
        invGrid.appendChild(div);
      });
    }
  }

  function setupProfileHandlers() {
    document.getElementById("profile-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });

    document.getElementById("btn-reset-game").addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all progress? This cannot be undone!")) {
        resetState();
        showScreen("title");
        location.reload();
      }
    });
  }

  // ── Daily Quests Screen ────────────────────────────────────
  function renderDailyQuests() {
    generateDailyQuests();
    const list = document.getElementById("quests-list");
    list.innerHTML = "";

    if (!state.dailyQuests) return;

    state.dailyQuests.forEach(quest => {
      const card = document.createElement("div");
      card.className = "quest-card" + (quest.completed ? " completed" : "");
      const progressPercent = Math.min(100, (quest.progress / quest.target) * 100);
      card.innerHTML =
        '<div class="quest-info">' +
          '<h4>' + quest.description + '</h4>' +
          '<div class="quest-progress">' + quest.progress + '/' + quest.target + '</div>' +
          '<div class="quest-progress-bar"><div class="quest-progress-fill" style="width:' + progressPercent + '%"></div></div>' +
        '</div>' +
        '<div class="quest-rewards">' +
          '<span>' + quest.xpReward + ' XP</span>' +
          '<span>' + quest.goldReward + ' Gold</span>' +
        '</div>' +
        (quest.completed ? '<div class="quest-check">Done</div>' : "");
      list.appendChild(card);
    });
  }

  function setupQuestsHandlers() {
    document.getElementById("quests-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  // ── Achievements Screen ────────────────────────────────────
  function renderAchievements() {
    const grid = document.getElementById("achievements-grid");
    grid.innerHTML = "";

    GAME_DATA.achievements.forEach(achievement => {
      const unlocked = state.achievements.includes(achievement.id);
      const card = document.createElement("div");
      card.className = "achievement-card " + (unlocked ? "unlocked" : "locked");
      card.innerHTML =
        '<div class="achievement-icon">' + (unlocked ? "\u2B50" : "\uD83D\uDD12") + '</div>' +
        '<div class="achievement-info">' +
          '<h4>' + achievement.name + '</h4>' +
          '<p>' + achievement.description + '</p>' +
          '<span class="achievement-xp">' + (unlocked ? "Unlocked" : "+" + achievement.xpReward + " XP") + '</span>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function setupAchievementsHandlers() {
    document.getElementById("achievements-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  // ── Level Up Overlay ───────────────────────────────────────
  function setupLevelUpHandlers() {
    document.getElementById("level-up-dismiss").addEventListener("click", () => {
      document.getElementById("level-up-overlay").style.display = "none";
    });
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    initTitle();
    initCharacterCreation();
    initMap();
    setupConversationHandlers();
    setupArenaHandlers();
    setupBossHandlers();
    setupTavernHandlers();
    setupShopHandlers();
    setupProfileHandlers();
    setupQuestsHandlers();
    setupAchievementsHandlers();
    setupLevelUpHandlers();
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
