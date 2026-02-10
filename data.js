// ============================================================
// FREE SPEECH v2 — Game Data
// Conversation scenarios, bosses, shop, achievements, quests
// ============================================================

const GAME_DATA = {

  // ── STORYTELLER'S GLEN: Describe & Narrate ─────────────────
  storytellers_glen: [
    {
      id: "favorite_place",
      npcGreeting: "Welcome, traveler! I love hearing about faraway lands. Tell me about your favorite place in the world!",
      prompt: "Describe your favorite place to the storyteller",
      topicKeywords: ["place", "city", "town", "country", "beach", "mountain", "park", "home", "beautiful", "love", "visit", "travel", "nature", "building", "street", "river", "lake", "sea", "ocean", "garden", "forest", "island"],
      bonusVocab: ["magnificent", "breathtaking", "serene", "picturesque", "vibrant", "peaceful", "stunning", "charming", "majestic", "cozy"],
      minWords: 10,
      npcResponses: {
        great: "What a vivid description! I can almost see it in my mind. You truly have the gift of storytelling!",
        good: "That sounds like a lovely place! I'd love to hear even more details about it.",
        weak: "Interesting... could you paint a more detailed picture for me? What does it look like?",
        off_topic: "Hmm, that's nice, but I was asking about a place you love! Where is your favorite spot?"
      },
      followUp: {
        npcLine: "And what do you love most about that place? What makes it special?",
        topicKeywords: ["love", "special", "favorite", "beautiful", "people", "food", "memory", "feel", "happy", "friend", "family", "amazing", "enjoy", "wonderful", "perfect", "remember"],
        bonusVocab: ["atmosphere", "unforgettable", "extraordinary", "nostalgic", "captivating", "enchanting"]
      }
    },
    {
      id: "magical_forest",
      npcGreeting: "Imagine you're walking through a magical forest. What do you see around you?",
      prompt: "Describe what you see in the magical forest",
      topicKeywords: ["tree", "forest", "flower", "animal", "bird", "light", "path", "green", "tall", "big", "mushroom", "fairy", "magic", "creature", "leaf", "dark", "bright", "river", "waterfall", "stone"],
      bonusVocab: ["enchanted", "ancient", "mystical", "glowing", "towering", "luminous", "ethereal", "whispering", "magnificent", "dense"],
      minWords: 10,
      npcResponses: {
        great: "What an incredible vision! Your words bring the forest to life!",
        good: "I can picture it! The forest sounds magical indeed.",
        weak: "Tell me more! What colors do you see? What sounds do you hear?",
        off_topic: "We're imagining a forest, remember? What trees or creatures do you see?"
      },
      followUp: {
        npcLine: "Suddenly you hear a strange sound. What happens next in your story?",
        topicKeywords: ["hear", "sound", "noise", "turn", "look", "see", "walk", "run", "find", "discover", "animal", "creature", "follow", "surprise", "hide", "strange"],
        bonusVocab: ["mysterious", "startled", "cautiously", "adventure", "unexpected", "courage"]
      }
    },
    {
      id: "dream_house",
      npcGreeting: "If you could build your dream home anywhere, what would it look like?",
      prompt: "Describe your dream house to the storyteller",
      topicKeywords: ["house", "home", "room", "big", "small", "garden", "window", "door", "kitchen", "bedroom", "living", "bathroom", "floor", "roof", "wall", "pool", "balcony", "view", "modern", "old"],
      bonusVocab: ["spacious", "luxurious", "minimalist", "contemporary", "traditional", "panoramic", "magnificent", "elegant", "sophisticated", "cozy"],
      minWords: 10,
      npcResponses: {
        great: "That sounds like an absolute dream! You have wonderful taste!",
        good: "Nice! I can imagine living there. What a lovely home that would be!",
        weak: "Interesting start! Can you describe it in more detail? How many rooms?",
        off_topic: "I asked about your dream house! What kind of home would you love to have?"
      }
    },
    {
      id: "childhood_memory",
      npcGreeting: "Tell me about a happy memory from when you were young. What happened?",
      prompt: "Share a happy childhood memory",
      topicKeywords: ["when", "young", "child", "kid", "remember", "play", "friend", "family", "school", "summer", "birthday", "holiday", "fun", "happy", "laugh", "game", "toy", "park", "house", "mom", "dad", "brother", "sister"],
      bonusVocab: ["nostalgic", "cherished", "innocent", "joyful", "memorable", "carefree", "delightful", "precious", "wonderful", "heartwarming"],
      minWords: 10,
      npcResponses: {
        great: "What a beautiful memory! Thank you for sharing something so personal!",
        good: "That sounds like such a fun time! Childhood memories are the best.",
        weak: "Tell me more about what happened! Who was there with you?",
        off_topic: "I'd love to hear about a happy memory from your childhood!"
      }
    },
    {
      id: "perfect_day",
      npcGreeting: "Describe your perfect day from morning to night. What would you do?",
      prompt: "Tell about your perfect day",
      topicKeywords: ["morning", "wake", "breakfast", "lunch", "dinner", "afternoon", "evening", "night", "eat", "go", "visit", "friend", "family", "walk", "relax", "enjoy", "read", "watch", "play", "cook", "sleep", "sun", "coffee"],
      bonusVocab: ["leisurely", "refreshing", "delightful", "tranquil", "invigorating", "satisfying", "blissful", "magnificent", "exquisite", "splendid"],
      minWords: 10,
      npcResponses: {
        great: "Now THAT sounds like a perfect day! You've planned it beautifully!",
        good: "Lovely! That sounds like a wonderful way to spend the day.",
        weak: "Give me more details! What would you eat? Where would you go?",
        off_topic: "I want to hear about your ideal day! What would you do from morning to night?"
      }
    }
  ],

  // ── WORDSMITH'S WORKSHOP: Themed Vocabulary ────────────────
  wordsmiths_workshop: [
    {
      id: "daily_routine",
      npcGreeting: "I'm studying how people live their daily lives. Can you tell me about your typical day?",
      prompt: "Tell the wordsmith about your daily routine",
      topicKeywords: ["wake", "morning", "breakfast", "work", "school", "lunch", "afternoon", "dinner", "evening", "sleep", "shower", "brush", "eat", "go", "come", "home", "exercise", "study", "cook", "clean", "read", "watch"],
      bonusVocab: ["routine", "schedule", "typically", "usually", "occasionally", "productive", "exhausting", "refreshing", "nutritious", "efficient"],
      minWords: 10,
      npcResponses: {
        great: "Fascinating routine! You described it with such rich detail and vocabulary!",
        good: "Sounds like a well-organized day! Good use of daily life vocabulary.",
        weak: "Can you be more specific? What time do things happen? What do you eat?",
        off_topic: "I'd love to hear about your daily routine! What do you do each day?"
      },
      followUp: {
        npcLine: "And what's your favorite part of the day? Why do you enjoy it most?",
        topicKeywords: ["favorite", "best", "enjoy", "love", "like", "relax", "fun", "happy", "peaceful", "exciting", "because", "feel", "moment", "time"],
        bonusVocab: ["cherish", "anticipate", "unwind", "rejuvenate", "savor", "tranquil"]
      }
    },
    {
      id: "food_cooking",
      npcGreeting: "I'm writing a cookbook! Tell me about your favorite food or a dish you know how to make.",
      prompt: "Describe your favorite food or recipe",
      topicKeywords: ["food", "cook", "make", "eat", "recipe", "ingredient", "delicious", "taste", "flavor", "meal", "dish", "chicken", "rice", "pasta", "soup", "salad", "bread", "vegetable", "fruit", "spice", "sauce", "hot", "cold", "sweet", "salt"],
      bonusVocab: ["appetizing", "savory", "aromatic", "exquisite", "culinary", "nutritious", "seasoning", "marinate", "sauté", "garnish"],
      minWords: 10,
      npcResponses: {
        great: "Delicious description! You really know your way around food vocabulary!",
        good: "That sounds tasty! I love how you described the flavors.",
        weak: "What ingredients go into it? How does it taste?",
        off_topic: "I want to hear about food! What's your favorite dish?"
      }
    },
    {
      id: "seasons_chat",
      npcGreeting: "I just love when the seasons change! What's your favorite season and why?",
      prompt: "Tell the wordsmith about your favorite season",
      topicKeywords: ["season", "winter", "summer", "spring", "fall", "autumn", "weather", "cold", "hot", "warm", "cool", "snow", "rain", "sun", "wind", "flower", "leaf", "ice", "beach", "holiday"],
      bonusVocab: ["temperature", "magnificent", "refreshing", "cozy", "breeze", "blossom", "crisp", "humid", "frost", "radiant"],
      minWords: 10,
      npcResponses: {
        great: "What a wonderful description! You paint a vivid picture with your words!",
        good: "I can tell you really enjoy that time of year! Nice!",
        weak: "Interesting... could you tell me a bit more about why you love it?",
        off_topic: "Hmm, that's nice, but I was curious about seasons! What's your favorite?"
      },
      followUp: {
        npcLine: "And what activities do you enjoy during that season?",
        topicKeywords: ["walk", "swim", "ski", "read", "travel", "play", "enjoy", "outside", "inside", "sport", "holiday", "visit", "wear", "drink", "watch", "build"],
        bonusVocab: ["adventure", "relaxation", "tradition", "festivities", "hibernate", "flourish"]
      }
    },
    {
      id: "job_business",
      npcGreeting: "Tell me about your work or studies. What do you do and what skills does it require?",
      prompt: "Describe your job or field of study",
      topicKeywords: ["work", "job", "study", "school", "university", "company", "office", "team", "project", "skill", "learn", "teach", "manage", "build", "create", "write", "computer", "people", "help", "solve", "problem", "meeting"],
      bonusVocab: ["professional", "collaborate", "expertise", "innovative", "responsibility", "deadline", "strategy", "ambitious", "proficiency", "analyze"],
      minWords: 10,
      npcResponses: {
        great: "Impressive! You articulated that with excellent professional vocabulary!",
        good: "Sounds like interesting work! Good use of career-related words.",
        weak: "What exactly do you do day to day? What skills do you use?",
        off_topic: "I'd like to hear about your work or studies. What's your profession?"
      }
    },
    {
      id: "hobbies",
      npcGreeting: "Everyone needs a hobby! What do you do for fun in your free time?",
      prompt: "Tell about your hobbies and interests",
      topicKeywords: ["hobby", "fun", "free", "time", "play", "read", "sport", "music", "game", "draw", "paint", "cook", "travel", "watch", "movie", "exercise", "run", "swim", "write", "dance", "sing", "collect", "garden", "photo"],
      bonusVocab: ["passionate", "enthusiastic", "creative", "recreational", "fascinating", "therapeutic", "exhilarating", "fulfilling", "dedicated", "immersive"],
      minWords: 10,
      npcResponses: {
        great: "What wonderful hobbies! You described them with such enthusiasm and detail!",
        good: "Nice! It's great that you have things you're passionate about.",
        weak: "Tell me more! Why do you enjoy it? How often do you do it?",
        off_topic: "I want to hear about your hobbies! What do you do for fun?"
      }
    }
  ],

  // ── COUNCIL CHAMBER: Opinion & Argument ────────────────────
  council_chamber: [
    {
      id: "homework_debate",
      npcGreeting: "The council is debating: Should children have homework? What is your opinion?",
      prompt: "Argue whether children should have homework",
      topicKeywords: ["homework", "children", "school", "study", "learn", "think", "believe", "opinion", "because", "however", "therefore", "important", "help", "practice", "time", "play", "stress", "education", "teacher", "parent", "skill"],
      bonusVocab: ["furthermore", "consequently", "nevertheless", "beneficial", "detrimental", "perspective", "argument", "evidence", "crucial", "fundamental"],
      minWords: 15,
      npcResponses: {
        great: "A brilliant argument! Your reasoning is clear and your use of connectors is excellent!",
        good: "Good points! Try adding more connecting words like 'however' or 'therefore'.",
        weak: "You've stated a position, but why? Give me reasons with 'because' or 'since'.",
        off_topic: "We're debating homework for children. What's your position on this topic?"
      },
      followUp: {
        npcLine: "Interesting! But what would someone who disagrees with you say? How would you respond?",
        topicKeywords: ["but", "however", "although", "disagree", "argue", "point", "counter", "still", "even", "though", "while", "despite", "believe", "think", "understand", "agree"],
        bonusVocab: ["counterargument", "acknowledge", "nevertheless", "perspective", "valid", "compromise"]
      }
    },
    {
      id: "technology_debate",
      npcGreeting: "Here's a question for the council: Is technology making our lives better or worse?",
      prompt: "Argue whether technology is good for society",
      topicKeywords: ["technology", "phone", "computer", "internet", "social", "media", "better", "worse", "help", "problem", "connect", "communicate", "information", "health", "work", "easy", "difficult", "change", "future", "think", "believe"],
      bonusVocab: ["innovation", "advancement", "consequence", "revolutionary", "detrimental", "efficiency", "isolation", "unprecedented", "transform", "dependent"],
      minWords: 15,
      npcResponses: {
        great: "Excellent reasoning! You presented a nuanced argument with strong vocabulary!",
        good: "Good thoughts! Try to address both positive and negative sides.",
        weak: "Can you explain your reasoning? Use words like 'because', 'for example'.",
        off_topic: "We're discussing technology's impact on society. What do you think?"
      }
    },
    {
      id: "environment_debate",
      npcGreeting: "The kingdom faces a crisis! What should ordinary people do to protect the environment?",
      prompt: "Argue what people should do for the environment",
      topicKeywords: ["environment", "nature", "recycle", "save", "energy", "water", "pollution", "climate", "tree", "plant", "reduce", "waste", "plastic", "car", "walk", "bike", "protect", "earth", "animal", "change", "should", "must"],
      bonusVocab: ["sustainability", "conservation", "renewable", "ecological", "biodegradable", "carbon", "footprint", "initiative", "responsibility", "preservation"],
      minWords: 15,
      npcResponses: {
        great: "A passionate and well-structured argument! The council is impressed!",
        good: "Good ideas! Try to organize them with 'First', 'Second', 'Finally'.",
        weak: "What specific actions should people take? Give concrete examples.",
        off_topic: "We're discussing how to protect the environment. What are your ideas?"
      }
    },
    {
      id: "reading_vs_video",
      npcGreeting: "Some say reading books is better than watching videos for learning. Do you agree?",
      prompt: "Compare reading books vs watching videos for learning",
      topicKeywords: ["read", "book", "watch", "video", "learn", "better", "because", "think", "believe", "information", "understand", "remember", "easy", "difficult", "both", "prefer", "imagination", "visual", "focus", "attention"],
      bonusVocab: ["comprehension", "retention", "stimulate", "passive", "engaging", "interactive", "supplement", "traditional", "multimedia", "cognitive"],
      minWords: 15,
      npcResponses: {
        great: "What a thoughtful comparison! You argued both sides skillfully!",
        good: "Good reasoning! Try comparing them directly using 'while' or 'whereas'.",
        weak: "Which do you prefer and why? Use comparison words.",
        off_topic: "We're comparing books and videos for learning. What's your view?"
      }
    },
    {
      id: "city_vs_country",
      npcGreeting: "A classic debate: Is it better to live in a big city or in the countryside? Defend your choice!",
      prompt: "Argue whether city or countryside living is better",
      topicKeywords: ["city", "country", "countryside", "live", "better", "quiet", "noise", "nature", "job", "opportunity", "people", "space", "traffic", "air", "clean", "busy", "peaceful", "shop", "hospital", "school", "think", "prefer"],
      bonusVocab: ["urban", "rural", "metropolitan", "tranquil", "infrastructure", "community", "amenities", "congestion", "commute", "proximity"],
      minWords: 15,
      npcResponses: {
        great: "Brilliantly argued! Your comparative language was superb!",
        good: "Solid points! Adding 'on the other hand' or 'in contrast' would strengthen it.",
        weak: "Why do you think so? Give me specific advantages and disadvantages.",
        off_topic: "We're debating city vs countryside living. Which do you prefer?"
      }
    }
  ],

  // ── QUICK WIT ARENA: Timed Topics ──────────────────────────
  quick_wit_arena: [
    {
      id: "qw_animal",
      prompt: "Describe an animal without saying its name",
      topicKeywords: ["animal", "big", "small", "fast", "slow", "eat", "live", "run", "fly", "swim", "fur", "feather", "tail", "leg", "wild", "pet", "color", "sound", "strong", "cute"],
      bonusVocab: ["predator", "mammal", "habitat", "nocturnal", "domestic", "carnivore"],
      minWords: 5
    },
    {
      id: "qw_weekend",
      prompt: "What did you do last weekend?",
      topicKeywords: ["weekend", "saturday", "sunday", "went", "played", "watched", "ate", "visited", "friend", "family", "fun", "relax", "sleep", "cook", "clean", "shop", "walk", "movie", "game", "read"],
      bonusVocab: ["enjoyable", "productive", "leisure", "adventure", "memorable", "spontaneous"],
      minWords: 5
    },
    {
      id: "qw_superpower",
      prompt: "If you had a superpower, what would it be?",
      topicKeywords: ["fly", "invisible", "strong", "fast", "read", "mind", "time", "travel", "power", "ability", "hero", "save", "help", "would", "want", "choose", "because", "people", "world"],
      bonusVocab: ["telekinesis", "immortality", "invincible", "extraordinary", "supernatural", "incredible"],
      minWords: 5
    },
    {
      id: "qw_weather",
      prompt: "Describe today's weather",
      topicKeywords: ["weather", "today", "sunny", "rainy", "cloudy", "cold", "hot", "warm", "wind", "snow", "clear", "sky", "temperature", "outside", "nice", "beautiful", "terrible", "storm"],
      bonusVocab: ["overcast", "humidity", "forecast", "breezy", "scorching", "frigid"],
      minWords: 5
    },
    {
      id: "qw_movie",
      prompt: "Tell me about a movie you enjoyed",
      topicKeywords: ["movie", "film", "watch", "actor", "story", "funny", "scary", "exciting", "action", "comedy", "drama", "character", "scene", "favorite", "recommend", "about", "plot", "ending"],
      bonusVocab: ["captivating", "thrilling", "protagonist", "cinematography", "masterpiece", "compelling"],
      minWords: 5
    },
    {
      id: "qw_invention",
      prompt: "Name an important invention and explain why",
      topicKeywords: ["invention", "important", "because", "change", "world", "help", "people", "technology", "phone", "computer", "internet", "medicine", "electricity", "car", "wheel", "print", "communication", "life"],
      bonusVocab: ["revolutionary", "transformative", "innovation", "breakthrough", "fundamental", "indispensable"],
      minWords: 5
    },
    {
      id: "qw_country",
      prompt: "Name a country you'd like to visit and why",
      topicKeywords: ["country", "visit", "travel", "want", "because", "culture", "food", "people", "beautiful", "famous", "history", "language", "nature", "city", "beach", "mountain", "see", "experience"],
      bonusVocab: ["fascinating", "diverse", "heritage", "exotic", "captivating", "wanderlust"],
      minWords: 5
    },
    {
      id: "qw_school_memory",
      prompt: "Share a funny school memory",
      topicKeywords: ["school", "class", "teacher", "friend", "funny", "remember", "laugh", "day", "time", "happen", "student", "test", "lunch", "break", "joke", "mistake", "surprise"],
      bonusVocab: ["hilarious", "embarrassing", "unforgettable", "mischievous", "spontaneous", "comical"],
      minWords: 5
    },
    {
      id: "qw_breakfast",
      prompt: "What do you usually eat for breakfast?",
      topicKeywords: ["breakfast", "eat", "morning", "bread", "egg", "coffee", "tea", "milk", "cereal", "fruit", "toast", "juice", "cook", "quick", "healthy", "delicious", "usually", "sometimes", "favorite"],
      bonusVocab: ["nutritious", "energizing", "wholesome", "appetizing", "savory", "portion"],
      minWords: 5
    },
    {
      id: "qw_hero",
      prompt: "Who is your hero and why?",
      topicKeywords: ["hero", "person", "because", "admire", "inspire", "strong", "brave", "kind", "help", "family", "mother", "father", "teacher", "leader", "example", "respect", "love", "important", "learn"],
      bonusVocab: ["inspirational", "courageous", "compassionate", "remarkable", "dedicated", "influential"],
      minWords: 5
    }
  ],

  // ── DRAGON'S LAIR: Boss Conversations ──────────────────────
  bosses: [
    {
      id: "grammar_goblin",
      name: "Grammar Goblin",
      title: "Corruptor of Sentences",
      hp: 100,
      color: "#4a7c3f",
      intro: "Heheheh! Your grammar is pathetic, hero! Let's see if you can build proper sentences about ANYTHING I choose!",
      victory: "No! Your sentences are too well-constructed! I am defeated!",
      defeat: "Hahahaha! Your grammar crumbles like stale bread!",
      attacks: [
        "The Goblin hurls a SYNTAX BOMB at you!",
        "The Goblin casts COMMA SPLICE!",
        "The Goblin summons a DANGLING MODIFIER!"
      ],
      rounds: [
        {
          npcLine: "Talk to me about your morning routine — and you BETTER use correct grammar!",
          topicKeywords: ["morning", "wake", "breakfast", "brush", "shower", "dress", "go", "eat", "drink", "usually", "always", "then", "after", "before", "first"],
          bonusVocab: ["routine", "typically", "subsequently", "prior", "afterward", "commence"],
          focus: "Use complete sentences with subject + verb"
        },
        {
          npcLine: "Now tell me what you did YESTERDAY! Past tense or I attack!",
          topicKeywords: ["yesterday", "went", "ate", "saw", "played", "watched", "visited", "worked", "studied", "talked", "read", "walked", "cooked", "cleaned", "finished"],
          bonusVocab: ["accomplished", "experienced", "encountered", "completed", "discovered"],
          focus: "Past tense verbs"
        },
        {
          npcLine: "Grrr! Now tell me about your PLANS for the future!",
          topicKeywords: ["will", "going", "plan", "want", "hope", "future", "tomorrow", "next", "year", "dream", "wish", "intend", "maybe", "probably", "soon"],
          bonusVocab: ["aspire", "anticipate", "envision", "determined", "ambition", "ultimately"],
          focus: "Future tense expressions"
        }
      ],
      rewards: { xp: 500, gold: 100, title: "Grammar Guardian" }
    },
    {
      id: "vocab_vampire",
      name: "Vocab Vampire",
      title: "Devourer of Definitions",
      hp: 150,
      color: "#8b0000",
      intro: "I feast upon weak vocabulary! Use ADVANCED words when you speak to me, or your word power will be drained!",
      victory: "Impossible! Your vocabulary burns like sunlight! I am vanquished!",
      defeat: "Your vocabulary is anemic, just like my dinner! Mwahahaha!",
      attacks: [
        "The Vampire drains your WORD POWER!",
        "The Vampire casts DEFINITION DARKNESS!",
        "The Vampire summons a SYNONYM SWARM!"
      ],
      rounds: [
        {
          npcLine: "Describe the most BEAUTIFUL place you've ever seen. And use fancy words!",
          topicKeywords: ["beautiful", "place", "see", "visit", "nature", "city", "view", "mountain", "ocean", "sunset", "amazing", "wonderful", "incredible"],
          bonusVocab: ["breathtaking", "magnificent", "spectacular", "picturesque", "awe-inspiring", "resplendent", "panoramic", "sublime", "pristine", "ethereal"],
          focus: "Use descriptive and advanced adjectives"
        },
        {
          npcLine: "Tell me about a DIFFICULT experience you overcame. Sophisticated words only!",
          topicKeywords: ["difficult", "hard", "challenge", "overcome", "problem", "solve", "learn", "strong", "try", "fail", "succeed", "help", "feel", "struggle", "grow"],
          bonusVocab: ["perseverance", "resilience", "adversity", "triumph", "determination", "formidable", "unwavering", "tenacious", "fortitude", "indomitable"],
          focus: "Abstract vocabulary about emotions and experiences"
        },
        {
          npcLine: "Explain why EDUCATION is important. Make me weep with your eloquence!",
          topicKeywords: ["education", "school", "learn", "important", "knowledge", "skill", "future", "job", "people", "society", "children", "opportunity", "world", "improve", "understand"],
          bonusVocab: ["fundamental", "enlightenment", "empowerment", "intellectual", "curriculum", "indispensable", "transformative", "cultivate", "paramount", "erudition"],
          focus: "Academic and formal vocabulary"
        }
      ],
      rewards: { xp: 750, gold: 150, title: "Vocabulary Virtuoso" }
    },
    {
      id: "accent_dragon",
      name: "Accent Dragon",
      title: "Lord of Mispronunciation",
      hp: 200,
      color: "#ff6600",
      intro: "ROOOAR! I demand LONG, CLEAR sentences! Every stuttered word makes me STRONGER! Speak at length or BURN!",
      victory: "Your speech is... PERFECT! The flames of confusion cannot touch you! I yield!",
      defeat: "BAHAHAHA! Your words are scattered like ashes in the wind!",
      attacks: [
        "The Dragon breathes MISPRONUNCIATION FIRE!",
        "The Dragon unleashes a PHONETIC FIRESTORM!",
        "The Dragon roars with ACCENTUAL FURY!"
      ],
      rounds: [
        {
          npcLine: "Tell me a LONG story about something that happened to you. I want DETAILS!",
          topicKeywords: ["story", "happened", "one", "day", "time", "went", "saw", "said", "then", "after", "because", "so", "but", "finally", "feel", "think", "remember"],
          bonusVocab: ["subsequently", "meanwhile", "eventually", "unexpectedly", "remarkably", "consequently"],
          focus: "Speak at length — aim for 30+ words"
        },
        {
          npcLine: "Now explain how to do something — step by step, CLEARLY!",
          topicKeywords: ["first", "then", "next", "after", "finally", "step", "need", "start", "put", "take", "make", "add", "wait", "turn", "open", "close", "carefully"],
          bonusVocab: ["procedure", "subsequently", "furthermore", "additionally", "ensure", "precisely"],
          focus: "Clear sequential instructions"
        },
        {
          npcLine: "FINAL CHALLENGE! Describe the most EPIC adventure you can imagine!",
          topicKeywords: ["adventure", "hero", "journey", "battle", "dragon", "quest", "brave", "magic", "sword", "fight", "save", "discover", "kingdom", "treasure", "enemy", "victory"],
          bonusVocab: ["legendary", "perilous", "triumphant", "formidable", "valiant", "treacherous", "magnificent", "destiny", "extraordinary", "epic"],
          focus: "Extended speech with vivid description"
        }
      ],
      rewards: { xp: 1000, gold: 200, title: "Dragon Slayer" }
    },
    {
      id: "idiom_specter",
      name: "Idiom Specter",
      title: "Phantom of Figurative Speech",
      hp: 175,
      color: "#7b68ee",
      intro: "Woooooo... I speak in riddles and figures! Use IDIOMS and FIGURATIVE language or be lost forever in confusion!",
      victory: "You understand every expression! My riddles hold no power over you!",
      defeat: "You're lost in a sea of confusion! My idioms will haunt you FOREVER!",
      attacks: [
        "The Specter casts MIXED METAPHOR!",
        "The Specter hurls a CONFUSING CLICHÉ!",
        "The Specter summons FIGURATIVE FOG!"
      ],
      rounds: [
        {
          npcLine: "Tell me about a TIME you had to WORK VERY HARD. Use colorful expressions!",
          topicKeywords: ["work", "hard", "difficult", "try", "effort", "long", "tired", "finally", "succeed", "give", "up", "keep", "going", "push", "through", "challenge"],
          bonusVocab: ["burning the midnight oil", "break a sweat", "blood sweat and tears", "buckle down", "nose to the grindstone", "piece of cake", "uphill battle", "worth it"],
          focus: "Try to use idioms and figurative expressions"
        },
        {
          npcLine: "Describe someone you ADMIRE. Use expressions that paint a picture!",
          topicKeywords: ["person", "admire", "kind", "strong", "smart", "help", "inspire", "leader", "heart", "gold", "role", "model", "always", "never", "give", "brave"],
          bonusVocab: ["heart of gold", "go the extra mile", "stand out", "one in a million", "pillar of strength", "ray of sunshine", "old soul", "sharp as a tack"],
          focus: "Figurative language to describe personality"
        },
        {
          npcLine: "Tell me about a MISTAKE you made and what you LEARNED from it!",
          topicKeywords: ["mistake", "learn", "lesson", "wrong", "right", "realize", "understand", "better", "change", "grow", "try", "again", "never", "forget", "important"],
          bonusVocab: ["learn the hard way", "blessing in disguise", "silver lining", "back to square one", "live and learn", "turn over a new leaf", "the last straw", "hindsight"],
          focus: "Narrative with reflective language"
        }
      ],
      rewards: { xp: 800, gold: 175, title: "Idiom Master" }
    },
    {
      id: "tense_titan",
      name: "Tense Titan",
      title: "Warden of Time",
      hp: 250,
      color: "#4169e1",
      intro: "I AM THE TENSE TITAN! Past, present, future — all tenses must be used CORRECTLY! Show me you can control TIME ITSELF!",
      victory: "You have mastered every tense! Past, present, and future bend to YOUR will!",
      defeat: "HA! You can't even tell past from present! Time itself rejects you!",
      attacks: [
        "The Titan warps TEMPORAL GRAMMAR!",
        "The Titan casts TENSE CONFUSION!",
        "The Titan unleashes a CHRONOLOGICAL CATASTROPHE!"
      ],
      rounds: [
        {
          npcLine: "Tell me about your LIFE — past, present, AND future! Mix ALL the tenses!",
          topicKeywords: ["was", "were", "am", "is", "will", "been", "have", "had", "going", "used", "now", "before", "after", "currently", "someday", "recently", "already", "yet", "always"],
          bonusVocab: ["previously", "currently", "simultaneously", "eventually", "meanwhile", "henceforth", "subsequently", "nowadays", "formerly", "prospectively"],
          focus: "Use past, present, and future tenses correctly"
        },
        {
          npcLine: "Now tell me a story using ONLY the past tense! No present allowed!",
          topicKeywords: ["was", "were", "went", "had", "said", "told", "saw", "came", "gave", "took", "made", "found", "knew", "thought", "felt", "became", "began", "left", "brought", "kept"],
          bonusVocab: ["accomplished", "encountered", "discovered", "experienced", "overcame", "witnessed", "embarked", "ventured", "persevered", "triumphed"],
          focus: "Consistent past tense narrative"
        },
        {
          npcLine: "FINAL CHALLENGE! Tell me three things: what you HAVE done, what you ARE doing, and what you WILL do!",
          topicKeywords: ["have", "has", "been", "doing", "am", "currently", "will", "going", "plan", "already", "right", "now", "soon", "just", "recently", "next", "tomorrow", "already", "finished", "started"],
          bonusVocab: ["accomplished", "undertaking", "pursuing", "anticipating", "progressing", "aspiring", "commenced", "intending", "endeavoring", "envisioning"],
          focus: "Perfect, continuous, and future tenses"
        }
      ],
      rewards: { xp: 1200, gold: 250, title: "Time Lord of Tenses" }
    }
  ],

  // ── THE TAVERN: Free Practice ──────────────────────────────
  tavern: [
    {
      id: "innkeeper",
      npc: "innkeeper",
      name: "Innkeeper Bertha",
      description: "Chat about food, travel, and life",
      topics: [
        {
          npcGreeting: "Welcome to The Golden Tongue Tavern! What brings you here today, traveler?",
          prompt: "Tell the innkeeper why you're here",
          topicKeywords: ["travel", "journey", "quest", "adventure", "hungry", "thirsty", "tired", "rest", "explore", "looking", "visit", "need", "want", "came", "here"],
          bonusVocab: ["weary", "famished", "wanderer", "destination", "respite"],
          minWords: 5,
          npcResponses: {
            great: "A true adventurer! Well, you've come to the right place! What would you like to eat or drink?",
            good: "Welcome indeed! Make yourself at home. Can I get you anything?",
            weak: "That's nice! Tell me a bit more about your journey!",
            off_topic: "Well, whatever the reason, you're welcome here! So what brings you to these parts?"
          }
        },
        {
          npcGreeting: "I make the best stew in the realm! What's your favorite food?",
          prompt: "Tell Bertha about your favorite food",
          topicKeywords: ["food", "eat", "love", "favorite", "delicious", "cook", "meal", "dish", "taste", "chicken", "fish", "pasta", "rice", "soup", "salad", "bread", "sweet", "spicy"],
          bonusVocab: ["appetizing", "savory", "culinary", "exquisite", "delectable"],
          minWords: 5,
          npcResponses: {
            great: "Oh my, that sounds absolutely delicious! You really know your food!",
            good: "Yum! I should try making that sometime!",
            weak: "Sounds tasty! What does it taste like? What's in it?",
            off_topic: "Ha! I asked about food, dear! What's your favorite thing to eat?"
          }
        },
        {
          npcGreeting: "You know, I've always dreamed of traveling. Where have you been on your adventures?",
          prompt: "Tell Bertha about a place you've visited",
          topicKeywords: ["visit", "travel", "went", "saw", "place", "city", "country", "beautiful", "people", "culture", "food", "amazing", "different", "experience", "remember"],
          bonusVocab: ["fascinating", "memorable", "breathtaking", "diverse", "extraordinary"],
          minWords: 5,
          npcResponses: {
            great: "What a wonderful tale! You've been to such amazing places!",
            good: "That sounds like quite the adventure! I'm jealous!",
            weak: "Interesting! What was the best part of your visit?",
            off_topic: "Tell me about somewhere you've traveled to! I love hearing travel stories."
          }
        }
      ]
    },
    {
      id: "merchant",
      npc: "merchant",
      name: "Merchant Aldric",
      description: "Discuss business, money, and deals",
      topics: [
        {
          npcGreeting: "Psst! Hey you! I've got some ideas for making gold. What kind of work do you do?",
          prompt: "Tell the merchant about your work",
          topicKeywords: ["work", "job", "do", "make", "money", "business", "company", "office", "team", "skill", "sell", "buy", "trade", "help", "create", "build"],
          bonusVocab: ["profession", "enterprise", "revenue", "negotiate", "investment"],
          minWords: 5,
          npcResponses: {
            great: "A shrewd professional! I can tell you know the value of hard work and gold!",
            good: "Interesting line of work! There's always gold to be made!",
            weak: "Hmm, tell me more. What exactly do you do to earn your keep?",
            off_topic: "I asked about your work, friend! How do you earn your gold?"
          }
        },
        {
          npcGreeting: "If you had a thousand gold coins, what would you spend them on?",
          prompt: "Tell Aldric what you'd buy with lots of money",
          topicKeywords: ["buy", "spend", "money", "gold", "house", "travel", "car", "clothes", "food", "gift", "save", "invest", "help", "family", "want", "dream", "would"],
          bonusVocab: ["investment", "luxurious", "charitable", "extravagant", "practical"],
          minWords: 5,
          npcResponses: {
            great: "Ha! Now THAT'S how to spend gold! You've got expensive taste — I like it!",
            good: "Not bad! A mix of fun and practical spending!",
            weak: "Come on, dream bigger! A thousand gold is a lot! What would you REALLY buy?",
            off_topic: "Gold coins, friend! What would you buy if you had loads of money?"
          }
        }
      ]
    },
    {
      id: "bard_npc",
      npc: "bard_npc",
      name: "Bard Melodia",
      description: "Talk about music, stories, and creativity",
      topics: [
        {
          npcGreeting: "Hello! I'm Melodia, the wandering bard. Do you enjoy music? What kind do you listen to?",
          prompt: "Tell Melodia about your music taste",
          topicKeywords: ["music", "song", "listen", "like", "love", "favorite", "sing", "play", "band", "artist", "pop", "rock", "classical", "jazz", "hip", "dance", "guitar", "piano", "drum", "radio"],
          bonusVocab: ["melody", "rhythm", "harmonious", "genre", "acoustic", "lyrical"],
          minWords: 5,
          npcResponses: {
            great: "Wonderful taste! Music really is the universal language, isn't it?",
            good: "Nice! I'd love to play some of that style for you!",
            weak: "Tell me more! What songs make you feel happy?",
            off_topic: "I was asking about music! What kind of songs do you enjoy?"
          }
        },
        {
          npcGreeting: "Every person has a story. What's the most interesting thing that ever happened to you?",
          prompt: "Share an interesting story with Melodia",
          topicKeywords: ["story", "happened", "one", "day", "time", "interesting", "funny", "scary", "amazing", "surprise", "remember", "friend", "went", "saw", "found", "never", "before"],
          bonusVocab: ["extraordinary", "unforgettable", "dramatic", "coincidence", "adventure"],
          minWords: 5,
          npcResponses: {
            great: "What a tale! That would make a fantastic song! You're a natural storyteller!",
            good: "Interesting! I can see the beginning of a ballad there!",
            weak: "Go on! What happened next? Don't leave me in suspense!",
            off_topic: "I want to hear YOUR story! Something exciting that happened to you!"
          }
        }
      ]
    },
    {
      id: "elder_sage",
      npc: "elder_sage",
      name: "Elder Sage Theron",
      description: "Discuss wisdom, goals, and philosophy",
      topics: [
        {
          npcGreeting: "Ah, young hero. Tell me — why do you seek to improve your English? What drives you?",
          prompt: "Tell the sage why you're learning English",
          topicKeywords: ["learn", "English", "speak", "improve", "better", "want", "need", "work", "travel", "study", "communicate", "friend", "world", "opportunity", "dream", "future", "goal"],
          bonusVocab: ["aspiration", "motivation", "proficiency", "determination", "enlightenment"],
          minWords: 5,
          npcResponses: {
            great: "A noble and well-articulated purpose! Your determination will take you far!",
            good: "A worthy goal! Keep practicing and you'll achieve it.",
            weak: "Can you tell me more about why it matters to you?",
            off_topic: "I asked about your motivation for learning English, young one!"
          }
        },
        {
          npcGreeting: "What is your greatest dream for the future? What do you hope to achieve?",
          prompt: "Share your dreams and goals with the sage",
          topicKeywords: ["dream", "future", "goal", "want", "hope", "achieve", "plan", "become", "success", "happy", "family", "career", "travel", "create", "build", "help", "world", "life"],
          bonusVocab: ["aspiration", "ambition", "vision", "fulfillment", "legacy", "prosperity"],
          minWords: 5,
          npcResponses: {
            great: "What a magnificent vision! The words you use reveal the depth of your dreams!",
            good: "Beautiful dreams! I believe you can make them reality.",
            weak: "Tell me more about this dream. What steps will you take?",
            off_topic: "I want to hear about YOUR dreams and goals for the future!"
          }
        },
        {
          npcGreeting: "If you could give one piece of advice to everyone in the world, what would it be?",
          prompt: "Share your wisdom with the sage",
          topicKeywords: ["advice", "think", "believe", "important", "always", "never", "should", "people", "life", "learn", "love", "kind", "help", "try", "give", "respect", "listen", "patience"],
          bonusVocab: ["wisdom", "philosophy", "compassion", "perseverance", "empathy", "profound"],
          minWords: 5,
          npcResponses: {
            great: "Truly wise words! You speak with the insight of someone far beyond your years!",
            good: "Good advice! The world would be better if more people thought that way.",
            weak: "An interesting thought. Can you explain why you believe this?",
            off_topic: "What advice would YOU give to make the world a better place?"
          }
        }
      ]
    }
  ],

  // ── SHOP ITEMS ─────────────────────────────────────────────
  shop: {
    items: [
      { id: "hint_scroll", name: "Hint Scroll", description: "Reveals topic keywords during challenges", price: 30, icon: "scroll", type: "consumable", effect: "hint" },
      { id: "shield_potion", name: "Shield Potion", description: "Prevents 1 heart loss on poor score", price: 50, icon: "shield", type: "consumable", effect: "shield" },
      { id: "xp_potion", name: "XP Elixir", description: "Doubles XP earned for 5 challenges", price: 75, icon: "potion", type: "consumable", effect: "double_xp", duration: 5 },
      { id: "gold_amulet", name: "Gold Amulet", description: "Earn 50% more gold for 10 challenges", price: 100, icon: "amulet", type: "consumable", effect: "gold_boost", duration: 10 },
      { id: "time_crystal", name: "Time Crystal", description: "Adds 15 extra seconds in Quick Wit Arena", price: 60, icon: "crystal", type: "consumable", effect: "extra_time" },
      { id: "phoenix_feather", name: "Phoenix Feather", description: "Revive with full hearts if defeated in boss battle", price: 150, icon: "feather", type: "consumable", effect: "revive" },
      { id: "bard_hat", name: "Bard's Hat", description: "A fancy hat for your character", price: 200, icon: "hat", type: "cosmetic", slot: "head" },
      { id: "wizard_robe", name: "Wizard's Robe", description: "An enchanted robe that shimmers with power", price: 250, icon: "robe", type: "cosmetic", slot: "body" },
      { id: "knight_armor", name: "Knight's Plate", description: "Gleaming armor fit for a champion", price: 300, icon: "armor", type: "cosmetic", slot: "body" },
      { id: "golden_crown", name: "Golden Crown", description: "A crown befitting a master of English", price: 500, icon: "crown", type: "cosmetic", slot: "head" },
      { id: "dragon_cloak", name: "Dragon Cloak", description: "A cloak made from dragon scales", price: 750, icon: "cloak", type: "cosmetic", slot: "body" },
      { id: "ancient_tome", name: "Ancient Tome", description: "Unlocks bonus lore entries", price: 400, icon: "book", type: "permanent", effect: "lore" }
    ]
  },

  // ── ACHIEVEMENTS ───────────────────────────────────────────
  achievements: [
    { id: "first_word", name: "First Word", description: "Complete your first challenge", icon: "star", xpReward: 50 },
    { id: "storyteller_10", name: "Story Novice", description: "Complete 10 Storyteller's Glen challenges", icon: "megaphone", xpReward: 100 },
    { id: "storyteller_50", name: "Story Master", description: "Complete 50 Storyteller's Glen challenges", icon: "megaphone", xpReward: 500 },
    { id: "wordsmith_10", name: "Wordsmith Apprentice", description: "Complete 10 Workshop challenges", icon: "book", xpReward: 100 },
    { id: "wordsmith_50", name: "Wordsmith Legend", description: "Complete 50 Workshop challenges", icon: "book", xpReward: 500 },
    { id: "council_10", name: "Debater", description: "Complete 10 Council Chamber challenges", icon: "wand", xpReward: 200 },
    { id: "speed_demon", name: "Speed Demon", description: "Score 500+ points in Quick Wit Arena", icon: "lightning", xpReward: 300 },
    { id: "arena_champion", name: "Arena Champion", description: "Score 1000+ points in Quick Wit Arena", icon: "trophy", xpReward: 600 },
    { id: "dragon_slayer", name: "Dragon Slayer", description: "Defeat the Accent Dragon", icon: "dragon", xpReward: 500 },
    { id: "boss_crusher", name: "Boss Crusher", description: "Defeat all 5 bosses", icon: "skull", xpReward: 1000 },
    { id: "streak_3", name: "Dedicated Student", description: "Maintain a 3-day streak", icon: "fire", xpReward: 100 },
    { id: "streak_7", name: "Weekly Warrior", description: "Maintain a 7-day streak", icon: "fire", xpReward: 300 },
    { id: "streak_30", name: "Monthly Master", description: "Maintain a 30-day streak", icon: "fire", xpReward: 1000 },
    { id: "level_5", name: "Rising Hero", description: "Reach Level 5", icon: "shield", xpReward: 100 },
    { id: "level_10", name: "Seasoned Adventurer", description: "Reach Level 10", icon: "shield", xpReward: 250 },
    { id: "level_25", name: "Legendary Champion", description: "Reach Level 25", icon: "shield", xpReward: 500 },
    { id: "level_50", name: "Grand Master", description: "Reach Level 50", icon: "crown", xpReward: 2000 },
    { id: "gold_hoarder", name: "Gold Hoarder", description: "Accumulate 1000 gold", icon: "coins", xpReward: 200 },
    { id: "three_stars_25", name: "Triple Threat", description: "Get 3 stars on 25 challenges", icon: "stars", xpReward: 350 },
    { id: "tavern_regular", name: "Tavern Regular", description: "Talk to all tavern NPCs", icon: "beer", xpReward: 300 },
    { id: "shopaholic", name: "Shopaholic", description: "Buy 10 items from the shop", icon: "bag", xpReward: 150 },
    { id: "daily_hero", name: "Daily Hero", description: "Complete all 3 daily quests in one day", icon: "sun", xpReward: 200 },
    { id: "comeback_kid", name: "Comeback Kid", description: "Win a boss battle with only 1 heart remaining", icon: "heart_icon", xpReward: 400 },
    { id: "chatterbox", name: "Chatterbox", description: "Speak 1000 total words across all challenges", icon: "microphone", xpReward: 500 },
    { id: "eloquent", name: "Eloquent Speaker", description: "Score 90+ on a single conversation", icon: "star", xpReward: 400 }
  ],

  // ── DAILY QUEST TEMPLATES ──────────────────────────────────
  dailyQuests: [
    { id: "dq_story", type: "storytellers_glen", description: "Complete {count} storytelling challenges", countRange: [2, 4], xpReward: 75, goldReward: 25 },
    { id: "dq_vocab", type: "wordsmiths_workshop", description: "Complete {count} vocabulary conversations", countRange: [2, 4], xpReward: 75, goldReward: 25 },
    { id: "dq_council", type: "council_chamber", description: "Win {count} debates in the Council", countRange: [1, 3], xpReward: 100, goldReward: 30 },
    { id: "dq_arena", type: "quick_wit_arena", description: "Score {count}+ points in Quick Wit Arena", countRange: [200, 500], xpReward: 100, goldReward: 35 },
    { id: "dq_boss", type: "boss", description: "Deal {count} damage to any boss", countRange: [30, 60], xpReward: 125, goldReward: 40 },
    { id: "dq_stars", type: "perfect", description: "Get {count} three-star scores", countRange: [2, 5], xpReward: 100, goldReward: 30 },
    { id: "dq_tavern", type: "tavern", description: "Have a tavern conversation", countRange: [1, 1], xpReward: 60, goldReward: 20 },
    { id: "dq_any", type: "any", description: "Complete {count} challenges in any realm", countRange: [3, 8], xpReward: 80, goldReward: 25 },
    { id: "dq_words", type: "words_spoken", description: "Speak {count} total words", countRange: [50, 150], xpReward: 90, goldReward: 30 },
    { id: "dq_followup", type: "followup", description: "Complete {count} follow-up rounds", countRange: [1, 3], xpReward: 80, goldReward: 25 }
  ],

  // ── LEVEL THRESHOLDS ───────────────────────────────────────
  levelThresholds: (function() {
    const thresholds = [0];
    for (let i = 1; i <= 50; i++) {
      thresholds.push(Math.floor(100 * Math.pow(i, 1.5)));
    }
    return thresholds;
  })(),

  // ── REALM UNLOCK LEVELS ────────────────────────────────────
  realmUnlocks: {
    storytellers_glen: 1,
    wordsmiths_workshop: 1,
    council_chamber: 5,
    quick_wit_arena: 10,
    dragons_lair: 15,
    tavern: 1
  },

  // ── BOSS UNLOCK LEVELS ─────────────────────────────────────
  bossUnlocks: {
    grammar_goblin: 15,
    vocab_vampire: 18,
    idiom_specter: 20,
    accent_dragon: 22,
    tense_titan: 25
  },

  // ── CLASS DEFINITIONS ──────────────────────────────────────
  classes: {
    bard: {
      name: "Bard",
      description: "Master of spoken word and song. Bonus XP in Storyteller's Glen.",
      bonus: { realm: "storytellers_glen", xpMultiplier: 1.25 },
      avatar: "bard",
      color: "#e6a817"
    },
    wizard: {
      name: "Wizard",
      description: "Scholar of language and grammar. Bonus XP in Council Chamber.",
      bonus: { realm: "council_chamber", xpMultiplier: 1.25 },
      avatar: "wizard",
      color: "#6a5acd"
    },
    knight: {
      name: "Knight",
      description: "Brave warrior of vocabulary. Bonus XP in Wordsmith's Workshop.",
      bonus: { realm: "wordsmiths_workshop", xpMultiplier: 1.25 },
      avatar: "knight",
      color: "#c0c0c0"
    }
  },

  // ── REALM DISPLAY NAMES ────────────────────────────────────
  realmNames: {
    storytellers_glen: "Storyteller's Glen",
    wordsmiths_workshop: "Wordsmith's Workshop",
    council_chamber: "Council Chamber",
    quick_wit_arena: "Quick Wit Arena",
    dragons_lair: "Dragon's Lair",
    tavern: "The Tavern"
  },

  // ── CONNECTORS for sentence quality scoring ────────────────
  connectors: ["because", "however", "although", "therefore", "furthermore", "moreover", "nevertheless", "consequently", "meanwhile", "additionally", "since", "while", "despite", "though", "unless", "otherwise", "finally", "first", "second", "then", "next", "also", "but", "so", "and", "yet", "still", "besides", "instead", "for example", "in addition", "on the other hand", "as a result", "in conclusion", "in fact", "of course"]
};
