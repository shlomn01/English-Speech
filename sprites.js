// ============================================================
// FREE SPEECH v2 — SVG Character Art & Icons
// All illustrations as JS functions returning SVG strings
// ============================================================

const SPRITES = {

  // ── Hero Portraits ──────────────────────────────────────────
  hero: {
    bard: (size = 200) => `<svg viewBox="0 0 200 240" width="${size}" height="${size * 1.2}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bard-hat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e6a817"/>
          <stop offset="100%" stop-color="#b8860b"/>
        </linearGradient>
        <linearGradient id="bard-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8b4513"/>
          <stop offset="100%" stop-color="#654321"/>
        </linearGradient>
      </defs>
      <!-- Body -->
      <path d="M60 180 Q100 160 140 180 L155 240 H45 Z" fill="url(#bard-shirt)" stroke="#4a3010" stroke-width="2"/>
      <!-- Lute on back -->
      <ellipse cx="155" cy="200" rx="18" ry="25" fill="#c8a04a" stroke="#8b6914" stroke-width="2" transform="rotate(-15 155 200)"/>
      <line x1="155" y1="175" x2="155" y2="225" stroke="#8b6914" stroke-width="2"/>
      <line x1="148" y1="190" x2="162" y2="190" stroke="#654321" stroke-width="1"/>
      <line x1="148" y1="200" x2="162" y2="200" stroke="#654321" stroke-width="1"/>
      <line x1="148" y1="210" x2="162" y2="210" stroke="#654321" stroke-width="1"/>
      <!-- Neck -->
      <rect x="88" y="155" width="24" height="30" rx="5" fill="#f5d0a0"/>
      <!-- Head -->
      <ellipse cx="100" cy="120" rx="42" ry="48" fill="#f5d0a0"/>
      <!-- Eyes -->
      <ellipse cx="84" cy="118" rx="6" ry="7" fill="white"/>
      <circle cx="85" cy="118" r="4" fill="#4a3010"/>
      <circle cx="86" cy="117" r="1.5" fill="white"/>
      <ellipse cx="116" cy="118" rx="6" ry="7" fill="white"/>
      <circle cx="117" cy="118" r="4" fill="#4a3010"/>
      <circle cx="118" cy="117" r="1.5" fill="white"/>
      <!-- Eyebrows -->
      <path d="M74 108 Q84 103 94 108" fill="none" stroke="#4a3010" stroke-width="2"/>
      <path d="M106 108 Q116 103 126 108" fill="none" stroke="#4a3010" stroke-width="2"/>
      <!-- Mouth smile -->
      <path d="M88 138 Q100 148 112 138" fill="none" stroke="#8b4513" stroke-width="2"/>
      <!-- Hair -->
      <path d="M58 110 Q58 60 100 55 Q142 60 142 110" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <!-- Feathered hat -->
      <path d="M50 95 Q50 55 100 45 Q150 55 150 95 Q130 80 100 78 Q70 80 50 95" fill="url(#bard-hat)" stroke="#8b6914" stroke-width="2"/>
      <path d="M130 60 Q160 30 170 50 Q165 55 150 60" fill="#dc3545" stroke="#8b0000" stroke-width="1.5"/>
      <!-- Collar -->
      <path d="M75 175 Q100 190 125 175" fill="none" stroke="#e6a817" stroke-width="3"/>
      <circle cx="100" cy="185" r="5" fill="#e6a817"/>
    </svg>`,

    wizard: (size = 200) => `<svg viewBox="0 0 200 240" width="${size}" height="${size * 1.2}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wiz-robe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6a5acd"/>
          <stop offset="100%" stop-color="#483d8b"/>
        </linearGradient>
        <linearGradient id="wiz-hat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7b68ee"/>
          <stop offset="100%" stop-color="#483d8b"/>
        </linearGradient>
      </defs>
      <!-- Robe body -->
      <path d="M55 175 Q100 155 145 175 L160 240 H40 Z" fill="url(#wiz-robe)" stroke="#3a2a7b" stroke-width="2"/>
      <!-- Stars on robe -->
      <text x="80" y="215" font-size="12" fill="#ffe680" opacity="0.7">&#x2726;</text>
      <text x="110" y="225" font-size="10" fill="#ffe680" opacity="0.5">&#x2726;</text>
      <text x="70" y="230" font-size="8" fill="#ffe680" opacity="0.6">&#x2726;</text>
      <!-- Staff -->
      <line x1="160" y1="100" x2="170" y2="240" stroke="#8b6914" stroke-width="5" stroke-linecap="round"/>
      <circle cx="158" cy="95" r="12" fill="none" stroke="#ffe680" stroke-width="2"/>
      <circle cx="158" cy="95" r="6" fill="#ffe680" opacity="0.8"/>
      <circle cx="158" cy="95" r="3" fill="white"/>
      <!-- Neck -->
      <rect x="88" y="150" width="24" height="30" rx="5" fill="#f0cfa0"/>
      <!-- Head -->
      <ellipse cx="100" cy="115" rx="40" ry="45" fill="#f0cfa0"/>
      <!-- Beard -->
      <path d="M72 130 Q80 175 100 180 Q120 175 128 130" fill="#d0d0d0" stroke="#b0b0b0" stroke-width="1"/>
      <!-- Eyes -->
      <ellipse cx="85" cy="110" rx="5" ry="6" fill="white"/>
      <circle cx="86" cy="110" r="3.5" fill="#483d8b"/>
      <circle cx="87" cy="109" r="1.2" fill="white"/>
      <ellipse cx="115" cy="110" rx="5" ry="6" fill="white"/>
      <circle cx="116" cy="110" r="3.5" fill="#483d8b"/>
      <circle cx="117" cy="109" r="1.2" fill="white"/>
      <!-- Bushy eyebrows -->
      <path d="M76 102 Q85 96 95 101" fill="#c0c0c0" stroke="#b0b0b0" stroke-width="1"/>
      <path d="M105 101 Q115 96 124 102" fill="#c0c0c0" stroke="#b0b0b0" stroke-width="1"/>
      <!-- Nose -->
      <path d="M98 115 Q100 125 102 115" fill="none" stroke="#c0a070" stroke-width="1.5"/>
      <!-- Pointy hat -->
      <path d="M45 90 Q45 70 100 15 Q155 70 155 90 Q130 80 100 78 Q70 80 45 90" fill="url(#wiz-hat)" stroke="#3a2a7b" stroke-width="2"/>
      <path d="M42 90 L158 90" stroke="#ffe680" stroke-width="3"/>
      <!-- Hat star -->
      <text x="92" y="60" font-size="16" fill="#ffe680">&#x2726;</text>
      <!-- Robe collar -->
      <path d="M70 170 L100 185 L130 170" fill="none" stroke="#ffe680" stroke-width="2"/>
    </svg>`,

    knight: (size = 200) => `<svg viewBox="0 0 200 240" width="${size}" height="${size * 1.2}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kn-armor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d0d0d0"/>
          <stop offset="50%" stop-color="#a0a0a0"/>
          <stop offset="100%" stop-color="#808080"/>
        </linearGradient>
        <linearGradient id="kn-helm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c0c0c0"/>
          <stop offset="100%" stop-color="#808080"/>
        </linearGradient>
      </defs>
      <!-- Armor body -->
      <path d="M50 175 Q100 155 150 175 L160 240 H40 Z" fill="url(#kn-armor)" stroke="#606060" stroke-width="2"/>
      <!-- Chest plate detail -->
      <path d="M75 185 Q100 195 125 185 Q125 210 100 220 Q75 210 75 185" fill="none" stroke="#e6a817" stroke-width="2"/>
      <circle cx="100" cy="200" r="6" fill="#e6a817" stroke="#b8860b" stroke-width="1"/>
      <!-- Pauldrons -->
      <ellipse cx="58" cy="178" rx="18" ry="12" fill="url(#kn-armor)" stroke="#606060" stroke-width="2"/>
      <ellipse cx="142" cy="178" rx="18" ry="12" fill="url(#kn-armor)" stroke="#606060" stroke-width="2"/>
      <!-- Sword on back -->
      <line x1="40" y1="140" x2="35" y2="230" stroke="#a0a0a0" stroke-width="4"/>
      <line x1="28" y1="143" x2="52" y2="137" stroke="#a0a0a0" stroke-width="4"/>
      <rect x="33" y="133" width="14" height="6" rx="2" fill="#8b6914"/>
      <!-- Neck -->
      <rect x="85" y="152" width="30" height="28" rx="5" fill="url(#kn-armor)" stroke="#606060" stroke-width="1"/>
      <!-- Head / Helmet -->
      <ellipse cx="100" cy="112" rx="42" ry="48" fill="url(#kn-helm)" stroke="#606060" stroke-width="2"/>
      <!-- Visor slit -->
      <path d="M70 110 L130 110" stroke="#1a1a2e" stroke-width="8" stroke-linecap="round"/>
      <!-- Eyes through visor -->
      <circle cx="85" cy="110" r="3" fill="#4169e1"/>
      <circle cx="85" cy="110" r="1" fill="white"/>
      <circle cx="115" cy="110" r="3" fill="#4169e1"/>
      <circle cx="115" cy="110" r="1" fill="white"/>
      <!-- Helmet ridge -->
      <path d="M100 62 L100 95" stroke="#e6a817" stroke-width="4" stroke-linecap="round"/>
      <!-- Helmet top -->
      <path d="M58 100 Q58 60 100 52 Q142 60 142 100" fill="url(#kn-helm)" stroke="#606060" stroke-width="2"/>
      <!-- Plume -->
      <path d="M100 52 Q105 20 115 25 Q110 35 112 45 Q108 40 100 52" fill="#dc3545" stroke="#8b0000" stroke-width="1"/>
      <!-- Chin guard -->
      <path d="M65 125 Q100 145 135 125" fill="url(#kn-helm)" stroke="#606060" stroke-width="2"/>
    </svg>`
  },

  // ── NPC Portraits ───────────────────────────────────────────
  npc: {
    innkeeper: (size = 180) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="inn-apron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f5f0e0"/>
          <stop offset="100%" stop-color="#d4c9a8"/>
        </linearGradient>
      </defs>
      <!-- Body -->
      <path d="M45 170 Q100 145 155 170 L165 220 H35 Z" fill="#8b4513" stroke="#5a2d0c" stroke-width="2"/>
      <!-- Apron -->
      <path d="M70 175 L65 220 H135 L130 175 Q100 185 70 175" fill="url(#inn-apron)" stroke="#a09070" stroke-width="1"/>
      <!-- Mug in hand -->
      <rect x="148" y="180" width="20" height="25" rx="3" fill="#c8a04a" stroke="#8b6914" stroke-width="2"/>
      <path d="M168 187 Q178 187 178 195 Q178 203 168 203" fill="none" stroke="#8b6914" stroke-width="2"/>
      <ellipse cx="158" cy="180" rx="10" ry="3" fill="#f5e6c0" stroke="#8b6914" stroke-width="1"/>
      <!-- Neck -->
      <rect x="86" y="145" width="28" height="30" rx="6" fill="#e8c090"/>
      <!-- Head - round and friendly -->
      <ellipse cx="100" cy="105" rx="45" ry="50" fill="#e8c090"/>
      <!-- Rosy cheeks -->
      <circle cx="70" cy="118" r="10" fill="#e8a090" opacity="0.5"/>
      <circle cx="130" cy="118" r="10" fill="#e8a090" opacity="0.5"/>
      <!-- Eyes - warm -->
      <ellipse cx="82" cy="105" rx="6" ry="7" fill="white"/>
      <circle cx="83" cy="105" r="4" fill="#5a3010"/>
      <circle cx="84" cy="104" r="1.5" fill="white"/>
      <ellipse cx="118" cy="105" rx="6" ry="7" fill="white"/>
      <circle cx="119" cy="105" r="4" fill="#5a3010"/>
      <circle cx="120" cy="104" r="1.5" fill="white"/>
      <!-- Big smile -->
      <path d="M82 128 Q100 142 118 128" fill="none" stroke="#8b4513" stroke-width="2.5"/>
      <!-- Nose -->
      <ellipse cx="100" cy="115" rx="6" ry="5" fill="#d8b080"/>
      <!-- Hair (bun) -->
      <path d="M55 95 Q55 55 100 50 Q145 55 145 95" fill="#a0522d" stroke="#8b4513" stroke-width="2"/>
      <circle cx="100" cy="50" r="15" fill="#a0522d" stroke="#8b4513" stroke-width="2"/>
      <!-- Eyebrows -->
      <path d="M72 95 Q82 89 92 94" fill="none" stroke="#8b4513" stroke-width="2"/>
      <path d="M108 94 Q118 89 128 95" fill="none" stroke="#8b4513" stroke-width="2"/>
    </svg>`,

    merchant: (size = 180) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="merch-cloak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2d5a1e"/>
          <stop offset="100%" stop-color="#1a3a10"/>
        </linearGradient>
      </defs>
      <!-- Cloak body -->
      <path d="M40 160 Q100 140 160 160 L170 220 H30 Z" fill="url(#merch-cloak)" stroke="#0d2006" stroke-width="2"/>
      <!-- Bags -->
      <ellipse cx="50" cy="195" rx="15" ry="18" fill="#c8a04a" stroke="#8b6914" stroke-width="1.5"/>
      <line x1="50" y1="177" x2="50" y2="183" stroke="#8b6914" stroke-width="2"/>
      <!-- Coin pouch -->
      <circle cx="140" cy="200" r="12" fill="#e6a817" stroke="#b8860b" stroke-width="1.5"/>
      <text x="135" y="205" font-size="12" fill="#8b6914" font-weight="bold">$</text>
      <!-- Neck -->
      <rect x="88" y="140" width="24" height="25" rx="5" fill="#d4b080"/>
      <!-- Head -->
      <ellipse cx="100" cy="100" rx="38" ry="45" fill="#d4b080"/>
      <!-- Hood -->
      <path d="M45 110 Q45 45 100 35 Q155 45 155 110 Q140 95 100 90 Q60 95 45 110" fill="url(#merch-cloak)" stroke="#0d2006" stroke-width="2"/>
      <!-- Crafty eyes -->
      <ellipse cx="84" cy="100" rx="6" ry="5" fill="white"/>
      <circle cx="86" cy="100" r="3" fill="#2d1a00"/>
      <circle cx="87" cy="99" r="1" fill="white"/>
      <ellipse cx="116" cy="100" rx="6" ry="5" fill="white"/>
      <circle cx="118" cy="100" r="3" fill="#2d1a00"/>
      <circle cx="119" cy="99" r="1" fill="white"/>
      <!-- Raised eyebrow -->
      <path d="M74 92 Q84 86 94 91" fill="none" stroke="#5a3a10" stroke-width="2"/>
      <path d="M106 90 Q116 84 126 93" fill="none" stroke="#5a3a10" stroke-width="2"/>
      <!-- Sly grin -->
      <path d="M85 118 Q100 126 115 116" fill="none" stroke="#8b5a30" stroke-width="2"/>
      <!-- Thin mustache -->
      <path d="M88 113 Q100 118 112 113" fill="none" stroke="#5a3a10" stroke-width="1.5"/>
      <!-- Goatee -->
      <path d="M95 125 Q100 135 105 125" fill="#5a3a10"/>
    </svg>`,

    bard_npc: (size = 180) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bnpc-vest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8b2252"/>
          <stop offset="100%" stop-color="#6a1a3e"/>
        </linearGradient>
      </defs>
      <!-- Body -->
      <path d="M55 170 Q100 150 145 170 L155 220 H45 Z" fill="url(#bnpc-vest)" stroke="#4a0e28" stroke-width="2"/>
      <!-- Lute in hands -->
      <ellipse cx="55" cy="195" rx="20" ry="28" fill="#c8a04a" stroke="#8b6914" stroke-width="2" transform="rotate(20 55 195)"/>
      <rect x="40" y="165" width="5" height="40" rx="2" fill="#8b6914" transform="rotate(20 42 185)"/>
      <!-- Strings -->
      <line x1="47" y1="180" x2="60" y2="208" stroke="#e6a817" stroke-width="0.8"/>
      <line x1="50" y1="178" x2="63" y2="206" stroke="#e6a817" stroke-width="0.8"/>
      <line x1="53" y1="176" x2="66" y2="204" stroke="#e6a817" stroke-width="0.8"/>
      <!-- Neck -->
      <rect x="88" y="145" width="24" height="28" rx="5" fill="#e8c890"/>
      <!-- Head -->
      <ellipse cx="100" cy="105" rx="38" ry="45" fill="#e8c890"/>
      <!-- Flowing hair -->
      <path d="M62 105 Q55 60 100 50 Q145 60 138 105" fill="#1a0a00" stroke="#0d0500" stroke-width="1"/>
      <path d="M62 105 Q55 130 50 140" fill="#1a0a00" stroke="none"/>
      <path d="M138 105 Q145 130 150 140" fill="#1a0a00" stroke="none"/>
      <!-- Beret -->
      <ellipse cx="105" cy="58" rx="30" ry="15" fill="#8b2252" stroke="#6a1a3e" stroke-width="2"/>
      <circle cx="105" cy="48" r="5" fill="#e6a817"/>
      <!-- Eyes - expressive -->
      <ellipse cx="84" cy="103" rx="7" ry="8" fill="white"/>
      <circle cx="85" cy="103" r="4.5" fill="#2d5a1e"/>
      <circle cx="86" cy="102" r="1.5" fill="white"/>
      <ellipse cx="116" cy="103" rx="7" ry="8" fill="white"/>
      <circle cx="117" cy="103" r="4.5" fill="#2d5a1e"/>
      <circle cx="118" cy="102" r="1.5" fill="white"/>
      <!-- Eyebrows raised -->
      <path d="M73 93 Q84 86 95 92" fill="none" stroke="#1a0a00" stroke-width="2"/>
      <path d="M105 92 Q116 86 127 93" fill="none" stroke="#1a0a00" stroke-width="2"/>
      <!-- Big smile singing -->
      <ellipse cx="100" cy="126" rx="12" ry="8" fill="#6a1a3e"/>
      <path d="M88 126 Q100 136 112 126" fill="white" opacity="0.8"/>
      <!-- Music notes -->
      <text x="145" y="135" font-size="16" fill="#e6a817" opacity="0.8">&#x266A;</text>
      <text x="155" y="120" font-size="12" fill="#e6a817" opacity="0.6">&#x266B;</text>
    </svg>`,

    elder_sage: (size = 180) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sage-robe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a3a6a"/>
          <stop offset="100%" stop-color="#0d1f3a"/>
        </linearGradient>
      </defs>
      <!-- Robe -->
      <path d="M45 165 Q100 145 155 165 L165 220 H35 Z" fill="url(#sage-robe)" stroke="#081530" stroke-width="2"/>
      <!-- Rune patterns on robe -->
      <text x="75" y="205" font-size="14" fill="#4169e1" opacity="0.4">&#x16A0;</text>
      <text x="105" y="210" font-size="12" fill="#4169e1" opacity="0.3">&#x16B1;</text>
      <text x="90" y="195" font-size="10" fill="#4169e1" opacity="0.3">&#x16A2;</text>
      <!-- Walking stick -->
      <line x1="165" y1="130" x2="175" y2="220" stroke="#5a4020" stroke-width="5" stroke-linecap="round"/>
      <circle cx="164" cy="126" r="8" fill="#4169e1" opacity="0.6"/>
      <circle cx="164" cy="126" r="4" fill="#7ba4ee"/>
      <!-- Neck -->
      <rect x="88" y="140" width="24" height="28" rx="5" fill="#d8c0a0"/>
      <!-- Head -->
      <ellipse cx="100" cy="98" rx="40" ry="48" fill="#d8c0a0"/>
      <!-- Long beard -->
      <path d="M68 115 Q65 180 100 190 Q135 180 132 115" fill="#e8e8e8" stroke="#d0d0d0" stroke-width="1"/>
      <path d="M80 140 Q100 145 120 140" fill="none" stroke="#d0d0d0" stroke-width="1"/>
      <path d="M82 155 Q100 160 118 155" fill="none" stroke="#d0d0d0" stroke-width="1"/>
      <path d="M85 170 Q100 175 115 170" fill="none" stroke="#d0d0d0" stroke-width="1"/>
      <!-- Wise eyes -->
      <ellipse cx="84" cy="95" rx="6" ry="5" fill="white"/>
      <circle cx="85" cy="95" r="3" fill="#1a3a6a"/>
      <circle cx="86" cy="94" r="1" fill="white"/>
      <ellipse cx="116" cy="95" rx="6" ry="5" fill="white"/>
      <circle cx="117" cy="95" r="3" fill="#1a3a6a"/>
      <circle cx="118" cy="94" r="1" fill="white"/>
      <!-- Heavy eyebrows -->
      <path d="M72 87 Q84 80 95 86" fill="#d0d0d0" stroke="#c0c0c0" stroke-width="1"/>
      <path d="M105 86 Q116 80 128 87" fill="#d0d0d0" stroke="#c0c0c0" stroke-width="1"/>
      <!-- Hair receded -->
      <path d="M60 90 Q58 55 100 48 Q142 55 140 90" fill="#e0e0e0" stroke="#d0d0d0" stroke-width="1"/>
      <path d="M60 90 Q55 110 50 125" fill="#e0e0e0" stroke="none"/>
      <path d="M140 90 Q145 110 150 125" fill="#e0e0e0" stroke="none"/>
      <!-- Subtle smile -->
      <path d="M90 112 Q100 118 110 112" fill="none" stroke="#a08060" stroke-width="1.5"/>
    </svg>`
  },

  // ── Boss Portraits ──────────────────────────────────────────
  boss: {
    grammar_goblin: (size = 200) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gob-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6aad5a"/>
          <stop offset="100%" stop-color="#4a7c3f"/>
        </linearGradient>
      </defs>
      <!-- Body -->
      <path d="M60 170 Q100 155 140 170 L150 220 H50 Z" fill="#3a5a2e" stroke="#2a3a1e" stroke-width="2"/>
      <!-- Tattered book -->
      <rect x="130" y="175" width="25" height="30" rx="2" fill="#8b6914" stroke="#5a4010" stroke-width="1.5" transform="rotate(-10 142 190)"/>
      <line x1="135" y1="183" x2="152" y2="180" stroke="#5a4010" stroke-width="1"/>
      <line x1="135" y1="190" x2="152" y2="187" stroke="#5a4010" stroke-width="1"/>
      <text x="138" y="200" font-size="8" fill="#dc3545" transform="rotate(-10 142 195)">!!?</text>
      <!-- Neck - thin -->
      <rect x="92" y="148" width="16" height="26" rx="4" fill="url(#gob-skin)"/>
      <!-- Head - angular -->
      <ellipse cx="100" cy="105" rx="42" ry="48" fill="url(#gob-skin)"/>
      <!-- Big pointy ears -->
      <path d="M55 100 L25 75 L58 95" fill="url(#gob-skin)" stroke="#3a5a2e" stroke-width="2"/>
      <path d="M145 100 L175 75 L142 95" fill="url(#gob-skin)" stroke="#3a5a2e" stroke-width="2"/>
      <!-- Wicked eyes -->
      <ellipse cx="82" cy="98" rx="10" ry="8" fill="#ffe680"/>
      <ellipse cx="84" cy="98" rx="4" ry="6" fill="#1a0a00"/>
      <ellipse cx="118" cy="98" rx="10" ry="8" fill="#ffe680"/>
      <ellipse cx="120" cy="98" rx="4" ry="6" fill="#1a0a00"/>
      <!-- Evil eyebrows -->
      <path d="M70 88 L95 92" fill="none" stroke="#2a3a1e" stroke-width="3"/>
      <path d="M130 88 L105 92" fill="none" stroke="#2a3a1e" stroke-width="3"/>
      <!-- Big nose -->
      <path d="M95 105 Q100 120 105 105" fill="#4a7c3f" stroke="#3a5a2e" stroke-width="1.5"/>
      <!-- Toothy grin -->
      <path d="M78 128 Q100 142 122 128" fill="#2a1a00" stroke="#3a5a2e" stroke-width="2"/>
      <path d="M85 128 L88 135" stroke="white" stroke-width="2"/>
      <path d="M98 131 L100 138" stroke="white" stroke-width="2"/>
      <path d="M112 130 L114 137" stroke="white" stroke-width="2"/>
      <!-- Warts -->
      <circle cx="75" cy="115" r="3" fill="#3a6a2e"/>
      <circle cx="120" cy="120" r="2.5" fill="#3a6a2e"/>
    </svg>`,

    vocab_vampire: (size = 200) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vamp-cape" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a0a0a"/>
          <stop offset="100%" stop-color="#1a0505"/>
        </linearGradient>
        <linearGradient id="vamp-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8b0000"/>
          <stop offset="100%" stop-color="#5a0000"/>
        </linearGradient>
      </defs>
      <!-- Cape outer -->
      <path d="M25 130 Q25 160 35 220 H165 Q175 160 175 130 Q150 155 100 145 Q50 155 25 130" fill="url(#vamp-cape)" stroke="#0d0202" stroke-width="2"/>
      <!-- Cape inner (red) -->
      <path d="M40 140 Q40 165 45 220 H155 Q160 165 160 140 Q140 155 100 148 Q60 155 40 140" fill="url(#vamp-inner)"/>
      <!-- High collar -->
      <path d="M55 130 L45 80 L55 110 Q100 130 145 110 L155 80 L145 130" fill="url(#vamp-cape)" stroke="#0d0202" stroke-width="2"/>
      <!-- Suit -->
      <path d="M65 140 Q100 130 135 140 L140 180 H60 Z" fill="#1a1a2e" stroke="#0d0d15" stroke-width="1.5"/>
      <!-- Medallion -->
      <circle cx="100" cy="155" r="7" fill="#8b0000" stroke="#e6a817" stroke-width="2"/>
      <!-- Neck pale -->
      <rect x="88" y="115" width="24" height="28" rx="5" fill="#e8dce8"/>
      <!-- Head - gaunt -->
      <ellipse cx="100" cy="82" rx="38" ry="42" fill="#e8dce8"/>
      <!-- Slicked hair -->
      <path d="M62 80 Q60 40 100 30 Q140 40 138 80" fill="#1a0a00" stroke="#0d0500" stroke-width="2"/>
      <path d="M80 40 Q100 35 120 40" fill="#1a0a00" stroke="none"/>
      <!-- Widow's peak -->
      <path d="M80 52 L100 62 L120 52" fill="#1a0a00"/>
      <!-- Eyes - red, menacing -->
      <ellipse cx="84" cy="78" rx="7" ry="6" fill="white"/>
      <circle cx="85" cy="78" r="4" fill="#8b0000"/>
      <circle cx="86" cy="77" r="1.5" fill="#ff4040"/>
      <ellipse cx="116" cy="78" rx="7" ry="6" fill="white"/>
      <circle cx="117" cy="78" r="4" fill="#8b0000"/>
      <circle cx="118" cy="77" r="1.5" fill="#ff4040"/>
      <!-- Arched brows -->
      <path d="M74 69 Q84 62 95 69" fill="none" stroke="#1a0a00" stroke-width="2.5"/>
      <path d="M105 69 Q116 62 126 69" fill="none" stroke="#1a0a00" stroke-width="2.5"/>
      <!-- Smirk with fangs -->
      <path d="M85 98 Q100 106 115 96" fill="none" stroke="#5a2030" stroke-width="2"/>
      <path d="M90 98 L88 105" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M112 97 L114 104" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    accent_dragon: (size = 200) => `<svg viewBox="0 0 200 240" width="${size}" height="${size * 1.2}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="drg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff6600"/>
          <stop offset="100%" stop-color="#cc4400"/>
        </linearGradient>
        <linearGradient id="drg-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffe0a0"/>
          <stop offset="100%" stop-color="#ffc060"/>
        </linearGradient>
      </defs>
      <!-- Wings -->
      <path d="M20 120 L5 60 L40 90 L25 45 L55 80 L50 30 L70 75" fill="#cc4400" stroke="#993300" stroke-width="2" opacity="0.8"/>
      <path d="M180 120 L195 60 L160 90 L175 45 L145 80 L150 30 L130 75" fill="#cc4400" stroke="#993300" stroke-width="2" opacity="0.8"/>
      <!-- Body -->
      <path d="M50 170 Q100 150 150 170 L160 240 H40 Z" fill="url(#drg-body)" stroke="#993300" stroke-width="2"/>
      <!-- Belly scales -->
      <path d="M70 175 Q100 165 130 175 L125 220 H75 Z" fill="url(#drg-belly)" stroke="#cc9930" stroke-width="1"/>
      <path d="M78 190 Q100 185 122 190" fill="none" stroke="#cc9930" stroke-width="1" opacity="0.5"/>
      <path d="M76 200 Q100 195 124 200" fill="none" stroke="#cc9930" stroke-width="1" opacity="0.5"/>
      <path d="M74 210 Q100 205 126 210" fill="none" stroke="#cc9930" stroke-width="1" opacity="0.5"/>
      <!-- Neck -->
      <rect x="82" y="142" width="36" height="32" rx="8" fill="url(#drg-body)" stroke="#993300" stroke-width="1"/>
      <!-- Head - large, reptilian -->
      <ellipse cx="100" cy="100" rx="50" ry="50" fill="url(#drg-body)"/>
      <!-- Snout -->
      <ellipse cx="100" cy="125" rx="30" ry="18" fill="url(#drg-body)" stroke="#993300" stroke-width="1.5"/>
      <!-- Nostrils with smoke -->
      <circle cx="90" cy="122" r="4" fill="#993300"/>
      <circle cx="110" cy="122" r="4" fill="#993300"/>
      <path d="M88 118 Q82 108 85 100" fill="none" stroke="#aaa" stroke-width="2" opacity="0.4"/>
      <path d="M112 118 Q118 108 115 100" fill="none" stroke="#aaa" stroke-width="2" opacity="0.4"/>
      <!-- Fierce eyes -->
      <ellipse cx="78" cy="88" rx="12" ry="10" fill="#ffe680"/>
      <ellipse cx="80" cy="88" rx="5" ry="8" fill="#1a0a00"/>
      <ellipse cx="122" cy="88" rx="12" ry="10" fill="#ffe680"/>
      <ellipse cx="124" cy="88" rx="5" ry="8" fill="#1a0a00"/>
      <!-- Angry brows / ridges -->
      <path d="M62 76 L92 82" fill="none" stroke="#993300" stroke-width="4"/>
      <path d="M138 76 L108 82" fill="none" stroke="#993300" stroke-width="4"/>
      <!-- Horns -->
      <path d="M65 68 L50 30 L72 60" fill="#cc4400" stroke="#993300" stroke-width="2"/>
      <path d="M135 68 L150 30 L128 60" fill="#cc4400" stroke="#993300" stroke-width="2"/>
      <!-- Teeth -->
      <path d="M72 135 Q100 145 128 135" fill="#993300"/>
      <path d="M78 135 L80 142" stroke="white" stroke-width="2.5"/>
      <path d="M90 137 L92 145" stroke="white" stroke-width="2.5"/>
      <path d="M110 137 L108 145" stroke="white" stroke-width="2.5"/>
      <path d="M122 135 L120 142" stroke="white" stroke-width="2.5"/>
      <!-- Fire breath hint -->
      <circle cx="100" cy="148" r="6" fill="#ff4400" opacity="0.3"/>
      <circle cx="100" cy="148" r="3" fill="#ffe040" opacity="0.4"/>
    </svg>`,

    idiom_specter: (size = 200) => `<svg viewBox="0 0 200 220" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spec-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#9b88ee" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#5a4aaa" stop-opacity="0.3"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Ghostly body - fading -->
      <path d="M45 140 Q100 120 155 140 Q160 180 155 220 Q140 210 125 220 Q110 210 100 220 Q90 210 75 220 Q60 210 45 220 Q40 180 45 140" fill="url(#spec-body)" filter="url(#glow)"/>
      <!-- Ethereal wisps -->
      <path d="M50 180 Q40 170 45 160" fill="none" stroke="#b8a8ff" stroke-width="2" opacity="0.4"/>
      <path d="M150 175 Q160 165 155 155" fill="none" stroke="#b8a8ff" stroke-width="2" opacity="0.4"/>
      <!-- Head - round, ghostly -->
      <ellipse cx="100" cy="95" rx="45" ry="50" fill="#9b88ee" opacity="0.8" filter="url(#glow)"/>
      <!-- Empty hollow eyes -->
      <ellipse cx="80" cy="90" rx="12" ry="14" fill="#1a1a2e"/>
      <circle cx="80" cy="90" r="5" fill="#b8a8ff" opacity="0.6"/>
      <ellipse cx="120" cy="90" rx="12" ry="14" fill="#1a1a2e"/>
      <circle cx="120" cy="90" r="5" fill="#b8a8ff" opacity="0.6"/>
      <!-- Ghost mouth - open, wailing -->
      <ellipse cx="100" cy="120" rx="15" ry="12" fill="#1a1a2e" opacity="0.8"/>
      <!-- Floating letters around -->
      <text x="30" y="100" font-size="14" fill="#b8a8ff" opacity="0.5" font-style="italic">if</text>
      <text x="155" y="85" font-size="12" fill="#b8a8ff" opacity="0.4" font-style="italic">fly</text>
      <text x="25" y="160" font-size="10" fill="#b8a8ff" opacity="0.3">cats</text>
      <text x="160" y="155" font-size="11" fill="#b8a8ff" opacity="0.35">rain</text>
      <!-- Crown of smoke -->
      <path d="M65 52 Q75 35 85 50 Q95 32 100 48 Q105 32 115 50 Q125 35 135 52" fill="none" stroke="#b8a8ff" stroke-width="2" opacity="0.5"/>
    </svg>`,

    tense_titan: (size = 200) => `<svg viewBox="0 0 200 240" width="${size}" height="${size * 1.2}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="titan-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5080cc"/>
          <stop offset="100%" stop-color="#2a4a8a"/>
        </linearGradient>
        <linearGradient id="titan-armor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6090dd"/>
          <stop offset="100%" stop-color="#3a5aaa"/>
        </linearGradient>
      </defs>
      <!-- Massive body -->
      <path d="M30 175 Q100 145 170 175 L180 240 H20 Z" fill="url(#titan-body)" stroke="#1a3060" stroke-width="2"/>
      <!-- Armor plate -->
      <path d="M60 180 Q100 170 140 180 L135 220 H65 Z" fill="url(#titan-armor)" stroke="#1a3060" stroke-width="2"/>
      <!-- Clock emblem on chest -->
      <circle cx="100" cy="198" r="16" fill="#1a3060" stroke="#e6a817" stroke-width="2"/>
      <line x1="100" y1="188" x2="100" y2="198" stroke="#e6a817" stroke-width="2"/>
      <line x1="100" y1="198" x2="108" y2="195" stroke="#e6a817" stroke-width="2"/>
      <!-- Hour marks -->
      <circle cx="100" cy="185" r="1.5" fill="#e6a817"/>
      <circle cx="113" cy="198" r="1.5" fill="#e6a817"/>
      <circle cx="100" cy="211" r="1.5" fill="#e6a817"/>
      <circle cx="87" cy="198" r="1.5" fill="#e6a817"/>
      <!-- Huge pauldrons -->
      <ellipse cx="40" cy="178" rx="25" ry="16" fill="url(#titan-armor)" stroke="#1a3060" stroke-width="2"/>
      <ellipse cx="160" cy="178" rx="25" ry="16" fill="url(#titan-armor)" stroke="#1a3060" stroke-width="2"/>
      <!-- Thick neck -->
      <rect x="80" y="145" width="40" height="35" rx="8" fill="url(#titan-body)" stroke="#1a3060" stroke-width="1"/>
      <!-- Head - angular, imposing -->
      <path d="M55 100 Q55 45 100 35 Q145 45 145 100 Q145 130 100 140 Q55 130 55 100" fill="url(#titan-body)" stroke="#1a3060" stroke-width="2"/>
      <!-- Crown/helm with clock motifs -->
      <path d="M55 80 Q55 40 100 28 Q145 40 145 80" fill="url(#titan-armor)" stroke="#1a3060" stroke-width="2"/>
      <path d="M55 80 L145 80" stroke="#e6a817" stroke-width="3"/>
      <!-- Hourglass on helm -->
      <path d="M93 55 L107 55 L100 65 L93 55" fill="#e6a817"/>
      <path d="M93 75 L107 75 L100 65 L93 75" fill="#e6a817"/>
      <!-- Stern eyes -->
      <ellipse cx="80" cy="98" rx="10" ry="8" fill="white"/>
      <circle cx="82" cy="98" r="5" fill="#1a3060"/>
      <circle cx="83" cy="97" r="2" fill="#4080dd"/>
      <ellipse cx="120" cy="98" rx="10" ry="8" fill="white"/>
      <circle cx="122" cy="98" r="5" fill="#1a3060"/>
      <circle cx="123" cy="97" r="2" fill="#4080dd"/>
      <!-- Heavy brows -->
      <path d="M66 88 L93 92" fill="none" stroke="#1a3060" stroke-width="4"/>
      <path d="M134 88 L107 92" fill="none" stroke="#1a3060" stroke-width="4"/>
      <!-- Firm mouth -->
      <path d="M85 118 L115 118" stroke="#1a3060" stroke-width="3" stroke-linecap="round"/>
      <!-- Jaw -->
      <path d="M68 110 Q100 135 132 110" fill="none" stroke="#1a3060" stroke-width="2"/>
    </svg>`
  },

  // ── Realm Illustrations ─────────────────────────────────────
  realm: {
    storytellers_glen: (size = 120) => `<svg viewBox="0 0 160 100" width="${size}" height="${size * 0.625}" xmlns="http://www.w3.org/2000/svg">
      <!-- Sky -->
      <rect width="160" height="100" fill="#0d1f3a"/>
      <!-- Moon -->
      <circle cx="130" cy="22" r="12" fill="#ffe680" opacity="0.8"/>
      <!-- Trees -->
      <path d="M10 55 L22 20 L34 55" fill="#1a4a2a" opacity="0.8"/>
      <path d="M5 70 L22 30 L39 70" fill="#2a6a3a" opacity="0.7"/>
      <rect x="19" y="55" width="6" height="20" fill="#4a2a10"/>
      <path d="M125 60 L135 28 L145 60" fill="#1a4a2a" opacity="0.8"/>
      <rect x="132" y="60" width="6" height="18" fill="#4a2a10"/>
      <!-- Campfire -->
      <path d="M70 85 L80 60 L90 85" fill="#ff6600" opacity="0.6"/>
      <path d="M74 85 L80 68 L86 85" fill="#ffe040" opacity="0.7"/>
      <circle cx="80" cy="85" r="8" fill="#ff4400" opacity="0.2"/>
      <!-- Ground -->
      <path d="M0 78 Q40 72 80 78 Q120 72 160 78 L160 100 H0 Z" fill="#2a4a1a"/>
      <!-- Storyteller figure -->
      <circle cx="65" cy="70" r="5" fill="#f0cfa0"/>
      <path d="M60 75 L65 88 L70 75" fill="#6a5acd"/>
      <!-- Listener figure -->
      <circle cx="95" cy="72" r="4" fill="#f0cfa0"/>
      <path d="M91 76 L95 86 L99 76" fill="#4a7c3f"/>
      <!-- Stars -->
      <circle cx="40" cy="15" r="1" fill="white" opacity="0.7"/>
      <circle cx="80" cy="10" r="1.2" fill="white" opacity="0.8"/>
      <circle cx="105" cy="20" r="0.8" fill="white" opacity="0.6"/>
      <circle cx="60" cy="25" r="1" fill="white" opacity="0.5"/>
    </svg>`,

    wordsmiths_workshop: (size = 120) => `<svg viewBox="0 0 160 100" width="${size}" height="${size * 0.625}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="160" height="100" fill="#1a1a2e"/>
      <!-- Workshop interior -->
      <rect x="10" y="10" width="140" height="80" rx="5" fill="#2a1a10" stroke="#4a3020" stroke-width="2"/>
      <!-- Shelves -->
      <line x1="15" y1="35" x2="75" y2="35" stroke="#5a4020" stroke-width="3"/>
      <line x1="85" y1="35" x2="145" y2="35" stroke="#5a4020" stroke-width="3"/>
      <line x1="15" y1="58" x2="75" y2="58" stroke="#5a4020" stroke-width="3"/>
      <!-- Books on shelves -->
      <rect x="18" y="22" width="8" height="13" fill="#dc3545"/>
      <rect x="28" y="24" width="7" height="11" fill="#4169e1"/>
      <rect x="37" y="21" width="9" height="14" fill="#28a745"/>
      <rect x="48" y="23" width="7" height="12" fill="#e6a817"/>
      <rect x="57" y="22" width="8" height="13" fill="#6a5acd"/>
      <rect x="88" y="22" width="9" height="13" fill="#ff6600"/>
      <rect x="99" y="24" width="7" height="11" fill="#dc3545"/>
      <rect x="108" y="21" width="8" height="14" fill="#4169e1"/>
      <rect x="118" y="23" width="9" height="12" fill="#2a6a3a"/>
      <!-- Quill and inkwell on desk -->
      <rect x="50" y="68" width="60" height="20" rx="3" fill="#5a4020" stroke="#4a3010" stroke-width="1"/>
      <circle cx="110" cy="72" r="5" fill="#1a0a00" stroke="#0d0500" stroke-width="1"/>
      <path d="M112 72 Q120 50 115 40" fill="none" stroke="#d4c9a8" stroke-width="1.5"/>
      <!-- Scroll on desk -->
      <rect x="55" y="70" width="30" height="14" rx="2" fill="#f5e6c0" stroke="#c8a870" stroke-width="1"/>
      <line x1="58" y1="74" x2="82" y2="74" stroke="#8b6914" stroke-width="0.5" opacity="0.5"/>
      <line x1="58" y1="78" x2="78" y2="78" stroke="#8b6914" stroke-width="0.5" opacity="0.5"/>
      <!-- Candle light -->
      <rect x="25" y="62" width="4" height="10" fill="#f5e6c0"/>
      <path d="M25 62 Q27 55 29 62" fill="#ff6600" opacity="0.8"/>
      <circle cx="27" cy="58" r="8" fill="#ffe680" opacity="0.15"/>
      <!-- Floating letters -->
      <text x="90" y="55" font-size="10" fill="#e6a817" opacity="0.4" font-weight="bold">A</text>
      <text x="30" y="52" font-size="8" fill="#6a5acd" opacity="0.3" font-weight="bold">W</text>
      <text x="130" y="50" font-size="9" fill="#4169e1" opacity="0.35" font-weight="bold">Z</text>
    </svg>`,

    council_chamber: (size = 120) => `<svg viewBox="0 0 160 100" width="${size}" height="${size * 0.625}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="160" height="100" fill="#1a1a2e"/>
      <!-- Stone walls -->
      <rect x="5" y="5" width="150" height="90" rx="5" fill="#2a2a3e" stroke="#3a3a50" stroke-width="2"/>
      <!-- Arched window -->
      <path d="M65 8 Q80 -5 95 8 L95 35 H65 Z" fill="#0d1f3a"/>
      <circle cx="80" cy="15" r="8" fill="#4169e1" opacity="0.3"/>
      <!-- Throne / podium -->
      <rect x="60" y="50" width="40" height="40" rx="3" fill="#4a3020" stroke="#3a2010" stroke-width="2"/>
      <path d="M58 50 L80 35 L102 50" fill="#5a4030" stroke="#3a2010" stroke-width="1.5"/>
      <!-- Torches -->
      <rect x="20" y="30" width="3" height="15" fill="#5a4020"/>
      <path d="M19 30 Q21.5 22 24 30" fill="#ff6600"/>
      <circle cx="21.5" cy="27" r="6" fill="#ff6600" opacity="0.15"/>
      <rect x="137" y="30" width="3" height="15" fill="#5a4020"/>
      <path d="M136 30 Q138.5 22 141 30" fill="#ff6600"/>
      <circle cx="138.5" cy="27" r="6" fill="#ff6600" opacity="0.15"/>
      <!-- Seated figures -->
      <circle cx="30" cy="65" r="4" fill="#f0cfa0"/>
      <path d="M26 69 L30 80 L34 69" fill="#6a5acd"/>
      <circle cx="50" cy="67" r="4" fill="#f0cfa0"/>
      <path d="M46 71 L50 82 L54 71" fill="#4169e1"/>
      <circle cx="110" cy="67" r="4" fill="#f0cfa0"/>
      <path d="M106 71 L110 82 L114 71" fill="#dc3545"/>
      <circle cx="130" cy="65" r="4" fill="#f0cfa0"/>
      <path d="M126 69 L130 80 L134 69" fill="#2a6a3a"/>
      <!-- Scale of justice -->
      <line x1="80" y1="55" x2="80" y2="48" stroke="#e6a817" stroke-width="1.5"/>
      <line x1="70" y1="48" x2="90" y2="48" stroke="#e6a817" stroke-width="1.5"/>
      <path d="M67 48 L65 55 L75 55 Z" fill="none" stroke="#e6a817" stroke-width="1"/>
      <path d="M93 48 L91 55 L85 55 Z" fill="none" stroke="#e6a817" stroke-width="1"/>
    </svg>`,

    quick_wit_arena: (size = 120) => `<svg viewBox="0 0 160 100" width="${size}" height="${size * 0.625}" xmlns="http://www.w3.org/2000/svg">
      <!-- Arena background -->
      <rect width="160" height="100" fill="#1a1a2e"/>
      <!-- Arena floor -->
      <ellipse cx="80" cy="75" rx="70" ry="25" fill="#2a2a3e" stroke="#4a4a60" stroke-width="2"/>
      <!-- Hourglass center -->
      <path d="M72 35 L88 35 L80 50 L72 35" fill="#e6a817" opacity="0.8"/>
      <path d="M72 65 L88 65 L80 50 L72 65" fill="#e6a817" opacity="0.6"/>
      <rect x="70" y="33" width="20" height="2" rx="1" fill="#b8860b"/>
      <rect x="70" y="65" width="20" height="2" rx="1" fill="#b8860b"/>
      <!-- Sand particles -->
      <circle cx="79" cy="52" r="1" fill="#ffe680" opacity="0.6"/>
      <circle cx="81" cy="55" r="0.8" fill="#ffe680" opacity="0.5"/>
      <circle cx="80" cy="58" r="1" fill="#ffe680" opacity="0.7"/>
      <!-- Lightning bolts -->
      <path d="M35 20 L45 35 L38 35 L48 50" fill="none" stroke="#ffe040" stroke-width="2.5" opacity="0.7"/>
      <path d="M125 20 L115 35 L122 35 L112 50" fill="none" stroke="#ffe040" stroke-width="2.5" opacity="0.7"/>
      <!-- Spectator stands -->
      <path d="M0 50 Q20 40 40 50" fill="#3a3a50"/>
      <path d="M120 50 Q140 40 160 50" fill="#3a3a50"/>
      <!-- Small crowd dots -->
      <circle cx="10" cy="45" r="3" fill="#f0cfa0" opacity="0.5"/>
      <circle cx="20" cy="43" r="3" fill="#f0cfa0" opacity="0.5"/>
      <circle cx="30" cy="45" r="3" fill="#f0cfa0" opacity="0.5"/>
      <circle cx="130" cy="45" r="3" fill="#f0cfa0" opacity="0.5"/>
      <circle cx="140" cy="43" r="3" fill="#f0cfa0" opacity="0.5"/>
      <circle cx="150" cy="45" r="3" fill="#f0cfa0" opacity="0.5"/>
      <!-- Competitor figures -->
      <circle cx="55" cy="68" r="5" fill="#f0cfa0"/>
      <path d="M50 73 L55 85 L60 73" fill="#dc3545"/>
      <circle cx="105" cy="68" r="5" fill="#f0cfa0"/>
      <path d="M100 73 L105 85 L110 73" fill="#4169e1"/>
      <!-- VS text -->
      <text x="72" y="80" font-size="10" fill="#e6a817" font-weight="bold" font-family="serif">VS</text>
    </svg>`,

    dragons_lair: (size = 120) => `<svg viewBox="0 0 160 100" width="${size}" height="${size * 0.625}" xmlns="http://www.w3.org/2000/svg">
      <!-- Cave background -->
      <rect width="160" height="100" fill="#0d0505"/>
      <!-- Cave opening -->
      <path d="M0 0 Q30 10 40 30 Q35 70 20 100 H0 Z" fill="#1a0a0a"/>
      <path d="M160 0 Q130 10 120 30 Q125 70 140 100 H160 Z" fill="#1a0a0a"/>
      <path d="M0 0 L60 0 Q50 8 40 30" fill="#2a0a0a"/>
      <path d="M160 0 L100 0 Q110 8 120 30" fill="#2a0a0a"/>
      <!-- Lava pools -->
      <ellipse cx="50" cy="90" rx="20" ry="6" fill="#ff4400" opacity="0.4"/>
      <ellipse cx="110" cy="88" rx="15" ry="5" fill="#ff4400" opacity="0.3"/>
      <!-- Treasure pile -->
      <circle cx="80" cy="82" r="4" fill="#e6a817" opacity="0.7"/>
      <circle cx="88" cy="85" r="3" fill="#e6a817" opacity="0.6"/>
      <circle cx="74" cy="86" r="3.5" fill="#e6a817" opacity="0.5"/>
      <circle cx="82" cy="88" r="2.5" fill="#e6a817" opacity="0.6"/>
      <!-- Dragon silhouette -->
      <path d="M70 45 Q80 25 95 40 Q105 30 110 45 Q115 35 108 50 Q120 55 110 60 Q100 65 80 60 Q65 55 70 45" fill="#ff4400" opacity="0.15"/>
      <!-- Dragon eyes in darkness -->
      <ellipse cx="82" cy="48" rx="4" ry="3" fill="#ff6600" opacity="0.8"/>
      <ellipse cx="84" cy="48" rx="2" ry="3" fill="#1a0000"/>
      <ellipse cx="98" cy="48" rx="4" ry="3" fill="#ff6600" opacity="0.8"/>
      <ellipse cx="100" cy="48" rx="2" ry="3" fill="#1a0000"/>
      <!-- Smoke wisps -->
      <path d="M85 55 Q80 45 85 35" fill="none" stroke="#888" stroke-width="1.5" opacity="0.2"/>
      <path d="M95 55 Q100 45 95 35" fill="none" stroke="#888" stroke-width="1.5" opacity="0.2"/>
      <!-- Stalactites -->
      <path d="M45 0 L48 15 L51 0" fill="#2a1a1a"/>
      <path d="M70 0 L73 12 L76 0" fill="#2a1a1a"/>
      <path d="M100 0 L103 10 L106 0" fill="#2a1a1a"/>
      <path d="M125 0 L127 14 L129 0" fill="#2a1a1a"/>
    </svg>`,

    tavern: (size = 120) => `<svg viewBox="0 0 160 100" width="${size}" height="${size * 0.625}" xmlns="http://www.w3.org/2000/svg">
      <!-- Night sky -->
      <rect width="160" height="40" fill="#0d0d1a"/>
      <!-- Stars -->
      <circle cx="20" cy="10" r="1" fill="white" opacity="0.6"/>
      <circle cx="60" cy="15" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="100" cy="8" r="0.8" fill="white" opacity="0.5"/>
      <circle cx="140" cy="12" r="1" fill="white" opacity="0.6"/>
      <!-- Building -->
      <rect x="25" y="25" width="110" height="65" rx="3" fill="#3a2a1a" stroke="#2a1a0a" stroke-width="2"/>
      <!-- Roof -->
      <path d="M20 28 L80 5 L140 28" fill="#5a3a20" stroke="#3a2010" stroke-width="2"/>
      <!-- Sign -->
      <rect x="60" y="10" width="40" height="15" rx="2" fill="#5a4020" stroke="#8b6914" stroke-width="1"/>
      <text x="68" y="22" font-size="7" fill="#e6a817" font-weight="bold">TAVERN</text>
      <!-- Door -->
      <rect x="65" y="55" width="30" height="35" rx="2" fill="#5a3a18" stroke="#4a2a10" stroke-width="1.5"/>
      <circle cx="90" cy="72" r="2" fill="#e6a817"/>
      <!-- Windows with warm glow -->
      <rect x="35" y="40" width="20" height="18" rx="2" fill="#ffe680" opacity="0.5" stroke="#4a3020" stroke-width="1.5"/>
      <line x1="45" y1="40" x2="45" y2="58" stroke="#4a3020" stroke-width="1"/>
      <line x1="35" y1="49" x2="55" y2="49" stroke="#4a3020" stroke-width="1"/>
      <rect x="105" y="40" width="20" height="18" rx="2" fill="#ffe680" opacity="0.5" stroke="#4a3020" stroke-width="1.5"/>
      <line x1="115" y1="40" x2="115" y2="58" stroke="#4a3020" stroke-width="1"/>
      <line x1="105" y1="49" x2="125" y2="49" stroke="#4a3020" stroke-width="1"/>
      <!-- Chimney with smoke -->
      <rect x="110" y="8" width="10" height="20" fill="#4a3020"/>
      <path d="M115 8 Q112 0 115 -5" fill="none" stroke="#888" stroke-width="2" opacity="0.3"/>
      <path d="M115 5 Q119 -2 116 -8" fill="none" stroke="#888" stroke-width="1.5" opacity="0.2"/>
      <!-- Ground -->
      <rect x="0" y="90" width="160" height="10" fill="#2a3a1a"/>
    </svg>`
  },

  // ── UI Icons ────────────────────────────────────────────────
  icon: {
    heart: (filled = true, size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${filled ? '#dc3545' : '#3a3a50'}" stroke="${filled ? '#8b0000' : '#2a2a3e'}" stroke-width="1"/>
    </svg>`,

    gold: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="coin-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffe680"/>
          <stop offset="50%" stop-color="#f0c040"/>
          <stop offset="100%" stop-color="#c49b20"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#coin-g)" stroke="#b8860b" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="7" fill="none" stroke="#b8860b" stroke-width="0.8" opacity="0.5"/>
      <text x="8.5" y="16" font-size="10" fill="#8b6914" font-weight="bold">G</text>
    </svg>`,

    xpStar: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="star-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7b68ee"/>
          <stop offset="100%" stop-color="#483d8b"/>
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#star-g)" stroke="#3a2a7b" stroke-width="0.8"/>
    </svg>`,

    shield: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="#4169e1" stroke="#2a4a8a" stroke-width="1"/>
      <path d="M12 5L7 7v4c0 3.5 2.3 6.7 5 7.5V5z" fill="#5b8dee" opacity="0.5"/>
    </svg>`,

    scroll: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="3" width="14" height="18" rx="2" fill="#f5e6c0" stroke="#c8a870" stroke-width="1"/>
      <ellipse cx="5" cy="5" rx="2" ry="3" fill="#e0d0a8" stroke="#c8a870" stroke-width="0.8"/>
      <ellipse cx="19" cy="5" rx="2" ry="3" fill="#e0d0a8" stroke="#c8a870" stroke-width="0.8"/>
      <ellipse cx="5" cy="19" rx="2" ry="3" fill="#e0d0a8" stroke="#c8a870" stroke-width="0.8"/>
      <ellipse cx="19" cy="19" rx="2" ry="3" fill="#e0d0a8" stroke="#c8a870" stroke-width="0.8"/>
      <line x1="8" y1="8" x2="16" y2="8" stroke="#c8a870" stroke-width="0.8"/>
      <line x1="8" y1="11" x2="16" y2="11" stroke="#c8a870" stroke-width="0.8"/>
      <line x1="8" y1="14" x2="14" y2="14" stroke="#c8a870" stroke-width="0.8"/>
    </svg>`,

    star: (filled = true, size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="${filled ? '#f0c040' : '#3a3a50'}" stroke="${filled ? '#b8860b' : '#2a2a3e'}" stroke-width="1"/>
    </svg>`,

    mic: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="#dc3545" stroke="#8b0000" stroke-width="1"/>
      <path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="#dc3545" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="12" y1="18" x2="12" y2="22" stroke="#dc3545" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="8" y1="22" x2="16" y2="22" stroke="#dc3545" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    micWave: (size = 60) => `<svg viewBox="0 0 60 40" width="${size}" height="${size * 0.667}" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="10" width="10" height="20" rx="5" fill="#dc3545"/>
      <path d="M18 20 a12 12 0 0 0 24 0" fill="none" stroke="#dc3545" stroke-width="2" opacity="0.7"/>
      <path d="M12 20 a18 18 0 0 0 36 0" fill="none" stroke="#dc3545" stroke-width="1.5" opacity="0.4"/>
      <path d="M6 20 a24 24 0 0 0 48 0" fill="none" stroke="#dc3545" stroke-width="1" opacity="0.2"/>
    </svg>`,

    sword: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <line x1="7" y1="17" x2="18" y2="4" stroke="#c0c0c0" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="4" x2="20" y2="2" stroke="#e0e0e0" stroke-width="1.5"/>
      <line x1="9" y1="13" x2="13" y2="17" stroke="#8b6914" stroke-width="2.5"/>
      <line x1="4" y1="20" x2="7" y2="17" stroke="#5a3a10" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    fire: (size = 24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 8 5 11 5 15a7 7 0 0 0 14 0c0-4-3-7-7-13z" fill="#ff6600" stroke="#cc4400" stroke-width="0.8"/>
      <path d="M12 8c-2 3-4 5-4 7a4 4 0 0 0 8 0c0-2-2-4-4-7z" fill="#ffe040" opacity="0.7"/>
    </svg>`
  },

  // ── Score Bar Rendering ─────────────────────────────────────
  scoreBar: (label, percent, color = '#f0c040', width = 200) => `<svg viewBox="0 0 ${width} 30" width="${width}" height="30" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="8" width="${width}" height="14" rx="7" fill="#1a1a2e" stroke="#3a3a50" stroke-width="1"/>
    <rect x="0" y="8" width="${Math.max(0, percent / 100 * width)}" height="14" rx="7" fill="${color}" opacity="0.8">
      <animate attributeName="width" from="0" to="${percent / 100 * width}" dur="0.8s" fill="freeze"/>
    </rect>
    <text x="4" y="19" font-size="9" fill="white" font-family="sans-serif">${label}</text>
    <text x="${width - 4}" y="19" font-size="9" fill="white" font-family="sans-serif" text-anchor="end">${Math.round(percent)}%</text>
  </svg>`
};
