// ============================================================
// FREE SPEECH - Fantasy RPG English Practice Game
// Game Data: Words, Sentences, Bosses, Achievements, Shop Items
// ============================================================

const GAME_DATA = {

  // ── ECHO VALLEY: Pronunciation Practice ──────────────────
  pronunciation: {
    beginner: [
      { text: "hello", phonetic: "heh-LOH" },
      { text: "world", phonetic: "WURLD" },
      { text: "thank you", phonetic: "THANGK yoo" },
      { text: "please", phonetic: "PLEEZ" },
      { text: "sorry", phonetic: "SOR-ee" },
      { text: "water", phonetic: "WAW-ter" },
      { text: "beautiful", phonetic: "BYOO-tih-ful" },
      { text: "friend", phonetic: "FREND" },
      { text: "family", phonetic: "FAM-uh-lee" },
      { text: "morning", phonetic: "MOR-ning" },
      { text: "evening", phonetic: "EEV-ning" },
      { text: "goodbye", phonetic: "good-BYE" },
      { text: "welcome", phonetic: "WEL-kum" },
      { text: "happy", phonetic: "HAP-ee" },
      { text: "music", phonetic: "MYOO-zik" },
      { text: "color", phonetic: "KUL-er" },
      { text: "garden", phonetic: "GAR-den" },
      { text: "kitchen", phonetic: "KICH-en" },
      { text: "window", phonetic: "WIN-doh" },
      { text: "question", phonetic: "KWES-chun" },
      { text: "answer", phonetic: "AN-ser" },
      { text: "story", phonetic: "STOR-ee" },
      { text: "simple", phonetic: "SIM-pul" },
      { text: "travel", phonetic: "TRAV-ul" },
      { text: "village", phonetic: "VIL-ij" },
      { text: "castle", phonetic: "KAS-ul" },
      { text: "forest", phonetic: "FOR-est" },
      { text: "river", phonetic: "RIV-er" },
      { text: "mountain", phonetic: "MOWN-tin" },
      { text: "treasure", phonetic: "TREZH-er" },
      { text: "adventure", phonetic: "ad-VEN-cher" },
      { text: "magic", phonetic: "MAJ-ik" },
      { text: "dragon", phonetic: "DRAG-un" },
      { text: "courage", phonetic: "KUR-ij" },
      { text: "journey", phonetic: "JUR-nee" }
    ],
    intermediate: [
      { text: "the weather is wonderful today", phonetic: null },
      { text: "I would like a cup of coffee", phonetic: null },
      { text: "she is reading an interesting book", phonetic: null },
      { text: "we are going to the market", phonetic: null },
      { text: "he plays the guitar every evening", phonetic: null },
      { text: "the children are playing in the park", phonetic: null },
      { text: "I need to finish my homework", phonetic: null },
      { text: "can you help me find the library", phonetic: null },
      { text: "the restaurant serves delicious food", phonetic: null },
      { text: "they traveled across the country last summer", phonetic: null },
      { text: "the brave knight entered the dark cave", phonetic: null },
      { text: "a mysterious stranger arrived at the tavern", phonetic: null },
      { text: "the wizard cast a powerful spell", phonetic: null },
      { text: "our quest begins at the edge of the forest", phonetic: null },
      { text: "the ancient map reveals a hidden path", phonetic: null },
      { text: "I enjoy learning new languages", phonetic: null },
      { text: "the movie was absolutely fantastic", phonetic: null },
      { text: "could you please repeat that slowly", phonetic: null },
      { text: "my brother works at a hospital", phonetic: null },
      { text: "we should take a different route", phonetic: null },
      { text: "the museum opens at nine o'clock", phonetic: null },
      { text: "she has been studying for three hours", phonetic: null },
      { text: "I forgot to bring my umbrella", phonetic: null },
      { text: "the train departs from platform five", phonetic: null },
      { text: "he is the tallest person in the room", phonetic: null },
      { text: "we celebrated her birthday last weekend", phonetic: null },
      { text: "the garden is full of colorful flowers", phonetic: null },
      { text: "I usually wake up at seven in the morning", phonetic: null },
      { text: "the dog chased the cat around the yard", phonetic: null },
      { text: "please turn off the lights before you leave", phonetic: null },
      { text: "the armor protected the warrior from harm", phonetic: null },
      { text: "legends speak of a sword hidden in stone", phonetic: null },
      { text: "the phoenix rises from the ashes reborn", phonetic: null },
      { text: "every hero must face their greatest fear", phonetic: null },
      { text: "the enchanted forest whispers ancient secrets", phonetic: null }
    ],
    advanced: [
      { text: "the entrepreneurial spirit drives innovation in modern economies", phonetic: null },
      { text: "she demonstrated extraordinary perseverance throughout the competition", phonetic: null },
      { text: "the pharmaceutical company developed a revolutionary treatment", phonetic: null },
      { text: "his pronunciation of sophisticated vocabulary was impeccable", phonetic: null },
      { text: "the archaeological expedition uncovered a remarkable civilization", phonetic: null },
      { text: "environmental sustainability requires unprecedented global cooperation", phonetic: null },
      { text: "the philosophical implications of artificial intelligence are profound", phonetic: null },
      { text: "her comprehensive analysis thoroughly addressed every counterargument", phonetic: null },
      { text: "the choreographer meticulously orchestrated an unforgettable performance", phonetic: null },
      { text: "technological advancements have fundamentally transformed communication", phonetic: null },
      { text: "the conscientious employee consistently exceeded expectations", phonetic: null },
      { text: "bureaucratic inefficiency undermines organizational effectiveness", phonetic: null },
      { text: "the unequivocal evidence corroborated the hypothesis conclusively", phonetic: null },
      { text: "an unprecedented catastrophe necessitated immediate intervention", phonetic: null },
      { text: "the idiosyncratic characteristics distinguished him from his contemporaries", phonetic: null },
      { text: "the juxtaposition of ancient wisdom and modern technology creates fascinating possibilities", phonetic: null },
      { text: "her eloquent dissertation on socioeconomic disparities garnered widespread acclaim", phonetic: null },
      { text: "the reconnaissance mission revealed critical vulnerabilities in the enemy fortifications", phonetic: null },
      { text: "the metamorphosis of the caterpillar into a butterfly symbolizes transformation", phonetic: null },
      { text: "his magnanimous contribution to the charitable foundation was deeply appreciated", phonetic: null },
      { text: "the labyrinthine corridors of the dungeon confounded even seasoned adventurers", phonetic: null },
      { text: "an ancient prophecy foretold the convergence of three celestial phenomena", phonetic: null },
      { text: "the incantation required precise pronunciation of every arcane syllable", phonetic: null },
      { text: "the indomitable spirit of the heroes triumphed against overwhelming adversity", phonetic: null },
      { text: "the necromancer's machinations threatened the equilibrium of the entire realm", phonetic: null },
      { text: "the bibliographical references substantiated the researcher's methodology", phonetic: null },
      { text: "the quintessential characteristics of exemplary leadership include empathy and decisiveness", phonetic: null },
      { text: "the serendipitous discovery revolutionized our understanding of molecular biology", phonetic: null },
      { text: "the anthropological study illuminated previously misunderstood cultural practices", phonetic: null },
      { text: "the electromagnetic spectrum encompasses frequencies beyond human perception", phonetic: null }
    ]
  },

  // ── WORD FORGE: Vocabulary ───────────────────────────────
  vocabulary: {
    everyday: [
      { word: "abundant", definition: "Existing in large quantities; more than enough", hint: "Starts with 'ab'", syllables: 3 },
      { word: "benevolent", definition: "Well-meaning and kindly; generous", hint: "Starts with 'be'", syllables: 4 },
      { word: "candid", definition: "Truthful and straightforward; frank", hint: "Starts with 'ca'", syllables: 2 },
      { word: "diligent", definition: "Having or showing care in one's work; hardworking", hint: "Starts with 'di'", syllables: 3 },
      { word: "eloquent", definition: "Fluent and persuasive in speaking or writing", hint: "Starts with 'el'", syllables: 3 },
      { word: "frugal", definition: "Sparing or economical with money or food", hint: "Starts with 'fr'", syllables: 2 },
      { word: "genuine", definition: "Truly what it is said to be; authentic", hint: "Starts with 'ge'", syllables: 3 },
      { word: "humble", definition: "Having a modest view of one's importance", hint: "Starts with 'hu'", syllables: 2 },
      { word: "innovative", definition: "Featuring new methods; creative and original", hint: "Starts with 'in'", syllables: 4 },
      { word: "jubilant", definition: "Feeling or expressing great happiness and triumph", hint: "Starts with 'ju'", syllables: 3 },
      { word: "keen", definition: "Eager or enthusiastic; sharp", hint: "Starts with 'ke'", syllables: 1 },
      { word: "lively", definition: "Full of life and energy; animated", hint: "Starts with 'li'", syllables: 2 },
      { word: "meticulous", definition: "Showing great attention to detail; very careful", hint: "Starts with 'me'", syllables: 4 },
      { word: "nurture", definition: "To care for and encourage growth or development", hint: "Starts with 'nu'", syllables: 2 },
      { word: "optimistic", definition: "Hopeful and confident about the future", hint: "Starts with 'op'", syllables: 4 },
      { word: "persistent", definition: "Continuing firmly despite difficulty or opposition", hint: "Starts with 'pe'", syllables: 3 },
      { word: "quarrel", definition: "An angry argument or disagreement", hint: "Starts with 'qu'", syllables: 2 },
      { word: "resilient", definition: "Able to recover quickly from difficulties; tough", hint: "Starts with 're'", syllables: 3 },
      { word: "sincere", definition: "Free from pretense or deceit; genuine", hint: "Starts with 'si'", syllables: 2 },
      { word: "thrive", definition: "To grow or develop well; to prosper", hint: "Starts with 'th'", syllables: 1 },
      { word: "unique", definition: "Being the only one of its kind; unlike anything else", hint: "Starts with 'un'", syllables: 2 },
      { word: "vivid", definition: "Producing powerful feelings or strong, clear images", hint: "Starts with 'vi'", syllables: 2 },
      { word: "whimsical", definition: "Playfully quaint or fanciful; unpredictable", hint: "Starts with 'wh'", syllables: 3 },
      { word: "zealous", definition: "Having great energy or enthusiasm for a cause", hint: "Starts with 'ze'", syllables: 2 },
      { word: "amiable", definition: "Friendly and pleasant in manner", hint: "Starts with 'am'", syllables: 4 },
      { word: "blissful", definition: "Extremely happy; full of joy", hint: "Starts with 'bl'", syllables: 2 },
      { word: "courageous", definition: "Not deterred by danger or pain; brave", hint: "Starts with 'co'", syllables: 3 },
      { word: "devoted", definition: "Very loving or loyal; dedicated", hint: "Starts with 'de'", syllables: 3 },
      { word: "embrace", definition: "To hold closely in one's arms; to accept willingly", hint: "Starts with 'em'", syllables: 2 },
      { word: "flourish", definition: "To grow or develop in a healthy or vigorous way", hint: "Starts with 'fl'", syllables: 2 }
    ],
    business: [
      { word: "revenue", definition: "Income generated from business operations", hint: "Starts with 're'", syllables: 3 },
      { word: "leverage", definition: "Use something to maximum advantage", hint: "Starts with 'le'", syllables: 3 },
      { word: "stakeholder", definition: "A person with an interest in a business or project", hint: "Starts with 'st'", syllables: 3 },
      { word: "benchmark", definition: "A standard or point of reference for comparison", hint: "Starts with 'be'", syllables: 2 },
      { word: "scalable", definition: "Able to be changed in size or scale; expandable", hint: "Starts with 'sc'", syllables: 3 },
      { word: "synergy", definition: "Combined effort being greater than individual parts", hint: "Starts with 'sy'", syllables: 3 },
      { word: "acquisition", definition: "The purchase of one company by another", hint: "Starts with 'ac'", syllables: 4 },
      { word: "liability", definition: "A financial obligation or debt", hint: "Starts with 'li'", syllables: 5 },
      { word: "dividend", definition: "A payment made to shareholders from profits", hint: "Starts with 'di'", syllables: 3 },
      { word: "equity", definition: "The value of shares issued by a company", hint: "Starts with 'eq'", syllables: 3 },
      { word: "portfolio", definition: "A range of investments held by a person or organization", hint: "Starts with 'po'", syllables: 4 },
      { word: "negotiate", definition: "To discuss terms to reach an agreement", hint: "Starts with 'ne'", syllables: 4 },
      { word: "outsource", definition: "To obtain goods or services from an external supplier", hint: "Starts with 'ou'", syllables: 2 },
      { word: "feasible", definition: "Possible and practical to achieve", hint: "Starts with 'fe'", syllables: 3 },
      { word: "compliance", definition: "The act of conforming to rules or standards", hint: "Starts with 'co'", syllables: 3 },
      { word: "innovation", definition: "The introduction of something new; a new method or idea", hint: "Starts with 'in'", syllables: 4 },
      { word: "entrepreneur", definition: "A person who starts and runs their own business", hint: "Starts with 'en'", syllables: 4 },
      { word: "commodity", definition: "A raw material or basic good that can be bought and sold", hint: "Starts with 'co'", syllables: 4 },
      { word: "infrastructure", definition: "The basic systems and services that a society needs to function", hint: "Starts with 'in'", syllables: 4 },
      { word: "depreciation", definition: "A reduction in the value of an asset over time", hint: "Starts with 'de'", syllables: 5 },
      { word: "quarterly", definition: "Occurring every three months", hint: "Starts with 'qu'", syllables: 3 },
      { word: "forecast", definition: "A prediction about future trends or events", hint: "Starts with 'fo'", syllables: 2 },
      { word: "margin", definition: "The difference between cost and selling price", hint: "Starts with 'ma'", syllables: 2 },
      { word: "audit", definition: "An official inspection of an organization's accounts", hint: "Starts with 'au'", syllables: 2 },
      { word: "merger", definition: "The combining of two companies into one", hint: "Starts with 'me'", syllables: 2 },
      { word: "capital", definition: "Wealth in the form of money or assets", hint: "Starts with 'ca'", syllables: 3 },
      { word: "incentive", definition: "Something that motivates or encourages action", hint: "Starts with 'in'", syllables: 3 },
      { word: "volatile", definition: "Liable to change rapidly and unpredictably", hint: "Starts with 'vo'", syllables: 3 },
      { word: "fiscal", definition: "Relating to government revenue and finances", hint: "Starts with 'fi'", syllables: 2 },
      { word: "deficit", definition: "The amount by which spending exceeds income", hint: "Starts with 'de'", syllables: 3 }
    ],
    academic: [
      { word: "hypothesis", definition: "A proposed explanation made as a starting point for investigation", hint: "Starts with 'hy'", syllables: 4 },
      { word: "paradigm", definition: "A typical example or pattern; a model or framework", hint: "Starts with 'pa'", syllables: 3 },
      { word: "empirical", definition: "Based on observation or experience rather than theory", hint: "Starts with 'em'", syllables: 4 },
      { word: "synthesis", definition: "The combination of ideas to form a theory or system", hint: "Starts with 'sy'", syllables: 3 },
      { word: "abstract", definition: "Existing in thought or as an idea; a summary of a text", hint: "Starts with 'ab'", syllables: 2 },
      { word: "ambiguous", definition: "Open to more than one interpretation; unclear", hint: "Starts with 'am'", syllables: 4 },
      { word: "comprehensive", definition: "Including all elements or aspects; thorough", hint: "Starts with 'co'", syllables: 4 },
      { word: "dichotomy", definition: "A division into two contrasting groups or categories", hint: "Starts with 'di'", syllables: 4 },
      { word: "extrapolate", definition: "To extend known data to predict unknown values", hint: "Starts with 'ex'", syllables: 4 },
      { word: "fallacy", definition: "A mistaken belief based on unsound argument", hint: "Starts with 'fa'", syllables: 3 },
      { word: "gregarious", definition: "Fond of company; sociable", hint: "Starts with 'gr'", syllables: 4 },
      { word: "heterogeneous", definition: "Diverse in character or content; varied", hint: "Starts with 'he'", syllables: 6 },
      { word: "implicit", definition: "Implied though not plainly expressed", hint: "Starts with 'im'", syllables: 3 },
      { word: "juxtapose", definition: "To place close together for contrasting effect", hint: "Starts with 'ju'", syllables: 3 },
      { word: "kinetic", definition: "Relating to or resulting from motion", hint: "Starts with 'ki'", syllables: 3 },
      { word: "lucid", definition: "Expressed clearly; easy to understand", hint: "Starts with 'lu'", syllables: 2 },
      { word: "methodology", definition: "A system of methods used in a particular area", hint: "Starts with 'me'", syllables: 5 },
      { word: "nuance", definition: "A subtle difference in meaning or expression", hint: "Starts with 'nu'", syllables: 2 },
      { word: "objective", definition: "Not influenced by personal feelings; impartial", hint: "Starts with 'ob'", syllables: 3 },
      { word: "pragmatic", definition: "Dealing with things in a practical rather than idealistic way", hint: "Starts with 'pr'", syllables: 3 },
      { word: "qualitative", definition: "Relating to quality or character rather than quantity", hint: "Starts with 'qu'", syllables: 4 },
      { word: "rhetoric", definition: "The art of effective or persuasive speaking or writing", hint: "Starts with 'rh'", syllables: 3 },
      { word: "subjective", definition: "Based on personal feelings, tastes, or opinions", hint: "Starts with 'su'", syllables: 3 },
      { word: "thesis", definition: "A statement or theory put forward to be proved", hint: "Starts with 'th'", syllables: 2 },
      { word: "ubiquitous", definition: "Present, appearing, or found everywhere", hint: "Starts with 'ub'", syllables: 4 },
      { word: "verbose", definition: "Using more words than needed; wordy", hint: "Starts with 've'", syllables: 2 },
      { word: "watershed", definition: "An event marking a turning point; a critical dividing line", hint: "Starts with 'wa'", syllables: 3 },
      { word: "xenophobia", definition: "Dislike of or prejudice against people from other countries", hint: "Starts with 'xe'", syllables: 5 },
      { word: "yield", definition: "To produce or provide; to give way", hint: "Starts with 'yi'", syllables: 1 },
      { word: "anomaly", definition: "Something that deviates from what is standard or expected", hint: "Starts with 'an'", syllables: 4 }
    ],
    idioms: [
      { word: "break the ice", definition: "To initiate conversation in a social setting; to relieve tension", hint: "Three words, starts with 'break'", syllables: 3 },
      { word: "bite the bullet", definition: "To endure a painful situation with courage", hint: "Three words, starts with 'bite'", syllables: 4 },
      { word: "cost an arm and a leg", definition: "To be very expensive", hint: "Six words, starts with 'cost'", syllables: 6 },
      { word: "hit the nail on the head", definition: "To describe exactly what is causing a situation", hint: "Seven words, starts with 'hit'", syllables: 7 },
      { word: "kill two birds with one stone", definition: "To achieve two things with a single action", hint: "Seven words, starts with 'kill'", syllables: 7 },
      { word: "let the cat out of the bag", definition: "To reveal a secret accidentally", hint: "Eight words, starts with 'let'", syllables: 8 },
      { word: "piece of cake", definition: "Something very easy to do", hint: "Three words, starts with 'piece'", syllables: 3 },
      { word: "speak of the devil", definition: "Said when someone appears just after being mentioned", hint: "Four words, starts with 'speak'", syllables: 5 },
      { word: "under the weather", definition: "Feeling ill or sick", hint: "Three words, starts with 'under'", syllables: 5 },
      { word: "burning the midnight oil", definition: "Working late into the night", hint: "Four words, starts with 'burning'", syllables: 7 },
      { word: "once in a blue moon", definition: "Very rarely; almost never", hint: "Five words, starts with 'once'", syllables: 5 },
      { word: "the ball is in your court", definition: "It is your turn to take action or make a decision", hint: "Seven words, starts with 'the'", syllables: 7 },
      { word: "barking up the wrong tree", definition: "To pursue a mistaken or misguided course of action", hint: "Six words, starts with 'barking'", syllables: 6 },
      { word: "the best of both worlds", definition: "A situation where you enjoy two different advantages", hint: "Five words, starts with 'the'", syllables: 5 },
      { word: "spill the beans", definition: "To reveal secret information", hint: "Three words, starts with 'spill'", syllables: 3 },
      { word: "a blessing in disguise", definition: "Something that seems bad but turns out to be good", hint: "Four words, starts with 'a'", syllables: 6 },
      { word: "add insult to injury", definition: "To make a bad situation even worse", hint: "Four words, starts with 'add'", syllables: 7 },
      { word: "beat around the bush", definition: "To avoid saying what you mean directly", hint: "Four words, starts with 'beat'", syllables: 5 },
      { word: "get out of hand", definition: "To become uncontrollable or chaotic", hint: "Four words, starts with 'get'", syllables: 4 },
      { word: "hang in there", definition: "To persevere through a difficult situation; don't give up", hint: "Three words, starts with 'hang'", syllables: 3 },
      { word: "hit the sack", definition: "To go to bed; to go to sleep", hint: "Three words, starts with 'hit'", syllables: 3 },
      { word: "miss the boat", definition: "To miss an opportunity; to be too late", hint: "Three words, starts with 'miss'", syllables: 3 },
      { word: "sit on the fence", definition: "To remain neutral; to not take sides", hint: "Four words, starts with 'sit'", syllables: 4 },
      { word: "wrap your head around", definition: "To understand something complicated", hint: "Four words, starts with 'wrap'", syllables: 5 },
      { word: "back to square one", definition: "To start over again from the beginning", hint: "Four words, starts with 'back'", syllables: 4 }
    ]
  },

  // ── SPELL TOWER: Sentence Building ───────────────────────
  sentences: {
    scrambled: [
      { words: ["the", "cat", "sat", "on", "the", "mat"], answer: "the cat sat on the mat", grammar: "simple present" },
      { words: ["she", "is", "reading", "a", "book"], answer: "she is reading a book", grammar: "present continuous" },
      { words: ["they", "went", "to", "the", "store", "yesterday"], answer: "they went to the store yesterday", grammar: "simple past" },
      { words: ["I", "have", "been", "waiting", "for", "you"], answer: "I have been waiting for you", grammar: "present perfect continuous" },
      { words: ["the", "dog", "was", "chasing", "its", "tail"], answer: "the dog was chasing its tail", grammar: "past continuous" },
      { words: ["we", "will", "travel", "to", "Paris", "next", "summer"], answer: "we will travel to Paris next summer", grammar: "simple future" },
      { words: ["he", "has", "finished", "his", "homework"], answer: "he has finished his homework", grammar: "present perfect" },
      { words: ["the", "children", "were", "playing", "in", "the", "park"], answer: "the children were playing in the park", grammar: "past continuous" },
      { words: ["she", "would", "like", "a", "cup", "of", "tea"], answer: "she would like a cup of tea", grammar: "conditional" },
      { words: ["the", "letter", "was", "written", "by", "the", "queen"], answer: "the letter was written by the queen", grammar: "passive voice" },
      { words: ["if", "it", "rains", "we", "will", "stay", "home"], answer: "if it rains we will stay home", grammar: "first conditional" },
      { words: ["the", "hero", "bravely", "fought", "the", "dragon"], answer: "the hero bravely fought the dragon", grammar: "simple past" },
      { words: ["the", "wizard", "carefully", "prepared", "the", "potion"], answer: "the wizard carefully prepared the potion", grammar: "simple past" },
      { words: ["the", "treasure", "was", "hidden", "beneath", "the", "castle"], answer: "the treasure was hidden beneath the castle", grammar: "passive voice" },
      { words: ["a", "mysterious", "light", "appeared", "in", "the", "forest"], answer: "a mysterious light appeared in the forest", grammar: "simple past" },
      { words: ["the", "knight", "must", "complete", "three", "trials"], answer: "the knight must complete three trials", grammar: "modal verb" },
      { words: ["you", "should", "always", "tell", "the", "truth"], answer: "you should always tell the truth", grammar: "modal verb" },
      { words: ["she", "can", "speak", "four", "different", "languages"], answer: "she can speak four different languages", grammar: "modal verb" },
      { words: ["the", "movie", "was", "better", "than", "the", "book"], answer: "the movie was better than the book", grammar: "comparative" },
      { words: ["this", "is", "the", "most", "beautiful", "sunset", "I", "have", "ever", "seen"], answer: "this is the most beautiful sunset I have ever seen", grammar: "superlative" },
      { words: ["neither", "the", "king", "nor", "the", "queen", "attended", "the", "feast"], answer: "neither the king nor the queen attended the feast", grammar: "correlative conjunction" },
      { words: ["not", "only", "did", "he", "win", "but", "he", "also", "set", "a", "record"], answer: "not only did he win but he also set a record", grammar: "correlative conjunction" },
      { words: ["by", "the", "time", "we", "arrived", "the", "show", "had", "already", "started"], answer: "by the time we arrived the show had already started", grammar: "past perfect" },
      { words: ["if", "I", "had", "known", "I", "would", "have", "come", "earlier"], answer: "if I had known I would have come earlier", grammar: "third conditional" },
      { words: ["the", "book", "which", "I", "borrowed", "was", "fascinating"], answer: "the book which I borrowed was fascinating", grammar: "relative clause" },
      { words: ["she", "asked", "me", "where", "I", "had", "been"], answer: "she asked me where I had been", grammar: "reported speech" },
      { words: ["the", "more", "you", "practice", "the", "better", "you", "become"], answer: "the more you practice the better you become", grammar: "comparative correlative" },
      { words: ["despite", "the", "rain", "we", "enjoyed", "the", "festival"], answer: "despite the rain we enjoyed the festival", grammar: "concession" },
      { words: ["having", "completed", "the", "quest", "the", "hero", "returned", "home"], answer: "having completed the quest the hero returned home", grammar: "participle clause" },
      { words: ["it", "is", "essential", "that", "everyone", "participate"], answer: "it is essential that everyone participate", grammar: "subjunctive" }
    ],
    fillInBlank: [
      { sentence: "The early bird ___ the worm.", answer: "catches", hint: "present tense of 'catch'" },
      { sentence: "She ___ to the gym every morning.", answer: "goes", hint: "present tense of 'go'" },
      { sentence: "They ___ finished eating when we arrived.", answer: "had", hint: "past perfect auxiliary" },
      { sentence: "I wish I ___ fly like a bird.", answer: "could", hint: "modal verb expressing ability" },
      { sentence: "The cake ___ baked by my grandmother.", answer: "was", hint: "passive voice auxiliary" },
      { sentence: "If I ___ rich, I would travel the world.", answer: "were", hint: "subjunctive form of 'be'" },
      { sentence: "She ___ studying English for five years.", answer: "has been", hint: "present perfect continuous" },
      { sentence: "The warrior ___ his sword and charged into battle.", answer: "drew", hint: "past tense of 'draw'" },
      { sentence: "The spell ___ cast before the enemy could react.", answer: "was", hint: "passive voice past" },
      { sentence: "The adventurers ___ traveled for many days.", answer: "had", hint: "past perfect auxiliary" },
      { sentence: "By tomorrow, she ___ completed the project.", answer: "will have", hint: "future perfect" },
      { sentence: "He ___ rather stay home than go out.", answer: "would", hint: "preference modal" },
      { sentence: "We ___ to leave before it gets dark.", answer: "need", hint: "expressing necessity" },
      { sentence: "The teacher asked if we ___ understood the lesson.", answer: "had", hint: "past perfect in reported speech" },
      { sentence: "Neither the students ___ the teacher knew the answer.", answer: "nor", hint: "correlative conjunction" },
      { sentence: "The food smells ___.", answer: "delicious", hint: "adjective after linking verb" },
      { sentence: "She runs ___ than her brother.", answer: "faster", hint: "comparative adverb" },
      { sentence: "This is the ___ interesting book I have ever read.", answer: "most", hint: "superlative marker" },
      { sentence: "He has been working here ___ 2015.", answer: "since", hint: "preposition for point in time" },
      { sentence: "I have been waiting ___ two hours.", answer: "for", hint: "preposition for duration" },
      { sentence: "The castle ___ on a hill overlooking the valley.", answer: "stands", hint: "present tense of 'stand'" },
      { sentence: "She ___ never seen such a magnificent dragon.", answer: "had", hint: "past perfect auxiliary" },
      { sentence: "The potion ___ be ready by midnight.", answer: "will", hint: "future tense auxiliary" },
      { sentence: "He ___ practicing his spells when the storm began.", answer: "was", hint: "past continuous auxiliary" },
      { sentence: "The ancient scroll ___ been lost for centuries.", answer: "had", hint: "past perfect auxiliary" }
    ]
  },

  // ── THE ARENA: Speed Challenge Mix ───────────────────────
  arena: {
    challenges: [
      { type: "vocab", question: "Say the word that means: 'Very happy'", answer: "jubilant", accept: ["jubilant", "ecstatic", "elated", "overjoyed"] },
      { type: "vocab", question: "Say the word that means: 'Happening every year'", answer: "annual", accept: ["annual", "yearly"] },
      { type: "vocab", question: "Say the opposite of 'ancient'", answer: "modern", accept: ["modern", "new", "contemporary", "recent"] },
      { type: "vocab", question: "Say the opposite of 'generous'", answer: "stingy", accept: ["stingy", "greedy", "selfish", "miserly"] },
      { type: "vocab", question: "Say a synonym for 'brave'", answer: "courageous", accept: ["courageous", "brave", "valiant", "fearless", "bold", "heroic"] },
      { type: "vocab", question: "Say a synonym for 'smart'", answer: "intelligent", accept: ["intelligent", "clever", "brilliant", "wise", "smart"] },
      { type: "vocab", question: "Say the word that means: 'To make smaller'", answer: "reduce", accept: ["reduce", "shrink", "diminish", "decrease", "minimize"] },
      { type: "vocab", question: "Say the word that means: 'A group of stars'", answer: "constellation", accept: ["constellation"] },
      { type: "vocab", question: "Say the word that means: 'Easily broken'", answer: "fragile", accept: ["fragile", "brittle", "delicate"] },
      { type: "vocab", question: "Say the word that means: 'To go up'", answer: "ascend", accept: ["ascend", "climb", "rise"] },
      { type: "pronunciation", question: "Say this word: 'entrepreneurship'", answer: "entrepreneurship", accept: ["entrepreneurship"] },
      { type: "pronunciation", question: "Say this word: 'phenomenon'", answer: "phenomenon", accept: ["phenomenon"] },
      { type: "pronunciation", question: "Say this word: 'sophisticated'", answer: "sophisticated", accept: ["sophisticated"] },
      { type: "pronunciation", question: "Say this word: 'Mediterranean'", answer: "mediterranean", accept: ["mediterranean"] },
      { type: "pronunciation", question: "Say this word: 'unbelievable'", answer: "unbelievable", accept: ["unbelievable"] },
      { type: "pronunciation", question: "Say this phrase: 'through and through'", answer: "through and through", accept: ["through and through"] },
      { type: "pronunciation", question: "Say this word: 'conscience'", answer: "conscience", accept: ["conscience"] },
      { type: "pronunciation", question: "Say this word: 'necessary'", answer: "necessary", accept: ["necessary"] },
      { type: "pronunciation", question: "Say this word: 'specifically'", answer: "specifically", accept: ["specifically"] },
      { type: "pronunciation", question: "Say this word: 'comfortable'", answer: "comfortable", accept: ["comfortable"] },
      { type: "sentence", question: "Complete: 'Actions speak louder than ___'", answer: "words", accept: ["words"] },
      { type: "sentence", question: "Complete: 'Better late than ___'", answer: "never", accept: ["never"] },
      { type: "sentence", question: "Complete: 'Practice makes ___'", answer: "perfect", accept: ["perfect"] },
      { type: "sentence", question: "Complete: 'Every cloud has a silver ___'", answer: "lining", accept: ["lining"] },
      { type: "sentence", question: "Complete: 'Don't judge a book by its ___'", answer: "cover", accept: ["cover"] },
      { type: "sentence", question: "Complete: 'The pen is mightier than the ___'", answer: "sword", accept: ["sword"] },
      { type: "sentence", question: "Complete: 'When in Rome, do as the Romans ___'", answer: "do", accept: ["do"] },
      { type: "sentence", question: "Complete: 'A journey of a thousand miles begins with a single ___'", answer: "step", accept: ["step"] },
      { type: "sentence", question: "Complete: 'Knowledge is ___'", answer: "power", accept: ["power"] },
      { type: "sentence", question: "Complete: 'Time flies when you're having ___'", answer: "fun", accept: ["fun"] },
      { type: "vocab", question: "Say the word that means: 'A long journey'", answer: "voyage", accept: ["voyage", "odyssey", "journey", "expedition", "trek"] },
      { type: "vocab", question: "Say the word that means: 'Fear of heights'", answer: "acrophobia", accept: ["acrophobia", "vertigo"] },
      { type: "vocab", question: "Say the past tense of 'begin'", answer: "began", accept: ["began"] },
      { type: "vocab", question: "Say the past tense of 'swim'", answer: "swam", accept: ["swam"] },
      { type: "vocab", question: "Say the past tense of 'write'", answer: "wrote", accept: ["wrote"] },
      { type: "pronunciation", question: "Say: 'She sells sea shells by the seashore'", answer: "she sells sea shells by the seashore", accept: ["she sells sea shells by the seashore", "she sells seashells by the seashore"] },
      { type: "pronunciation", question: "Say: 'How much wood would a woodchuck chuck'", answer: "how much wood would a woodchuck chuck", accept: ["how much wood would a woodchuck chuck"] },
      { type: "pronunciation", question: "Say: 'Unique New York'", answer: "unique new york", accept: ["unique new york"] },
      { type: "vocab", question: "What do you call a baby dog?", answer: "puppy", accept: ["puppy", "pup"] },
      { type: "vocab", question: "What do you call a baby cat?", answer: "kitten", accept: ["kitten", "kitty"] }
    ]
  },

  // ── DRAGON'S LAIR: Boss Battles ──────────────────────────
  bosses: [
    {
      id: "grammar_goblin",
      name: "Grammar Goblin",
      title: "Corruptor of Sentences",
      hp: 100,
      image: "goblin",
      color: "#4a7c3f",
      intro: "Heheheh! Your grammar is pathetic, hero! Let's see if you can fix my twisted sentences!",
      victory: "No! My beautiful broken grammar... You've defeated me, word-wielder!",
      defeat: "Hahahaha! Your grammar is as broken as my victims' sentences!",
      attacks: [
        "The Goblin hurls a SYNTAX BOMB at you!",
        "The Goblin casts COMMA SPLICE!",
        "The Goblin summons a DANGLING MODIFIER!"
      ],
      challenges: [
        { type: "fix_grammar", question: "Fix this: 'Him and me went to the store'", answer: "he and I went to the store", accept: ["he and i went to the store"] },
        { type: "fix_grammar", question: "Fix this: 'Their going to the park'", answer: "they're going to the park", accept: ["they're going to the park", "they are going to the park"] },
        { type: "fix_grammar", question: "Fix this: 'The dog chased it's tail'", answer: "the dog chased its tail", accept: ["the dog chased its tail"] },
        { type: "fix_grammar", question: "Fix this: 'She don't know the answer'", answer: "she doesn't know the answer", accept: ["she doesn't know the answer", "she does not know the answer"] },
        { type: "fix_grammar", question: "Fix this: 'Me and her is best friends'", answer: "she and I are best friends", accept: ["she and i are best friends", "her and i are best friends", "she and i are best friends"] },
        { type: "fix_grammar", question: "Fix this: 'I seen that movie already'", answer: "I have seen that movie already", accept: ["i have seen that movie already", "i've seen that movie already", "i saw that movie already"] },
        { type: "fix_grammar", question: "Fix this: 'The team have won the game'", answer: "the team has won the game", accept: ["the team has won the game"] },
        { type: "fix_grammar", question: "Fix this: 'Between you and I'", answer: "between you and me", accept: ["between you and me"] },
        { type: "fix_grammar", question: "Fix this: 'Could of been better'", answer: "could have been better", accept: ["could have been better", "could've been better"] },
        { type: "fix_grammar", question: "Fix this: 'Your the best player'", answer: "you're the best player", accept: ["you're the best player", "you are the best player"] }
      ],
      rewards: { xp: 500, gold: 100, title: "Grammar Guardian" }
    },
    {
      id: "vocab_vampire",
      name: "Vocab Vampire",
      title: "Devourer of Definitions",
      hp: 150,
      image: "vampire",
      color: "#8b0000",
      intro: "I feast upon forgotten words! Can you name what I describe, or will your vocabulary run dry?",
      victory: "Impossible! Your vocabulary... it burns like sunlight! I am vanquished!",
      defeat: "Your vocabulary is anemic, just like my dinner! Mwahahaha!",
      attacks: [
        "The Vampire drains your WORD POWER!",
        "The Vampire casts DEFINITION DARKNESS!",
        "The Vampire summons a SYNONYM SWARM!"
      ],
      challenges: [
        { type: "vocab", question: "I mean 'to move in a twisting or spiraling pattern'. What word am I?", answer: "spiral", accept: ["spiral", "swirl", "twist", "coil"] },
        { type: "vocab", question: "I mean 'shining brightly and steadily'. What word am I?", answer: "radiant", accept: ["radiant", "luminous", "brilliant", "glowing"] },
        { type: "vocab", question: "I mean 'a person who wanders from place to place'. What word am I?", answer: "nomad", accept: ["nomad", "wanderer", "vagabond", "drifter"] },
        { type: "vocab", question: "I mean 'extremely hungry'. What word am I?", answer: "famished", accept: ["famished", "starving", "ravenous"] },
        { type: "vocab", question: "I mean 'to disappear gradually'. What word am I?", answer: "vanish", accept: ["vanish", "fade", "dissolve", "dissipate", "evaporate"] },
        { type: "vocab", question: "I mean 'a clever plan or scheme'. What word am I?", answer: "strategy", accept: ["strategy", "scheme", "tactic", "ploy", "plan", "stratagem"] },
        { type: "vocab", question: "I mean 'to look at something with wonder'. What word am I?", answer: "gaze", accept: ["gaze", "stare", "marvel", "admire", "behold"] },
        { type: "vocab", question: "I mean 'occurring once a year'. What word am I?", answer: "annual", accept: ["annual", "yearly"] },
        { type: "vocab", question: "I mean 'an unpleasant loud noise'. What word am I?", answer: "racket", accept: ["racket", "clamor", "din", "commotion", "noise"] },
        { type: "vocab", question: "I mean 'to make something impure or unclean'. What word am I?", answer: "contaminate", accept: ["contaminate", "pollute", "taint", "corrupt"] }
      ],
      rewards: { xp: 750, gold: 150, title: "Vocabulary Virtuoso" }
    },
    {
      id: "accent_dragon",
      name: "Accent Dragon",
      title: "Lord of Mispronunciation",
      hp: 200,
      image: "dragon",
      color: "#ff6600",
      intro: "ROOOAR! I am the Accent Dragon! Every word you butcher makes me STRONGER! Speak perfectly or BURN!",
      victory: "Your pronunciation... it's... PERFECT! The flames of confusion cannot touch you! I yield!",
      defeat: "BAHAHAHA! Your tongue stumbles like a newborn foal! My flames grow STRONGER!",
      attacks: [
        "The Dragon breathes MISPRONUNCIATION FIRE!",
        "The Dragon unleashes a PHONETIC FIRESTORM!",
        "The Dragon roars with ACCENTUAL FURY!"
      ],
      challenges: [
        { type: "pronunciation", question: "Say perfectly: 'particularly'", answer: "particularly", accept: ["particularly"] },
        { type: "pronunciation", question: "Say perfectly: 'archaeological'", answer: "archaeological", accept: ["archaeological"] },
        { type: "pronunciation", question: "Say perfectly: 'onomatopoeia'", answer: "onomatopoeia", accept: ["onomatopoeia"] },
        { type: "pronunciation", question: "Say perfectly: 'conscientious'", answer: "conscientious", accept: ["conscientious"] },
        { type: "pronunciation", question: "Say perfectly: 'uncharacteristically'", answer: "uncharacteristically", accept: ["uncharacteristically"] },
        { type: "pronunciation", question: "Say perfectly: 'hippopotamus'", answer: "hippopotamus", accept: ["hippopotamus"] },
        { type: "pronunciation", question: "Say perfectly: 'refrigerator'", answer: "refrigerator", accept: ["refrigerator"] },
        { type: "pronunciation", question: "Say perfectly: 'enthusiastically'", answer: "enthusiastically", accept: ["enthusiastically"] },
        { type: "pronunciation", question: "Say perfectly: 'superintendent'", answer: "superintendent", accept: ["superintendent"] },
        { type: "pronunciation", question: "Say perfectly: 'electromagnetic'", answer: "electromagnetic", accept: ["electromagnetic"] }
      ],
      rewards: { xp: 1000, gold: 200, title: "Dragon Slayer" }
    },
    {
      id: "idiom_specter",
      name: "Idiom Specter",
      title: "Phantom of Figurative Speech",
      hp: 175,
      image: "ghost",
      color: "#7b68ee",
      intro: "Woooooo... I speak only in riddles and figures! Can you decipher my haunted expressions?",
      victory: "You... you understand every expression! My riddles hold no power over you! I fade away...",
      defeat: "You're lost in a sea of confusion! My idioms will haunt you FOREVER!",
      attacks: [
        "The Specter casts MIXED METAPHOR!",
        "The Specter hurls a CONFUSING CLICHE!",
        "The Specter summons FIGURATIVE FOG!"
      ],
      challenges: [
        { type: "idiom", question: "What does it mean to 'let sleeping dogs lie'?", answer: "leave things as they are", accept: ["leave things as they are", "don't disturb things", "avoid interfering", "let it be", "leave it alone", "don't bring it up"] },
        { type: "idiom", question: "Complete: 'Curiosity killed the ___'", answer: "cat", accept: ["cat"] },
        { type: "idiom", question: "What does 'raining cats and dogs' mean?", answer: "raining heavily", accept: ["raining heavily", "raining very hard", "heavy rain", "pouring", "raining a lot"] },
        { type: "idiom", question: "Complete: 'A penny for your ___'", answer: "thoughts", accept: ["thoughts"] },
        { type: "idiom", question: "What does 'break a leg' mean?", answer: "good luck", accept: ["good luck", "wishing luck", "wish someone luck"] },
        { type: "idiom", question: "Complete: 'The apple doesn't fall far from the ___'", answer: "tree", accept: ["tree"] },
        { type: "idiom", question: "What does it mean to 'burn bridges'?", answer: "destroy relationships", accept: ["destroy relationships", "ruin relationships", "end relationships", "cut ties", "make enemies"] },
        { type: "idiom", question: "Complete: 'When pigs ___'", answer: "fly", accept: ["fly"] },
        { type: "idiom", question: "What does 'a piece of cake' mean?", answer: "very easy", accept: ["very easy", "easy", "simple", "not difficult"] },
        { type: "idiom", question: "Complete: 'Don't put all your eggs in one ___'", answer: "basket", accept: ["basket"] }
      ],
      rewards: { xp: 800, gold: 175, title: "Idiom Master" }
    },
    {
      id: "tense_titan",
      name: "Tense Titan",
      title: "Warden of Time",
      hp: 250,
      image: "titan",
      color: "#4169e1",
      intro: "I AM THE TENSE TITAN! Past, present, future - all tenses bow to me! Can you master the flow of time itself?",
      victory: "You have mastered every tense! Past, present, and future bend to YOUR will now! I am... tense no more.",
      defeat: "HA! You can't even tell past from present! Time itself rejects you!",
      attacks: [
        "The Titan warps TEMPORAL GRAMMAR!",
        "The Titan casts TENSE CONFUSION!",
        "The Titan unleashes a CHRONOLOGICAL CATASTROPHE!"
      ],
      challenges: [
        { type: "tense", question: "Change to past tense: 'I am going to the store'", answer: "I went to the store", accept: ["i went to the store", "i was going to the store"] },
        { type: "tense", question: "Change to future tense: 'She writes a letter'", answer: "she will write a letter", accept: ["she will write a letter", "she is going to write a letter"] },
        { type: "tense", question: "Change to present perfect: 'They ate dinner'", answer: "they have eaten dinner", accept: ["they have eaten dinner", "they've eaten dinner"] },
        { type: "tense", question: "Change to past perfect: 'I finish my work'", answer: "I had finished my work", accept: ["i had finished my work"] },
        { type: "tense", question: "Change to present continuous: 'He reads a book'", answer: "he is reading a book", accept: ["he is reading a book", "he's reading a book"] },
        { type: "tense", question: "Change to passive voice: 'The cat chased the mouse'", answer: "the mouse was chased by the cat", accept: ["the mouse was chased by the cat"] },
        { type: "tense", question: "Change to future perfect: 'I complete the mission'", answer: "I will have completed the mission", accept: ["i will have completed the mission"] },
        { type: "tense", question: "Change to past continuous: 'We play football'", answer: "we were playing football", accept: ["we were playing football"] },
        { type: "tense", question: "Change to present tense: 'She was singing a song'", answer: "she sings a song", accept: ["she sings a song", "she is singing a song"] },
        { type: "tense", question: "Change to conditional: 'I go to the party'", answer: "I would go to the party", accept: ["i would go to the party"] }
      ],
      rewards: { xp: 1200, gold: 250, title: "Time Lord of Tenses" }
    }
  ],

  // ── THE TAVERN: Conversation Scenarios ───────────────────
  tavern: {
    scenarios: [
      {
        id: "innkeeper",
        name: "Innkeeper Bertha",
        description: "Order food and drink at the tavern",
        dialogue: [
          { npc: "Welcome to The Golden Tongue Tavern, traveler! What can I get for you?", expectedTopics: ["food", "drink", "menu", "eat", "hungry", "ale", "beer", "water", "meal", "order"] },
          { npc: "Excellent choice! That'll be 5 gold coins. Where are you headed on your journey?", expectedTopics: ["quest", "adventure", "travel", "journey", "going", "heading", "destination", "mission", "explore", "town", "city", "village"] },
          { npc: "Sounds dangerous! A brave soul like you should be well-rested. Need a room for the night?", expectedTopics: ["yes", "no", "room", "stay", "night", "sleep", "rest", "bed", "tired", "maybe"] },
          { npc: "Safe travels, hero! May the words of power guide your path!", expectedTopics: ["thank", "goodbye", "bye", "farewell", "thanks", "see you", "later", "cheers"] }
        ]
      },
      {
        id: "merchant",
        name: "Merchant Aldric",
        description: "Haggle with the traveling merchant",
        dialogue: [
          { npc: "Psst! Hey you! I've got rare magical items for sale. Interested?", expectedTopics: ["yes", "what", "show", "items", "interested", "sure", "tell me", "sell", "buy", "look"] },
          { npc: "I have enchanted scrolls, potions of wisdom, and a legendary grammar amulet. What catches your eye?", expectedTopics: ["scroll", "potion", "amulet", "how much", "price", "cost", "all", "one", "grammar", "wisdom"] },
          { npc: "Ah, you have a keen eye! That one costs 50 gold. But for a fellow adventurer, I could do 40. Deal?", expectedTopics: ["deal", "yes", "expensive", "no", "cheaper", "too much", "lower", "accept", "agree", "okay"] },
          { npc: "Pleasure doing business! Come back anytime you need supplies for your quest!", expectedTopics: ["thank", "goodbye", "bye", "farewell", "thanks", "will do", "okay", "sure"] }
        ]
      },
      {
        id: "bard",
        name: "Bard Melodia",
        description: "Learn a song from the traveling bard",
        dialogue: [
          { npc: "Hello there! I'm Melodia, the wandering bard. Would you like to hear a tale or learn a song?", expectedTopics: ["tale", "story", "song", "yes", "sing", "learn", "hear", "tell", "play", "music"] },
          { npc: "This song is about the hero who defeated the Accent Dragon. Can you repeat after me? 'The hero spoke with perfect voice'", expectedTopics: ["the hero spoke with perfect voice", "hero", "voice", "repeat", "spoke"] },
          { npc: "Beautiful! Now the next line: 'And every word was their own choice'", expectedTopics: ["and every word was their own choice", "word", "choice", "every"] },
          { npc: "Magnificent! You have the voice of a true bard! Perhaps we'll sing together again someday.", expectedTopics: ["thank", "goodbye", "again", "fun", "thanks", "great", "wonderful", "amazing", "yes"] }
        ]
      },
      {
        id: "quest_giver",
        name: "Elder Sage Theron",
        description: "Receive wisdom from the village elder",
        dialogue: [
          { npc: "Ah, young hero. I sense great potential in you. Tell me, why do you seek to master the English tongue?", expectedTopics: ["learn", "improve", "speak", "better", "practice", "study", "communicate", "understand", "travel", "work", "school", "fun"] },
          { npc: "A noble pursuit! The power of language can open doors that no key can. What is the hardest part for you?", expectedTopics: ["pronunciation", "grammar", "vocabulary", "speaking", "listening", "reading", "writing", "words", "sentences", "confidence", "nervous"] },
          { npc: "I understand. Remember: every master was once a beginner. What motivates you to keep going?", expectedTopics: ["friends", "family", "career", "travel", "love", "passion", "dream", "goal", "future", "want", "need", "must"] },
          { npc: "Your determination inspires me. Go forth, hero! The realms await your voice!", expectedTopics: ["thank", "goodbye", "bye", "farewell", "thanks", "ready", "will", "go", "yes"] }
        ]
      }
    ]
  },

  // ── SHOP ITEMS ───────────────────────────────────────────
  shop: {
    items: [
      { id: "hint_scroll", name: "Hint Scroll", description: "Reveals an extra hint during challenges", price: 30, icon: "scroll", type: "consumable", effect: "hint" },
      { id: "shield_potion", name: "Shield Potion", description: "Prevents 1 heart loss on wrong answer", price: 50, icon: "shield", type: "consumable", effect: "shield" },
      { id: "xp_potion", name: "XP Elixir", description: "Doubles XP earned for 5 challenges", price: 75, icon: "potion", type: "consumable", effect: "double_xp", duration: 5 },
      { id: "gold_amulet", name: "Gold Amulet", description: "Earn 50% more gold for 10 challenges", price: 100, icon: "amulet", type: "consumable", effect: "gold_boost", duration: 10 },
      { id: "time_crystal", name: "Time Crystal", description: "Adds 15 extra seconds in The Arena", price: 60, icon: "crystal", type: "consumable", effect: "extra_time" },
      { id: "phoenix_feather", name: "Phoenix Feather", description: "Revive with full hearts if defeated in boss battle", price: 150, icon: "feather", type: "consumable", effect: "revive" },
      { id: "bard_hat", name: "Bard's Hat", description: "A fancy hat for your character", price: 200, icon: "hat", type: "cosmetic", slot: "head" },
      { id: "wizard_robe", name: "Wizard's Robe", description: "An enchanted robe that shimmers with power", price: 250, icon: "robe", type: "cosmetic", slot: "body" },
      { id: "knight_armor", name: "Knight's Plate", description: "Gleaming armor fit for a champion", price: 300, icon: "armor", type: "cosmetic", slot: "body" },
      { id: "golden_crown", name: "Golden Crown", description: "A crown befitting a master of English", price: 500, icon: "crown", type: "cosmetic", slot: "head" },
      { id: "dragon_cloak", name: "Dragon Cloak", description: "A cloak made from dragon scales", price: 750, icon: "cloak", type: "cosmetic", slot: "body" },
      { id: "ancient_tome", name: "Ancient Tome", description: "Unlocks bonus lore entries", price: 400, icon: "book", type: "permanent", effect: "lore" }
    ]
  },

  // ── ACHIEVEMENTS ─────────────────────────────────────────
  achievements: [
    { id: "first_word", name: "First Word", description: "Complete your first challenge", icon: "star", xpReward: 50 },
    { id: "echo_novice", name: "Echo Novice", description: "Complete 10 Echo Valley challenges", icon: "megaphone", xpReward: 100 },
    { id: "echo_master", name: "Echo Master", description: "Complete 50 Echo Valley challenges", icon: "megaphone", xpReward: 500 },
    { id: "wordsmith", name: "Wordsmith", description: "Learn 25 vocabulary words", icon: "book", xpReward: 150 },
    { id: "lexicon_legend", name: "Lexicon Legend", description: "Learn 100 vocabulary words", icon: "book", xpReward: 750 },
    { id: "spell_weaver", name: "Spell Weaver", description: "Complete 20 Spell Tower challenges", icon: "wand", xpReward: 200 },
    { id: "speed_demon", name: "Speed Demon", description: "Score 500+ points in The Arena", icon: "lightning", xpReward: 300 },
    { id: "arena_champion", name: "Arena Champion", description: "Score 1000+ points in The Arena", icon: "trophy", xpReward: 600 },
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
    { id: "perfect_10", name: "Perfect Ten", description: "Get 10 perfect scores in a row", icon: "star", xpReward: 400 },
    { id: "tavern_regular", name: "Tavern Regular", description: "Complete all tavern conversations", icon: "beer", xpReward: 300 },
    { id: "shopaholic", name: "Shopaholic", description: "Buy 10 items from the shop", icon: "bag", xpReward: 150 },
    { id: "daily_hero", name: "Daily Hero", description: "Complete all 3 daily quests in one day", icon: "sun", xpReward: 200 },
    { id: "three_stars", name: "Triple Threat", description: "Get 3 stars on 25 challenges", icon: "stars", xpReward: 350 },
    { id: "comeback_kid", name: "Comeback Kid", description: "Win a boss battle with only 1 heart remaining", icon: "heart", xpReward: 400 }
  ],

  // ── DAILY QUEST TEMPLATES ────────────────────────────────
  dailyQuests: [
    { id: "dq_echo", type: "echo_valley", description: "Complete {count} pronunciation challenges", countRange: [3, 5], xpReward: 75, goldReward: 25 },
    { id: "dq_vocab", type: "word_forge", description: "Learn {count} new vocabulary words", countRange: [3, 7], xpReward: 75, goldReward: 25 },
    { id: "dq_spell", type: "spell_tower", description: "Build {count} correct sentences", countRange: [2, 5], xpReward: 100, goldReward: 30 },
    { id: "dq_arena", type: "arena", description: "Score {count}+ points in The Arena", countRange: [200, 500], xpReward: 100, goldReward: 35 },
    { id: "dq_boss", type: "boss", description: "Deal {count} damage to any boss", countRange: [30, 60], xpReward: 125, goldReward: 40 },
    { id: "dq_streak", type: "streak", description: "Get a {count}-answer streak in any mode", countRange: [3, 7], xpReward: 80, goldReward: 20 },
    { id: "dq_perfect", type: "perfect", description: "Get {count} perfect (3-star) answers", countRange: [2, 5], xpReward: 100, goldReward: 30 },
    { id: "dq_tavern", type: "tavern", description: "Complete a tavern conversation", countRange: [1, 1], xpReward: 60, goldReward: 20 },
    { id: "dq_any", type: "any", description: "Complete {count} challenges in any realm", countRange: [5, 10], xpReward: 80, goldReward: 25 },
    { id: "dq_time", type: "timed", description: "Spend {count} minutes practicing", countRange: [5, 15], xpReward: 90, goldReward: 30 }
  ],

  // ── LEVEL THRESHOLDS ─────────────────────────────────────
  levelThresholds: (function() {
    const thresholds = [0];
    for (let i = 1; i <= 50; i++) {
      thresholds.push(Math.floor(100 * Math.pow(i, 1.5)));
    }
    return thresholds;
  })(),

  // ── REALM UNLOCK LEVELS ──────────────────────────────────
  realmUnlocks: {
    echo_valley: 1,
    word_forge: 1,
    spell_tower: 5,
    arena: 10,
    dragons_lair: 15,
    tavern: 1
  },

  // ── BOSS UNLOCK LEVELS ───────────────────────────────────
  bossUnlocks: {
    grammar_goblin: 15,
    vocab_vampire: 18,
    accent_dragon: 22,
    idiom_specter: 20,
    tense_titan: 25
  },

  // ── CLASS DEFINITIONS ────────────────────────────────────
  classes: {
    bard: {
      name: "Bard",
      description: "Master of spoken word and song. Bonus XP in Echo Valley.",
      bonus: { realm: "echo_valley", xpMultiplier: 1.25 },
      avatar: "bard",
      color: "#e6a817"
    },
    wizard: {
      name: "Wizard",
      description: "Scholar of language and grammar. Bonus XP in Spell Tower.",
      bonus: { realm: "spell_tower", xpMultiplier: 1.25 },
      avatar: "wizard",
      color: "#6a5acd"
    },
    knight: {
      name: "Knight",
      description: "Brave warrior of vocabulary. Bonus XP in Word Forge.",
      bonus: { realm: "word_forge", xpMultiplier: 1.25 },
      avatar: "knight",
      color: "#c0c0c0"
    }
  },

  // ── EMOJI ICONS ──────────────────────────────────────────
  icons: {
    // Realms
    echo_valley: "\u{1F3D4}\u{FE0F}",
    word_forge: "\u{2694}\u{FE0F}",
    spell_tower: "\u{1F9D9}",
    arena: "\u{1F3DF}\u{FE0F}",
    dragons_lair: "\u{1F409}",
    tavern: "\u{1F37A}",
    // UI
    heart: "\u{2764}\u{FE0F}",
    gold: "\u{1FA99}",
    xp: "\u{2B50}",
    star_full: "\u{2B50}",
    star_empty: "\u{2606}",
    shield: "\u{1F6E1}\u{FE0F}",
    potion: "\u{1F9EA}",
    scroll: "\u{1F4DC}",
    crystal: "\u{1F48E}",
    feather: "\u{1FAB6}",
    crown: "\u{1F451}",
    fire: "\u{1F525}",
    sword: "\u{2694}\u{FE0F}",
    book: "\u{1F4D6}",
    trophy: "\u{1F3C6}",
    lightning: "\u{26A1}",
    skull: "\u{1F480}",
    // Classes
    bard: "\u{1F3B6}",
    wizard: "\u{1F9D9}",
    knight: "\u{1F6E1}\u{FE0F}",
    // Bosses
    goblin: "\u{1F47A}",
    vampire: "\u{1F9DB}",
    dragon: "\u{1F432}",
    ghost: "\u{1F47B}",
    titan: "\u{1F9DE}",
    // Shop
    hat: "\u{1F3A9}",
    robe: "\u{1F9E5}",
    armor: "\u{1F6E1}\u{FE0F}",
    cloak: "\u{1F9E3}",
    amulet: "\u{1F4FF}",
    bag: "\u{1F6CD}\u{FE0F}",
    // Misc
    microphone: "\u{1F3A4}",
    speaker: "\u{1F50A}",
    timer: "\u{23F1}\u{FE0F}",
    check: "\u{2705}",
    cross: "\u{274C}",
    lock: "\u{1F512}",
    unlock: "\u{1F513}",
    map: "\u{1F5FA}\u{FE0F}",
    coins: "\u{1FA99}",
    sun: "\u{2600}\u{FE0F}",
    beer: "\u{1F37A}",
    stars: "\u{1F31F}",
    megaphone: "\u{1F4E3}",
    wand: "\u{1FA84}",
    heart_icon: "\u{2764}\u{FE0F}"
  }
};
