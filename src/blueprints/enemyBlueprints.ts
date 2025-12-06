import type { EnemyType } from "../types/battleTypes";

const ENEMIES: EnemyType[] = [
  // ─────────────────────────
  // Level 0
  // ─────────────────────────
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

  // ─────────────────────────
  // Level 1
  // ─────────────────────────
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

  // ─────────────────────────
  // Level 2
  // ─────────────────────────
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
];

export default ENEMIES;
