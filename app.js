// ============================================================
// FREE SPEECH - Game Engine
// State management, Speech API, game loops, scoring
// ============================================================

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────────
  const DEFAULT_STATE = {
    character: null,        // { name, class, createdAt }
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
    inventory: {},          // { itemId: count }
    equippedItems: {},      // { slot: itemId }
    titles: [],
    activeTitle: null,
    activeEffects: [],      // { effect, remaining }
    arenaBest: 0,
    dailyQuests: null,
    dailyQuestDate: null,
    realmStats: {
      echo_valley: { completed: 0, perfect: 0 },
      word_forge: { completed: 0, perfect: 0 },
      spell_tower: { completed: 0, perfect: 0 },
      arena: { completed: 0, bestScore: 0 },
      dragons_lair: { completed: 0, bossesDefeated: 0 },
      tavern: { completed: 0, conversationsFinished: 0 }
    },
    wordsLearned: [],
    tavernCompleted: [],
    shopPurchases: 0
  };

  let state = {};
  let currentScreen = "title";

  // ── Speech API ─────────────────────────────────────────────
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSynth = window.speechSynthesis;
  let recognition = null;
  let isListening = false;

  function initSpeechRecognition() {
    if (!SpeechRecognition) return null;
    const r = new SpeechRecognition();
    r.lang = "en-US";
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.continuous = false;
    return r;
  }

  function speak(text, callback) {
    if (!speechSynth) return;
    speechSynth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    utter.pitch = 1;
    if (callback) utter.onend = callback;
    speechSynth.speak(utter);
  }

  function startListening(button, callback) {
    if (!SpeechRecognition) {
      notify("Speech recognition not supported in this browser. Try Chrome!");
      return;
    }
    if (isListening) return;

    recognition = initSpeechRecognition();
    isListening = true;
    if (button) button.classList.add("listening");

    recognition.onresult = (event) => {
      const results = [];
      for (let i = 0; i < event.results[0].length; i++) {
        results.push(event.results[0][i].transcript.toLowerCase().trim());
      }
      isListening = false;
      if (button) button.classList.remove("listening");
      if (callback) callback(results);
    };

    recognition.onerror = (event) => {
      isListening = false;
      if (button) button.classList.remove("listening");
      if (event.error === "no-speech") {
        notify("No speech detected. Try again!");
      } else if (event.error !== "aborted") {
        notify("Could not recognize speech. Try again!");
      }
    };

    recognition.onend = () => {
      isListening = false;
      if (button) button.classList.remove("listening");
    };

    try {
      recognition.start();
    } catch (e) {
      isListening = false;
      if (button) button.classList.remove("listening");
    }
  }

  function stopListening() {
    if (recognition && isListening) {
      recognition.abort();
      isListening = false;
    }
  }

  // ── Levenshtein Distance ───────────────────────────────────
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  }

  function similarity(spoken, expected) {
    const a = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    const b = expected.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    if (a === b) return 1;
    const dist = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length);
    return maxLen === 0 ? 1 : 1 - dist / maxLen;
  }

  function matchesAny(spoken, acceptList) {
    const s = spoken.toLowerCase().replace(/[^a-z0-9\s']/g, "").trim();
    for (const accept of acceptList) {
      const a = accept.toLowerCase().replace(/[^a-z0-9\s']/g, "").trim();
      if (s === a) return { match: true, exact: true };
      if (similarity(s, a) >= 0.8) return { match: true, exact: false };
    }
    return { match: false, exact: false };
  }

  function scoreAnswer(spoken, expected, acceptList) {
    const s = spoken.toLowerCase().replace(/[^a-z0-9\s']/g, "").trim();
    const e = expected.toLowerCase().replace(/[^a-z0-9\s']/g, "").trim();

    if (s === e) return 3;
    if (acceptList) {
      const m = matchesAny(spoken, acceptList);
      if (m.exact) return 3;
      if (m.match) return 2;
    }
    const sim = similarity(spoken, expected);
    if (sim >= 0.85) return 3;
    if (sim >= 0.65) return 2;
    if (sim >= 0.45) return 1;
    return 0;
  }

  // ── State Management ───────────────────────────────────────
  function loadState() {
    try {
      const saved = localStorage.getItem("freespeech_save");
      if (saved) {
        state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
        // Ensure nested objects are merged
        state.realmStats = { ...DEFAULT_STATE.realmStats, ...state.realmStats };
        return true;
      }
    } catch (e) { /* ignore */ }
    state = { ...DEFAULT_STATE };
    return false;
  }

  function saveState() {
    try {
      localStorage.setItem("freespeech_save", JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function resetState() {
    state = { ...DEFAULT_STATE, realmStats: { ...DEFAULT_STATE.realmStats } };
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
    // Apply class bonus
    if (state.character && GAME_DATA.classes[state.character.class]) {
      const classData = GAME_DATA.classes[state.character.class];
      if (classData.bonus.realm === realm) {
        amount = Math.floor(amount * classData.bonus.xpMultiplier);
      }
    }
    // Apply XP potion
    const xpEffect = state.activeEffects.find(e => e.effect === "double_xp");
    if (xpEffect) {
      amount *= 2;
      xpEffect.remaining--;
      if (xpEffect.remaining <= 0) {
        state.activeEffects = state.activeEffects.filter(e => e !== xpEffect);
      }
    }

    state.xp += amount;
    floatingNumber(`+${amount} XP`, "xp");

    // Check level up
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
    floatingNumber(`+${amount} Gold`, "gold");
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
      span.textContent = "\u2764\uFE0F";
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
          notify(`Quest Complete: ${q.description}!`);
          addXp(q.xpReward, null);
          addGold(q.goldReward);
        }
      }
    });
    // Check if all daily quests completed
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
    iconEl.textContent = GAME_DATA.icons[achievement.icon] || "\u2B50";
    nameEl.textContent = achievement.name;
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
        const names = { echo_valley: "Echo Valley", word_forge: "Word Forge", spell_tower: "Spell Tower", arena: "The Arena", dragons_lair: "Dragon's Lair", tavern: "The Tavern" };
        unlockText += `New realm unlocked: ${names[realm]}! `;
      }
    }
    document.getElementById("level-up-unlocks").textContent = unlockText || "Keep adventuring!";

    // Particles
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

  function updateMapUI() {
    if (!state.character) return;
    const classData = GAME_DATA.classes[state.character.class];
    document.getElementById("map-avatar").textContent = GAME_DATA.icons[classData.avatar] || "";
    document.getElementById("map-name").textContent = state.character.name;
    document.getElementById("map-level").textContent = "Lv." + state.level;
    document.getElementById("map-gold").textContent = state.gold;
    document.getElementById("map-streak").textContent = state.streak;

    const xpProg = getXpProgress();
    document.getElementById("map-xp-bar").style.width = xpProg.percent + "%";
    document.getElementById("map-xp-text").textContent = `${xpProg.progress}/${xpProg.needed} XP`;

    // Update realm locks
    document.querySelectorAll(".realm-card").forEach(card => {
      const realm = card.dataset.realm;
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
  }

  // ── Screen: Character Creation ─────────────────────────────
  function initCharacterCreation() {
    let selectedClass = null;

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
      notify(`Welcome, ${state.character.name} the ${GAME_DATA.classes[selectedClass].name}!`);
      showScreen("map");
    });
  }

  // ── Screen: Map ────────────────────────────────────────────
  function initMap() {
    document.querySelectorAll(".realm-card").forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("locked")) {
          const realm = card.dataset.realm;
          notify(`Reach Level ${GAME_DATA.realmUnlocks[realm]} to unlock this realm!`);
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
      case "echo_valley": initEchoValley(); showScreen("echo"); break;
      case "word_forge": initWordForge(); showScreen("wordforge"); break;
      case "spell_tower": initSpellTower(); showScreen("spelltower"); break;
      case "arena": initArena(); showScreen("arena"); break;
      case "dragons_lair": initDragonsLair(); showScreen("boss"); break;
      case "tavern": initTavern(); showScreen("tavern"); break;
    }
  }

  // ── Echo Valley ────────────────────────────────────────────
  let echoState = {};

  function initEchoValley() {
    echoState = { difficulty: "beginner", hp: 5, maxHp: 5 };
    renderHearts("echo-hearts", echoState.hp, echoState.maxHp);
    loadEchoChallenge();

    // Difficulty buttons
    document.querySelectorAll("#echo-difficulty .btn-diff").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#echo-difficulty .btn-diff").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        echoState.difficulty = btn.dataset.diff;
        loadEchoChallenge();
      });
    });
  }

  function loadEchoChallenge() {
    const items = GAME_DATA.pronunciation[echoState.difficulty];
    const item = items[Math.floor(Math.random() * items.length)];
    echoState.current = item;

    document.getElementById("echo-text").textContent = item.text;
    document.getElementById("echo-phonetic").textContent = item.phonetic ? `[ ${item.phonetic} ]` : "";
    document.getElementById("echo-result").style.display = "none";
    document.getElementById("echo-next").style.display = "none";
  }

  function setupEchoHandlers() {
    document.getElementById("echo-listen").addEventListener("click", () => {
      if (echoState.current) speak(echoState.current.text);
    });

    document.getElementById("echo-speak").addEventListener("click", () => {
      startListening(document.getElementById("echo-speak"), (results) => {
        handleEchoResult(results);
      });
    });

    document.getElementById("echo-next").addEventListener("click", () => {
      if (echoState.hp <= 0) {
        echoState.hp = 5;
        renderHearts("echo-hearts", echoState.hp, echoState.maxHp);
      }
      loadEchoChallenge();
    });

    document.getElementById("echo-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  function handleEchoResult(results) {
    const expected = echoState.current.text;
    let bestScore = 0;
    let bestResult = results[0];

    for (const r of results) {
      const s = scoreAnswer(r, expected);
      if (s > bestScore) {
        bestScore = s;
        bestResult = r;
      }
    }

    const resultEl = document.getElementById("echo-result");
    const resultText = document.getElementById("echo-result-text");
    const resultStars = document.getElementById("echo-result-stars");
    const resultXp = document.getElementById("echo-result-xp");

    resultEl.style.display = "block";
    document.getElementById("echo-next").style.display = "block";

    if (bestScore >= 1) {
      const xpReward = bestScore * 15;
      const goldReward = bestScore * 5;

      if (bestScore === 3) {
        resultText.textContent = `Perfect! You said: "${bestResult}"`;
        resultText.className = "result-text correct";
        state.consecutivePerfect++;
        state.realmStats.echo_valley.perfect++;
      } else if (bestScore === 2) {
        resultText.textContent = `Close! You said: "${bestResult}"`;
        resultText.className = "result-text partial";
        state.consecutivePerfect = 0;
      } else {
        resultText.textContent = `Partial match. You said: "${bestResult}"`;
        resultText.className = "result-text partial";
        state.consecutivePerfect = 0;
      }

      resultStars.textContent = renderStars(bestScore);
      resultXp.textContent = `+${xpReward} XP  +${goldReward} Gold`;

      state.challengesCompleted++;
      state.realmStats.echo_valley.completed++;
      addXp(xpReward, "echo_valley");
      addGold(goldReward);
      updateDailyQuest("echo_valley", 1);
      updateDailyQuest("any", 1);
      if (bestScore === 3) updateDailyQuest("perfect", 1);

      checkAchievement("first_word", true);
      checkAchievement("echo_novice", state.realmStats.echo_valley.completed >= 10);
      checkAchievement("echo_master", state.realmStats.echo_valley.completed >= 50);
      checkAchievement("perfect_10", state.consecutivePerfect >= 10);
      if (bestScore === 3) {
        state.perfectCount++;
        checkAchievement("three_stars", state.perfectCount >= 25);
      }
    } else {
      resultText.textContent = `Not quite. You said: "${bestResult}" — Expected: "${expected}"`;
      resultText.className = "result-text incorrect";
      resultStars.textContent = renderStars(0);
      resultXp.textContent = "";
      state.consecutivePerfect = 0;

      // Check shield potion
      if (hasItem("shield")) {
        useItem("shield");
        notify("Shield Potion absorbed the damage!");
      } else {
        echoState.hp--;
        loseHeart("echo-hearts", echoState.hp, echoState.maxHp);
        if (echoState.hp <= 0) {
          notify("You've run out of hearts! Starting fresh...");
        }
      }
    }
    saveState();
  }

  // ── Word Forge ─────────────────────────────────────────────
  let wordForgeState = {};

  function initWordForge() {
    wordForgeState = { category: "everyday", hp: 5, maxHp: 5, hintLevel: 0 };
    renderHearts("wordforge-hearts", wordForgeState.hp, wordForgeState.maxHp);
    loadWordForgeChallenge();

    document.querySelectorAll("#wordforge-categories .btn-diff").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#wordforge-categories .btn-diff").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        wordForgeState.category = btn.dataset.cat;
        loadWordForgeChallenge();
      });
    });
  }

  function loadWordForgeChallenge() {
    const items = GAME_DATA.vocabulary[wordForgeState.category];
    const item = items[Math.floor(Math.random() * items.length)];
    wordForgeState.current = item;
    wordForgeState.hintLevel = 0;

    document.getElementById("wordforge-definition").textContent = item.definition;
    document.getElementById("wordforge-hint-text").style.display = "none";
    document.getElementById("wordforge-result").style.display = "none";
    document.getElementById("wordforge-next").style.display = "none";
  }

  function setupWordForgeHandlers() {
    document.getElementById("wordforge-hint-btn").addEventListener("click", () => {
      const item = wordForgeState.current;
      wordForgeState.hintLevel++;
      const hintEl = document.getElementById("wordforge-hint-text");
      if (wordForgeState.hintLevel === 1) {
        hintEl.textContent = item.hint;
      } else if (wordForgeState.hintLevel === 2) {
        hintEl.textContent = `${item.syllables} syllable(s) - ${item.hint}`;
      } else {
        hintEl.textContent = `The word is: ${item.word}`;
      }
      hintEl.style.display = "block";
    });

    document.getElementById("wordforge-speak").addEventListener("click", () => {
      startListening(document.getElementById("wordforge-speak"), (results) => {
        handleWordForgeResult(results);
      });
    });

    document.getElementById("wordforge-next").addEventListener("click", () => {
      if (wordForgeState.hp <= 0) {
        wordForgeState.hp = 5;
        renderHearts("wordforge-hearts", wordForgeState.hp, wordForgeState.maxHp);
      }
      loadWordForgeChallenge();
    });

    document.getElementById("wordforge-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  function handleWordForgeResult(results) {
    const item = wordForgeState.current;
    let bestScore = 0;
    let bestResult = results[0];

    for (const r of results) {
      const s = scoreAnswer(r, item.word);
      if (s > bestScore) {
        bestScore = s;
        bestResult = r;
      }
    }

    const resultEl = document.getElementById("wordforge-result");
    const resultText = document.getElementById("wordforge-result-text");
    const resultStars = document.getElementById("wordforge-result-stars");
    const resultXp = document.getElementById("wordforge-result-xp");

    resultEl.style.display = "block";
    document.getElementById("wordforge-next").style.display = "block";

    // Reduce score if hints were used
    const adjustedScore = Math.max(0, bestScore - wordForgeState.hintLevel);
    const finalScore = Math.max(adjustedScore, bestScore > 0 ? 1 : 0);

    if (bestScore >= 1) {
      const xpReward = finalScore * 20;
      const goldReward = finalScore * 7;

      if (bestScore === 3 && wordForgeState.hintLevel === 0) {
        resultText.textContent = `Perfect! "${bestResult}" is correct!`;
        resultText.className = "result-text correct";
        state.consecutivePerfect++;
        state.realmStats.word_forge.perfect++;
      } else {
        resultText.textContent = `Correct! The word is "${item.word}". You said: "${bestResult}"`;
        resultText.className = "result-text correct";
        state.consecutivePerfect = 0;
      }

      resultStars.textContent = renderStars(finalScore);
      resultXp.textContent = `+${xpReward} XP  +${goldReward} Gold`;

      state.challengesCompleted++;
      state.realmStats.word_forge.completed++;
      if (!state.wordsLearned.includes(item.word)) state.wordsLearned.push(item.word);
      addXp(xpReward, "word_forge");
      addGold(goldReward);
      updateDailyQuest("word_forge", 1);
      updateDailyQuest("any", 1);
      if (finalScore === 3) updateDailyQuest("perfect", 1);

      checkAchievement("first_word", true);
      checkAchievement("wordsmith", state.wordsLearned.length >= 25);
      checkAchievement("lexicon_legend", state.wordsLearned.length >= 100);
      if (finalScore === 3) {
        state.perfectCount++;
        checkAchievement("three_stars", state.perfectCount >= 25);
      }
    } else {
      resultText.textContent = `Incorrect. The answer was: "${item.word}". You said: "${bestResult}"`;
      resultText.className = "result-text incorrect";
      resultStars.textContent = renderStars(0);
      resultXp.textContent = "";
      state.consecutivePerfect = 0;

      if (hasItem("shield")) {
        useItem("shield");
        notify("Shield Potion absorbed the damage!");
      } else {
        wordForgeState.hp--;
        loseHeart("wordforge-hearts", wordForgeState.hp, wordForgeState.maxHp);
        if (wordForgeState.hp <= 0) {
          notify("You've run out of hearts! Starting fresh...");
        }
      }
    }
    saveState();
  }

  // ── Spell Tower ────────────────────────────────────────────
  let spellTowerState = {};

  function initSpellTower() {
    spellTowerState = { mode: "scrambled", hp: 5, maxHp: 5 };
    renderHearts("spelltower-hearts", spellTowerState.hp, spellTowerState.maxHp);
    loadSpellTowerChallenge();

    document.querySelectorAll("#spelltower-modes .btn-diff").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#spelltower-modes .btn-diff").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        spellTowerState.mode = btn.dataset.mode;
        loadSpellTowerChallenge();
      });
    });
  }

  function loadSpellTowerChallenge() {
    const wordsEl = document.getElementById("spelltower-words");
    const instructionEl = document.getElementById("spelltower-instruction");
    const grammarEl = document.getElementById("spelltower-grammar");

    if (spellTowerState.mode === "scrambled") {
      const items = GAME_DATA.sentences.scrambled;
      const item = items[Math.floor(Math.random() * items.length)];
      spellTowerState.current = item;
      spellTowerState.answer = item.answer;

      instructionEl.textContent = "Arrange these words into a correct sentence:";
      grammarEl.textContent = item.grammar;
      grammarEl.style.display = "inline-block";

      // Shuffle words
      const shuffled = [...item.words].sort(() => Math.random() - 0.5);
      wordsEl.innerHTML = "";
      shuffled.forEach(word => {
        const span = document.createElement("span");
        span.className = "scrambled-word";
        span.textContent = word;
        wordsEl.appendChild(span);
      });
    } else {
      const items = GAME_DATA.sentences.fillInBlank;
      const item = items[Math.floor(Math.random() * items.length)];
      spellTowerState.current = item;
      spellTowerState.answer = item.answer;

      instructionEl.textContent = "Say the missing word:";
      grammarEl.textContent = item.hint;
      grammarEl.style.display = "inline-block";

      wordsEl.innerHTML = "";
      const span = document.createElement("span");
      span.className = "scrambled-word";
      span.textContent = item.sentence;
      span.style.fontSize = "1rem";
      span.style.animation = "none";
      wordsEl.appendChild(span);
    }

    document.getElementById("spelltower-result").style.display = "none";
    document.getElementById("spelltower-next").style.display = "none";
  }

  function setupSpellTowerHandlers() {
    document.getElementById("spelltower-speak").addEventListener("click", () => {
      startListening(document.getElementById("spelltower-speak"), (results) => {
        handleSpellTowerResult(results);
      });
    });

    document.getElementById("spelltower-next").addEventListener("click", () => {
      if (spellTowerState.hp <= 0) {
        spellTowerState.hp = 5;
        renderHearts("spelltower-hearts", spellTowerState.hp, spellTowerState.maxHp);
      }
      loadSpellTowerChallenge();
    });

    document.getElementById("spelltower-back").addEventListener("click", () => {
      showScreen("map");
      updateMapUI();
    });
  }

  function handleSpellTowerResult(results) {
    const answer = spellTowerState.answer;
    let bestScore = 0;
    let bestResult = results[0];

    for (const r of results) {
      const s = scoreAnswer(r, answer);
      if (s > bestScore) {
        bestScore = s;
        bestResult = r;
      }
    }

    const resultEl = document.getElementById("spelltower-result");
    const resultText = document.getElementById("spelltower-result-text");
    const resultStars = document.getElementById("spelltower-result-stars");
    const resultXp = document.getElementById("spelltower-result-xp");

    resultEl.style.display = "block";
    document.getElementById("spelltower-next").style.display = "block";

    if (bestScore >= 1) {
      const xpReward = bestScore * 25;
      const goldReward = bestScore * 8;

      if (bestScore === 3) {
        resultText.textContent = `Perfect! "${bestResult}"`;
        resultText.className = "result-text correct";
        state.consecutivePerfect++;
        state.realmStats.spell_tower.perfect++;
      } else {
        resultText.textContent = `Close! You said: "${bestResult}" — Expected: "${answer}"`;
        resultText.className = "result-text partial";
        state.consecutivePerfect = 0;
      }

      resultStars.textContent = renderStars(bestScore);
      resultXp.textContent = `+${xpReward} XP  +${goldReward} Gold`;

      state.challengesCompleted++;
      state.realmStats.spell_tower.completed++;
      addXp(xpReward, "spell_tower");
      addGold(goldReward);
      updateDailyQuest("spell_tower", 1);
      updateDailyQuest("any", 1);
      if (bestScore === 3) updateDailyQuest("perfect", 1);

      checkAchievement("first_word", true);
      checkAchievement("spell_weaver", state.realmStats.spell_tower.completed >= 20);
      if (bestScore === 3) {
        state.perfectCount++;
        checkAchievement("three_stars", state.perfectCount >= 25);
      }
    } else {
      resultText.textContent = `Incorrect. Expected: "${answer}". You said: "${bestResult}"`;
      resultText.className = "result-text incorrect";
      resultStars.textContent = renderStars(0);
      resultXp.textContent = "";
      state.consecutivePerfect = 0;

      if (hasItem("shield")) {
        useItem("shield");
        notify("Shield Potion absorbed the damage!");
      } else {
        spellTowerState.hp--;
        loseHeart("spelltower-hearts", spellTowerState.hp, spellTowerState.maxHp);
        if (spellTowerState.hp <= 0) {
          notify("You've run out of hearts! Starting fresh...");
        }
      }
    }
    saveState();
  }

  // ── The Arena ──────────────────────────────────────────────
  let arenaState = {};
  let arenaTimer = null;

  function initArena() {
    arenaState = { score: 0, combo: 0, maxCombo: 0, correct: 0, total: 0, timeLeft: 60, running: false };
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

    // Check time crystal
    if (hasItem("extra_time")) {
      useItem("extra_time");
      arenaState.timeLeft += 15;
      notify("Time Crystal: +15 seconds!");
    }

    document.getElementById("arena-start").style.display = "none";
    document.getElementById("arena-challenge").style.display = "block";
    document.getElementById("arena-results").style.display = "none";

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
    const challenges = GAME_DATA.arena.challenges;
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    arenaState.current = challenge;

    document.getElementById("arena-type-badge").textContent = challenge.type.toUpperCase();
    document.getElementById("arena-question").textContent = challenge.question;
    document.getElementById("arena-feedback").style.display = "none";
  }

  function handleArenaResult(results) {
    if (!arenaState.running) return;
    const challenge = arenaState.current;
    let matched = false;

    for (const r of results) {
      const m = matchesAny(r, challenge.accept);
      if (m.match) {
        matched = true;
        break;
      }
    }

    arenaState.total++;
    const feedback = document.getElementById("arena-feedback");
    feedback.style.display = "block";
    feedback.style.animation = "none";
    void feedback.offsetWidth;
    feedback.style.animation = "";

    if (matched) {
      arenaState.combo++;
      arenaState.correct++;
      if (arenaState.combo > arenaState.maxCombo) arenaState.maxCombo = arenaState.combo;

      let multiplier = 1;
      if (arenaState.combo >= 10) multiplier = 5;
      else if (arenaState.combo >= 7) multiplier = 3;
      else if (arenaState.combo >= 3) multiplier = 2;

      const points = 50 * multiplier;
      arenaState.score += points;

      feedback.textContent = `Correct! +${points} pts` + (multiplier > 1 ? ` (${multiplier}x combo!)` : "");
      feedback.className = "arena-feedback correct";

      document.getElementById("arena-score").textContent = arenaState.score;
      document.getElementById("arena-combo").textContent = arenaState.combo >= 2 ? `${arenaState.combo}x Combo!` : "";

      updateDailyQuest("streak", arenaState.combo);
    } else {
      arenaState.combo = 0;
      feedback.textContent = `Wrong! Answer: "${challenge.answer}"`;
      feedback.className = "arena-feedback incorrect";
      document.getElementById("arena-combo").textContent = "";
    }

    setTimeout(() => {
      if (arenaState.running) loadArenaChallenge();
    }, 800);
  }

  function endArena() {
    arenaState.running = false;
    clearInterval(arenaTimer);

    document.getElementById("arena-challenge").style.display = "none";
    document.getElementById("arena-results").style.display = "block";

    document.getElementById("arena-final-score").textContent = arenaState.score + " Points!";

    const statsGrid = document.getElementById("arena-stats-grid");
    statsGrid.innerHTML = `
      <div class="arena-stat-item">
        <div class="stat-value">${arenaState.correct}</div>
        <div class="stat-label">Correct</div>
      </div>
      <div class="arena-stat-item">
        <div class="stat-value">${arenaState.total}</div>
        <div class="stat-label">Attempted</div>
      </div>
      <div class="arena-stat-item">
        <div class="stat-value">${arenaState.maxCombo}x</div>
        <div class="stat-label">Best Combo</div>
      </div>
    `;

    // Update records
    if (arenaState.score > state.arenaBest) {
      state.arenaBest = arenaState.score;
      state.realmStats.arena.bestScore = arenaState.score;
      notify("New personal best!");
    }
    state.realmStats.arena.completed++;
    state.challengesCompleted += arenaState.correct;

    // Rewards
    const xpReward = Math.floor(arenaState.score / 5);
    const goldReward = Math.floor(arenaState.score / 10);
    addXp(xpReward, "arena");
    addGold(goldReward);
    updateDailyQuest("arena", arenaState.score);
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
      card.innerHTML = `
        <div class="boss-emoji">${GAME_DATA.icons[boss.image]}</div>
        <h4>${boss.name}</h4>
        <p>${boss.title}</p>
        ${isDefeated ? '<div class="defeated-badge">\u2705 Defeated</div>' : ""}
        ${isLocked ? `<div style="color:var(--text-dim);font-size:0.8rem;margin-top:0.3rem;">\uD83D\uDD12 Level ${unlockLevel}</div>` : ""}
      `;

      card.addEventListener("click", () => {
        if (isLocked) {
          notify(`Reach Level ${unlockLevel} to challenge this boss!`);
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
      boss,
      bossHp: boss.hp,
      bossMaxHp: boss.hp,
      playerHp: 5,
      maxHp: 5,
      challengeIndex: 0,
      challenges: [...boss.challenges].sort(() => Math.random() - 0.5)
    };

    document.getElementById("boss-selection").style.display = "none";
    document.getElementById("boss-battle").style.display = "block";
    document.getElementById("boss-end").style.display = "none";

    document.getElementById("boss-portrait").textContent = GAME_DATA.icons[boss.image];
    document.getElementById("boss-portrait").style.color = boss.color;
    document.getElementById("boss-name").textContent = boss.name;
    document.getElementById("boss-name").style.color = boss.color;
    document.getElementById("boss-title-text").textContent = boss.title;
    document.getElementById("boss-hp-bar").style.width = "100%";
    document.getElementById("boss-hp-text").textContent = `${boss.hp}/${boss.hp}`;

    renderHearts("boss-hearts", bossState.playerHp, bossState.maxHp);
    document.getElementById("boss-dialogue").textContent = `"${boss.intro}"`;

    setTimeout(() => loadBossChallenge(), 1500);
  }

  function loadBossChallenge() {
    if (bossState.challengeIndex >= bossState.challenges.length) {
      // Ran out of challenges, boss survives
      bossState.challengeIndex = 0;
      bossState.challenges.sort(() => Math.random() - 0.5);
    }
    const challenge = bossState.challenges[bossState.challengeIndex];
    document.getElementById("boss-question").textContent = challenge.question;
    document.getElementById("boss-feedback").style.display = "none";
  }

  function handleBossResult(results) {
    const challenge = bossState.challenges[bossState.challengeIndex];
    let matched = false;

    for (const r of results) {
      const m = matchesAny(r, challenge.accept);
      if (m.match) {
        matched = true;
        break;
      }
    }

    const feedback = document.getElementById("boss-feedback");
    feedback.style.display = "block";
    feedback.style.animation = "none";
    void feedback.offsetWidth;
    feedback.style.animation = "";

    if (matched) {
      // Player attacks boss
      const damage = Math.floor(bossState.bossMaxHp / bossState.challenges.length) + 5;
      bossState.bossHp = Math.max(0, bossState.bossHp - damage);
      const hpPercent = (bossState.bossHp / bossState.bossMaxHp) * 100;
      document.getElementById("boss-hp-bar").style.width = hpPercent + "%";
      document.getElementById("boss-hp-text").textContent = `${bossState.bossHp}/${bossState.bossMaxHp}`;

      feedback.textContent = `\u2694\uFE0F HIT! -${damage} damage!`;
      feedback.className = "battle-feedback hit";
      floatingNumber(`-${damage}`, "damage");
      updateDailyQuest("boss", damage);

      if (bossState.bossHp <= 0) {
        setTimeout(() => endBossBattle(true), 1000);
        return;
      }
    } else {
      // Boss attacks player
      const attackMsg = bossState.boss.attacks[Math.floor(Math.random() * bossState.boss.attacks.length)];

      if (hasItem("shield")) {
        useItem("shield");
        feedback.textContent = `${attackMsg} Shield Potion blocks the attack!`;
        feedback.className = "battle-feedback hit";
      } else {
        bossState.playerHp--;
        loseHeart("boss-hearts", bossState.playerHp, bossState.maxHp);
        feedback.textContent = `${attackMsg} Answer was: "${challenge.accept[0]}"`;
        feedback.className = "battle-feedback miss";
        floatingNumber("-1 \u2764\uFE0F", "damage");

        if (bossState.playerHp <= 0) {
          // Check phoenix feather
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

    bossState.challengeIndex++;
    setTimeout(() => {
      document.getElementById("boss-dialogue").textContent = matched
        ? `"${bossState.boss.victory.substring(0, 40)}... Gah!"`
        : `"${bossState.boss.attacks[Math.floor(Math.random() * bossState.boss.attacks.length)]}"`;
      loadBossChallenge();
    }, 1200);
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
      endMessage.textContent = `"${bossState.boss.victory}"`;

      const rewards = bossState.boss.rewards;
      endRewards.innerHTML = `
        <div class="reward-item">\u2B50 +${rewards.xp} XP</div>
        <div class="reward-item">\uD83E\uDE99 +${rewards.gold} Gold</div>
        <div class="reward-item">\uD83C\uDFC5 Title: ${rewards.title}</div>
      `;

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
      endMessage.textContent = `"${bossState.boss.defeat}"`;
      endRewards.innerHTML = '<div class="reward-item">Try again when you\'re stronger!</div>';
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
    const grid = document.getElementById("npc-grid");
    grid.innerHTML = "";

    const npcEmojis = { innkeeper: "\uD83C\uDF7A", merchant: "\uD83D\uDCB0", bard: "\uD83C\uDFB6", quest_giver: "\uD83E\uDDD9" };

    GAME_DATA.tavern.scenarios.forEach(scenario => {
      const card = document.createElement("div");
      card.className = "npc-card";
      const completed = state.tavernCompleted.includes(scenario.id);
      card.innerHTML = `
        <div class="npc-emoji">${npcEmojis[scenario.id] || "\uD83E\uDDD1"}</div>
        <h4>${scenario.name}</h4>
        <p>${scenario.description}</p>
        ${completed ? '<p style="color:var(--green);font-size:0.8rem;">\u2705 Completed</p>' : ""}
      `;
      card.addEventListener("click", () => startConversation(scenario));
      grid.appendChild(card);
    });

    document.getElementById("tavern-npcs").style.display = "block";
    document.getElementById("tavern-conversation").style.display = "none";
  }

  function startConversation(scenario) {
    tavernState = {
      scenario,
      dialogueIndex: 0
    };

    document.getElementById("tavern-npcs").style.display = "none";
    document.getElementById("tavern-conversation").style.display = "block";

    const log = document.getElementById("conversation-log");
    log.innerHTML = "";

    // Show first NPC line
    addChatBubble(scenario.name, scenario.dialogue[0].npc, "npc");
    speak(scenario.dialogue[0].npc);
  }

  function addChatBubble(speaker, text, type) {
    const log = document.getElementById("conversation-log");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + type;
    bubble.innerHTML = `<div class="speaker">${speaker}</div><div>${text}</div>`;
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  function handleTavernResult(results) {
    const scenario = tavernState.scenario;
    const dialogue = scenario.dialogue[tavernState.dialogueIndex];
    const spokenText = results[0];

    addChatBubble(state.character.name, spokenText, "player");

    // Check if response matches expected topics
    const spoken = spokenText.toLowerCase();
    const matched = dialogue.expectedTopics.some(topic => spoken.includes(topic));

    if (matched) {
      tavernState.dialogueIndex++;

      if (tavernState.dialogueIndex < scenario.dialogue.length) {
        setTimeout(() => {
          const nextDialogue = scenario.dialogue[tavernState.dialogueIndex];
          addChatBubble(scenario.name, nextDialogue.npc, "npc");
          speak(nextDialogue.npc);
        }, 800);
      } else {
        // Conversation complete
        setTimeout(() => {
          addChatBubble(scenario.name, "It was lovely talking to you! Safe travels!", "npc");
          if (!state.tavernCompleted.includes(scenario.id)) {
            state.tavernCompleted.push(scenario.id);
          }
          state.realmStats.tavern.completed++;
          state.realmStats.tavern.conversationsFinished = state.tavernCompleted.length;
          addXp(50, "tavern");
          addGold(20);
          updateDailyQuest("tavern", 1);
          updateDailyQuest("any", 1);
          checkAchievement("tavern_regular", state.tavernCompleted.length >= GAME_DATA.tavern.scenarios.length);
          saveState();
          notify("Conversation complete! +50 XP +20 Gold");
        }, 800);
      }
    } else {
      setTimeout(() => {
        addChatBubble(scenario.name, "Hmm, interesting... Could you tell me more?", "npc");
        speak("Hmm, interesting. Could you tell me more?");
      }, 800);
    }
  }

  function setupTavernHandlers() {
    document.getElementById("tavern-speak").addEventListener("click", () => {
      startListening(document.getElementById("tavern-speak"), (results) => {
        handleTavernResult(results);
      });
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
      card.innerHTML = `
        <div class="item-icon">${GAME_DATA.icons[item.icon] || "\uD83D\uDCE6"}</div>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <div class="item-price">\uD83E\uDE99 ${item.price}</div>
        ${owned > 0 ? `<p style="color:var(--green);font-size:0.8rem;">Owned: ${owned}</p>` : ""}
        <button class="btn btn-primary btn-small shop-buy-btn" data-item="${item.id}" ${!canAfford ? "disabled" : ""}>
          ${canAfford ? "Buy" : "Not enough gold"}
        </button>
      `;
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

    notify(`Purchased ${item.name}!`);
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
    document.getElementById("profile-avatar").textContent = GAME_DATA.icons[classData.avatar] || "";
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
        div.innerHTML = `${GAME_DATA.icons[item.icon] || ""} ${item.name} <span class="item-count">${count}</span>`;
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
        initTitle();
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
      card.innerHTML = `
        <div class="quest-info">
          <h4>${quest.description}</h4>
          <div class="quest-progress">${quest.progress}/${quest.target}</div>
          <div class="quest-progress-bar">
            <div class="quest-progress-fill" style="width:${progressPercent}%"></div>
          </div>
        </div>
        <div class="quest-rewards">
          <span>\u2B50 ${quest.xpReward} XP</span>
          <span>\uD83E\uDE99 ${quest.goldReward}</span>
        </div>
        ${quest.completed ? '<div class="quest-check">\u2705</div>' : ""}
      `;
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
      card.innerHTML = `
        <div class="achievement-icon">${unlocked ? (GAME_DATA.icons[achievement.icon] || "\u2B50") : "\uD83D\uDD12"}</div>
        <div class="achievement-info">
          <h4>${achievement.name}</h4>
          <p>${achievement.description}</p>
          <span class="achievement-xp">${unlocked ? "\u2705 Unlocked" : `+${achievement.xpReward} XP`}</span>
        </div>
      `;
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
    setupEchoHandlers();
    setupWordForgeHandlers();
    setupSpellTowerHandlers();
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
