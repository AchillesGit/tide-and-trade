import type { EnemyType } from "../types/battleTypes";

/*
 * A collection of regular enemies, minibosses and final bosses for the battle
 * system. Each entry adheres to the EnemyType interface and contains
 * descriptive identifiers, level indicators and a set of dice defining
 * their offensive and defensive capabilities. The enemies are designed
 * to scale in difficulty through the mid‑game levels and culminate in
 * challenging minibosses and epic final bosses reminiscent of roguelike
 * deckbuilder encounters such as Slay the Spire.
 */

// ────────────────────────────
// Regular enemies (levels 0–7)
// ────────────────────────────
const ENEMIES: EnemyType[] = [
  // Level 0
  {
    id: "lvl1-rusty-sloop",
    name: "Rusty Sloop",
    level: 0,
    startingHp: 20,
    currentHp: 20,
    killingReward: 20,
    dices: [
      {
        id: "rusty-sloop-cannon-1",
        faces: [
          { attack: 1 },
          { attack: 1 },
          { attack: 2 },
          { attack: 1, defense: 1 },
          { defense: 1 },
          { absDmg: 1 },
        ],
      },
      {
        id: "rusty-sloop-crew-1",
        faces: [
          { attack: 1 },
          { defense: 1 },
          { defense: 1 },
          { attack: 1, defense: 1 },
          { absDmg: 1 },
          { attackMultiplier: 2 },
        ],
      },
    ],
  },
  {
    id: "lvl1-rum-raiders",
    name: "Rum Raiders",
    level: 0,
    startingHp: 22,
    currentHp: 22,
    killingReward: 22,
    dices: [
      {
        id: "rum-raider-cannon-1",
        faces: [
          { attack: 1 },
          { attack: 2 },
          { attack: 1, defense: 1 },
          { absDmg: 1 },
          { defense: 1 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "rum-raider-chaos-1",
        faces: [
          { attack: 2 },
          { attackMultiplier: 2 },
          { defense: 1 },
          { attack: 1 },
          { absDmg: 1 },
          { defenseMultiplier: 2 },
        ],
      },
    ],
  },
  // Level 1
  {
    id: "lvl2-quick-brig",
    name: "Swift Brigantine",
    level: 1,
    startingHp: 32,
    currentHp: 32,
    killingReward: 32,
    dices: [
      {
        id: "quick-brig-cannon-1",
        faces: [
          { attack: 2 },
          { attack: 2 },
          { attack: 3 },
          { attack: 2, defense: 1 },
          { defense: 1 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "quick-brig-crew-1",
        faces: [
          { attack: 2 },
          { defense: 2 },
          { defense: 1 },
          { attack: 1, defense: 1 },
          { absDmg: 2 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "quick-brig-rigging-1",
        faces: [
          { defense: 1 },
          { defenseMultiplier: 2 },
          { defense: 2 },
          { attack: 1 },
          { absDmg: 1 },
          { attackMultiplier: 2 },
        ],
      },
    ],
  },
  // Level 2
  {
    id: "lvl3-ghost-frigate",
    name: "Ghost Frigate",
    level: 2,
    startingHp: 48,
    currentHp: 48,
    killingReward: 48,
    dices: [
      {
        id: "ghost-frigate-phantom-cannon-1",
        faces: [
          { attack: 3 },
          { attack: 4 },
          { attackMultiplier: 2 },
          { absDmg: 3 },
          { defense: 2 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "ghost-frigate-phantom-crew-1",
        faces: [
          { attack: 3 },
          { attack: 2, defense: 1 },
          { absDmg: 2 },
          { attackMultiplier: 2 },
          { defense: 1 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "ghost-frigate-hull-1",
        faces: [
          { defense: 2 },
          { defense: 3 },
          { defense: 4 },
          { defenseMultiplier: 2 },
          { attack: 1 },
          { absDmg: 1 },
        ],
      },
    ],
  },
  // ─────────────────────────
  // Level 3
  // ─────────────────────────
  {
    id: "lvl4-storm-galleon",
    name: "Storm Galleon",
    level: 3,
    startingHp: 64,
    currentHp: 64,
    killingReward: 64,
    dices: [
      {
        id: "storm-galleon-cannon-1",
        faces: [
          { attack: 4 },
          { attack: 4 },
          { attack: 5 },
          { attack: 4, defense: 2 },
          { defense: 2 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "storm-galleon-crew-1",
        faces: [
          { attack: 3 },
          { defense: 3 },
          { attack: 2, defense: 2 },
          { absDmg: 3 },
          { defenseMultiplier: 2 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "storm-galleon-hull-1",
        faces: [
          { defense: 3 },
          { defense: 4 },
          { defenseMultiplier: 2 },
          { attack: 2 },
          { absDmg: 2 },
          { attackMultiplier: 2 },
        ],
      },
    ],
  },
  {
    id: "lvl4-corsair-cruiser",
    name: "Corsair Cruiser",
    level: 3,
    startingHp: 58,
    currentHp: 58,
    killingReward: 58,
    dices: [
      {
        id: "corsair-cruiser-cannon-1",
        faces: [
          { attack: 5 },
          { attack: 4 },
          { attackMultiplier: 3 },
          { absDmg: 2 },
          { attack: 3, defense: 1 },
          { defense: 2 },
        ],
      },
      {
        id: "corsair-cruiser-hull-1",
        faces: [
          { defense: 3 },
          { defenseMultiplier: 2 },
          { defense: 4 },
          { attack: 2 },
          { absDmg: 2 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "corsair-cruiser-crew-1",
        faces: [
          { attack: 3 },
          { absDmg: 2 },
          { attackMultiplier: 2 },
          { defense: 2 },
          { defenseMultiplier: 2 },
          { attack: 2 },
        ],
      },
    ],
  },
  // ─────────────────────────
  // Level 4
  // ─────────────────────────
  {
    id: "lvl5-volcanic-warship",
    name: "Volcanic Warship",
    level: 4,
    startingHp: 80,
    currentHp: 80,
    killingReward: 80,
    dices: [
      {
        id: "volcanic-warship-cannon-1",
        faces: [
          { attack: 5 },
          { attack: 6 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
          { defense: 3 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "volcanic-warship-cannon-2",
        faces: [
          { attack: 4 },
          { attack: 5 },
          { defense: 2 },
          { defenseMultiplier: 2 },
          { absDmg: 4 },
          { attackMultiplier: 3 },
        ],
      },
      {
        id: "volcanic-warship-hull-1",
        faces: [
          { defense: 4 },
          { defense: 5 },
          { defenseMultiplier: 2 },
          { attack: 3 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
        ],
      },
    ],
  },
  {
    id: "lvl5-shadow-corsair",
    name: "Shadow Corsair",
    level: 4,
    startingHp: 76,
    currentHp: 76,
    killingReward: 76,
    dices: [
      {
        id: "shadow-corsair-cannon-1",
        faces: [
          { attack: 6 },
          { attack: 4 },
          { attackMultiplier: 3 },
          { absDmg: 3 },
          { attack: 3, defense: 2 },
          { defense: 2 },
        ],
      },
      {
        id: "shadow-corsair-hull-1",
        faces: [
          { defense: 4 },
          { defenseMultiplier: 2 },
          { absDmg: 4 },
          { attack: 2 },
          { attackMultiplier: 2 },
          { defense: 3 },
        ],
      },
      {
        id: "shadow-corsair-crew-1",
        faces: [
          { attack: 4 },
          { defense: 3 },
          { defenseMultiplier: 2 },
          { attackMultiplier: 2 },
          { absDmg: 3 },
          { attack: 3 },
        ],
      },
    ],
  },
  // ─────────────────────────
  // Level 5
  // ─────────────────────────
  {
    id: "lvl6-arcane-manowar",
    name: "Arcane Man‑o'-War",
    level: 5,
    startingHp: 96,
    currentHp: 96,
    killingReward: 96,
    dices: [
      {
        id: "arcane-manowar-cannon-1",
        faces: [
          { attack: 6 },
          { attack: 7 },
          { absDmg: 4 },
          { attackMultiplier: 2 },
          { defense: 4 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "arcane-manowar-crew-1",
        faces: [
          { attack: 5, defense: 3 },
          { defenseMultiplier: 2 },
          { attackMultiplier: 3 },
          { absDmg: 3 },
          { defense: 3 },
          { attack: 4 },
        ],
      },
      {
        id: "arcane-manowar-hull-1",
        faces: [
          { defense: 5 },
          { defense: 6 },
          { defenseMultiplier: 2 },
          { attack: 3 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
        ],
      },
    ],
  },
  {
    id: "lvl6-iron-juggernaut",
    name: "Iron Juggernaut",
    level: 5,
    startingHp: 92,
    currentHp: 92,
    killingReward: 92,
    dices: [
      {
        id: "iron-juggernaut-cannon-1",
        faces: [
          { attack: 5 },
          { attack: 6 },
          { attackMultiplier: 2 },
          { absDmg: 3 },
          { attack: 4 },
          { defense: 3 },
        ],
      },
      {
        id: "iron-juggernaut-hull-1",
        faces: [
          { defense: 5 },
          { defense: 4 },
          { defenseMultiplier: 2 },
          { attack: 3 },
          { absDmg: 2 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "iron-juggernaut-crew-1",
        faces: [
          { attack: 4, defense: 2 },
          { attackMultiplier: 3 },
          { defenseMultiplier: 2 },
          { absDmg: 3 },
          { defense: 3 },
          { attack: 2 },
        ],
      },
    ],
  },
  // ─────────────────────────
  // Level 6
  // ─────────────────────────
  {
    id: "lvl7-tempest-destroyer",
    name: "Tempest Destroyer",
    level: 6,
    startingHp: 112,
    currentHp: 112,
    killingReward: 112,
    dices: [
      {
        id: "tempest-destroyer-cannon-1",
        faces: [
          { attack: 7 },
          { attack: 8 },
          { absDmg: 4 },
          { attackMultiplier: 2 },
          { defense: 4 },
          { attack: 5, defense: 2 },
        ],
      },
      {
        id: "tempest-destroyer-hull-1",
        faces: [
          { defense: 6 },
          { defense: 7 },
          { defenseMultiplier: 2 },
          { attack: 4 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "tempest-destroyer-crew-1",
        faces: [
          { attack: 5 },
          { attackMultiplier: 3 },
          { absDmg: 4 },
          { defenseMultiplier: 2 },
          { defense: 4 },
          { attack: 4, defense: 1 },
        ],
      },
    ],
  },
  {
    id: "lvl7-void-leviathan",
    name: "Void Leviathan",
    level: 6,
    startingHp: 110,
    currentHp: 110,
    killingReward: 110,
    dices: [
      {
        id: "void-leviathan-cannon-1",
        faces: [
          { attack: 8 },
          { attack: 7 },
          { attackMultiplier: 2 },
          { absDmg: 5 },
          { defense: 5 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "void-leviathan-hull-1",
        faces: [
          { defense: 6 },
          { absDmg: 4 },
          { attack: 5, defense: 2 },
          { attackMultiplier: 3 },
          { defenseMultiplier: 2 },
          { attack: 4 },
        ],
      },
      {
        id: "void-leviathan-crew-1",
        faces: [
          { absDmg: 5 },
          { attack: 6 },
          { attackMultiplier: 2 },
          { defense: 5 },
          { defenseMultiplier: 2 },
          { attack: 5 },
        ],
      },
    ],
  },
  // ─────────────────────────
  // Level 7
  // ─────────────────────────
  {
    id: "lvl8-celestial-dreadnought",
    name: "Celestial Dreadnought",
    level: 7,
    startingHp: 128,
    currentHp: 128,
    killingReward: 128,
    dices: [
      {
        id: "celestial-dreadnought-cannon-1",
        faces: [
          { attack: 8 },
          { attack: 9 },
          { attackMultiplier: 3 },
          { absDmg: 5 },
          { defense: 5 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "celestial-dreadnought-hull-1",
        faces: [
          { defense: 7 },
          { defense: 8 },
          { defenseMultiplier: 3 },
          { attack: 5 },
          { absDmg: 4 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "celestial-dreadnought-crew-1",
        faces: [
          { attack: 6, defense: 3 },
          { attackMultiplier: 2 },
          { defenseMultiplier: 2 },
          { absDmg: 4 },
          { defense: 4 },
          { attack: 5 },
        ],
      },
    ],
  },
  {
    id: "lvl8-phantom-fleet",
    name: "Phantom Fleet",
    level: 7,
    startingHp: 124,
    currentHp: 124,
    killingReward: 124,
    dices: [
      {
        id: "phantom-fleet-cannon-1",
        faces: [
          { attack: 7 },
          { attack: 6 },
          { attackMultiplier: 2 },
          { absDmg: 5 },
          { defense: 4 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "phantom-fleet-hull-1",
        faces: [
          { defense: 6 },
          { defense: 7 },
          { defenseMultiplier: 2 },
          { attack: 4 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "phantom-fleet-crew-1",
        faces: [
          { attack: 6, defense: 2 },
          { attackMultiplier: 3 },
          { defenseMultiplier: 2 },
          { absDmg: 4 },
          { defense: 5 },
          { attack: 5 },
        ],
      },
    ],
  },
];

// ────────────────────────────
// Minibosses (levels 1–7)
// ────────────────────────────
const MINIBOSSES: EnemyType[] = [
  {
    id: "lvl2-cannoneer-captain",
    name: "Cannoneer Captain",
    level: 1,
    startingHp: 60,
    currentHp: 60,
    killingReward: 80,
    dices: [
      {
        id: "cannoneer-captain-cannon-1",
        faces: [
          { attack: 3 },
          { attack: 4 },
          { attackMultiplier: 2 },
          { absDmg: 2 },
          { defense: 2 },
          { attack: 3, defense: 1 },
        ],
      },
      {
        id: "cannoneer-captain-hull-1",
        faces: [
          { defense: 3 },
          { defense: 4 },
          { defenseMultiplier: 2 },
          { attack: 2 },
          { absDmg: 2 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "cannoneer-captain-crew-1",
        faces: [
          { attack: 4 },
          { attackMultiplier: 3 },
          { absDmg: 3 },
          { defense: 3 },
          { defenseMultiplier: 2 },
          { attack: 3 },
        ],
      },
    ],
  },
  {
    id: "lvl3-sea-witch",
    name: "Sea Witch",
    level: 2,
    startingHp: 84,
    currentHp: 84,
    killingReward: 100,
    dices: [
      {
        id: "sea-witch-spell-1",
        faces: [
          { attack: 4 },
          { attack: 5 },
          { attackMultiplier: 2 },
          { absDmg: 3 },
          { defense: 3 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "sea-witch-shield-1",
        faces: [
          { defense: 4 },
          { defense: 5 },
          { defenseMultiplier: 2 },
          { attack: 3 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "sea-witch-curse-1",
        faces: [
          { absDmg: 4 },
          { attack: 4 },
          { attackMultiplier: 3 },
          { defense: 3 },
          { defenseMultiplier: 2 },
          { attack: 3, defense: 1 },
        ],
      },
    ],
  },
  {
    id: "lvl4-reef-leviathan",
    name: "Reef Leviathan",
    level: 3,
    startingHp: 100,
    currentHp: 100,
    killingReward: 120,
    dices: [
      {
        id: "reef-leviathan-cannon-1",
        faces: [
          { attack: 5 },
          { attack: 6 },
          { attackMultiplier: 2 },
          { absDmg: 4 },
          { defense: 4 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "reef-leviathan-hull-1",
        faces: [
          { defense: 5 },
          { defense: 6 },
          { defenseMultiplier: 2 },
          { attack: 4 },
          { absDmg: 3 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "reef-leviathan-crew-1",
        faces: [
          { absDmg: 5 },
          { attack: 5 },
          { attackMultiplier: 3 },
          { defense: 4 },
          { defenseMultiplier: 2 },
          { attack: 4, defense: 1 },
        ],
      },
    ],
  },
  {
    id: "lvl5-molten-behemoth",
    name: "Molten Behemoth",
    level: 4,
    startingHp: 120,
    currentHp: 120,
    killingReward: 140,
    dices: [
      {
        id: "molten-behemoth-cannon-1",
        faces: [
          { attack: 6 },
          { attack: 7 },
          { attackMultiplier: 2 },
          { absDmg: 4 },
          { defense: 4 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "molten-behemoth-hull-1",
        faces: [
          { defense: 6 },
          { defense: 7 },
          { defenseMultiplier: 2 },
          { attack: 5 },
          { absDmg: 4 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "molten-behemoth-crew-1",
        faces: [
          { absDmg: 5 },
          { attack: 6 },
          { attackMultiplier: 3 },
          { defense: 5 },
          { defenseMultiplier: 2 },
          { attack: 5, defense: 2 },
        ],
      },
    ],
  },
  {
    id: "lvl6-arcane-admiral",
    name: "Arcane Admiral",
    level: 5,
    startingHp: 140,
    currentHp: 140,
    killingReward: 160,
    dices: [
      {
        id: "arcane-admiral-cannon-1",
        faces: [
          { attack: 7 },
          { attack: 8 },
          { attackMultiplier: 3 },
          { absDmg: 5 },
          { defense: 5 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "arcane-admiral-hull-1",
        faces: [
          { defense: 7 },
          { defense: 8 },
          { defenseMultiplier: 2 },
          { attack: 5 },
          { absDmg: 4 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "arcane-admiral-crew-1",
        faces: [
          { absDmg: 6 },
          { attack: 6 },
          { attackMultiplier: 2 },
          { defense: 5 },
          { defenseMultiplier: 3 },
          { attack: 5, defense: 2 },
        ],
      },
      {
        id: "arcane-admiral-cannon-2",
        faces: [
          { attack: 6 },
          { defense: 4 },
          { attackMultiplier: 2 },
          { defenseMultiplier: 2 },
          { absDmg: 4 },
          { attack: 5 },
        ],
      },
    ],
  },
  {
    id: "lvl7-elder-kraken",
    name: "Elder Kraken",
    level: 6,
    startingHp: 160,
    currentHp: 160,
    killingReward: 180,
    dices: [
      {
        id: "elder-kraken-cannon-1",
        faces: [
          { attack: 8 },
          { attack: 9 },
          { attackMultiplier: 3 },
          { absDmg: 5 },
          { defense: 5 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "elder-kraken-hull-1",
        faces: [
          { defense: 8 },
          { defense: 9 },
          { defenseMultiplier: 3 },
          { attack: 6 },
          { absDmg: 4 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "elder-kraken-crew-1",
        faces: [
          { absDmg: 6 },
          { attack: 7 },
          { attackMultiplier: 2 },
          { defense: 6 },
          { defenseMultiplier: 2 },
          { attack: 6, defense: 2 },
        ],
      },
      {
        id: "elder-kraken-cannon-2",
        faces: [
          { attack: 7 },
          { attackMultiplier: 3 },
          { defense: 5 },
          { defenseMultiplier: 2 },
          { absDmg: 5 },
          { attack: 6 },
        ],
      },
    ],
  },
  {
    id: "lvl8-spectral-warlord",
    name: "Spectral Warlord",
    level: 7,
    startingHp: 180,
    currentHp: 180,
    killingReward: 200,
    dices: [
      {
        id: "spectral-warlord-cannon-1",
        faces: [
          { attack: 9 },
          { attack: 10 },
          { attackMultiplier: 3 },
          { absDmg: 6 },
          { defense: 6 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "spectral-warlord-hull-1",
        faces: [
          { defense: 9 },
          { defense: 10 },
          { defenseMultiplier: 3 },
          { attack: 7 },
          { absDmg: 5 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "spectral-warlord-crew-1",
        faces: [
          { absDmg: 7 },
          { attack: 7 },
          { attackMultiplier: 2 },
          { defense: 6 },
          { defenseMultiplier: 2 },
          { attack: 6, defense: 2 },
        ],
      },
      {
        id: "spectral-warlord-cannon-2",
        faces: [
          { attack: 8 },
          { attackMultiplier: 3 },
          { defense: 6 },
          { defenseMultiplier: 2 },
          { absDmg: 5 },
          { attack: 7 },
        ],
      },
    ],
  },
];

// ────────────────────────────
// Final bosses (level 8)
// ────────────────────────────
const BOSSES: EnemyType[] = [
  {
    id: "lvl9-krakens-wrath",
    name: "Kraken's Wrath",
    level: 8,
    startingHp: 300,
    currentHp: 300,
    killingReward: 300,
    dices: [
      {
        id: "krakens-wrath-tentacle-1",
        faces: [
          { attack: 12 },
          { attack: 13 },
          { attackMultiplier: 3 },
          { absDmg: 8 },
          { defense: 8 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "krakens-wrath-tentacle-2",
        faces: [
          { defense: 10 },
          { defense: 11 },
          { defenseMultiplier: 3 },
          { attack: 8 },
          { absDmg: 7 },
          { attackMultiplier: 3 },
        ],
      },
      {
        id: "krakens-wrath-tentacle-3",
        faces: [
          { absDmg: 9 },
          { attack: 10 },
          { attackMultiplier: 2 },
          { defense: 9 },
          { defenseMultiplier: 2 },
          { attack: 9, defense: 3 },
        ],
      },
      {
        id: "krakens-wrath-core-1",
        faces: [
          { attack: 11 },
          { attackMultiplier: 3 },
          { defense: 9 },
          { defenseMultiplier: 2 },
          { absDmg: 8 },
          { attack: 9 },
        ],
      },
    ],
  },
  {
    id: "lvl9-imperial-dreadnought",
    name: "Imperial Dreadnought",
    level: 8,
    startingHp: 280,
    currentHp: 280,
    killingReward: 280,
    dices: [
      {
        id: "imperial-dreadnought-cannon-1",
        faces: [
          { attack: 11 },
          { attack: 12 },
          { attackMultiplier: 3 },
          { absDmg: 7 },
          { defense: 9 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "imperial-dreadnought-hull-1",
        faces: [
          { defense: 10 },
          { defense: 12 },
          { defenseMultiplier: 3 },
          { attack: 8 },
          { absDmg: 6 },
          { attackMultiplier: 2 },
        ],
      },
      {
        id: "imperial-dreadnought-crew-1",
        faces: [
          { absDmg: 8 },
          { attack: 9 },
          { attackMultiplier: 2 },
          { defense: 10 },
          { defenseMultiplier: 2 },
          { attack: 8, defense: 3 },
        ],
      },
      {
        id: "imperial-dreadnought-cannon-2",
        faces: [
          { attack: 10 },
          { attackMultiplier: 3 },
          { defense: 8 },
          { defenseMultiplier: 2 },
          { absDmg: 7 },
          { attack: 9 },
        ],
      },
    ],
  },
  {
    id: "lvl9-eldritch-leviathan",
    name: "Eldritch Leviathan",
    level: 8,
    startingHp: 320,
    currentHp: 320,
    killingReward: 320,
    dices: [
      {
        id: "eldritch-leviathan-cannon-1",
        faces: [
          { attack: 13 },
          { attack: 14 },
          { attackMultiplier: 3 },
          { absDmg: 9 },
          { defense: 9 },
          { defenseMultiplier: 2 },
        ],
      },
      {
        id: "eldritch-leviathan-hull-1",
        faces: [
          { defense: 11 },
          { defense: 12 },
          { defenseMultiplier: 3 },
          { attack: 9 },
          { absDmg: 8 },
          { attackMultiplier: 3 },
        ],
      },
      {
        id: "eldritch-leviathan-crew-1",
        faces: [
          { absDmg: 10 },
          { attack: 11 },
          { attackMultiplier: 2 },
          { defense: 10 },
          { defenseMultiplier: 2 },
          { attack: 10, defense: 3 },
        ],
      },
      {
        id: "eldritch-leviathan-cannon-2",
        faces: [
          { attack: 12 },
          { attackMultiplier: 3 },
          { defense: 9 },
          { defenseMultiplier: 2 },
          { absDmg: 9 },
          { attack: 10 },
        ],
      },
    ],
  },
];

export { BOSSES, ENEMIES, MINIBOSSES };
