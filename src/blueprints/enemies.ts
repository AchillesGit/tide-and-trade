import type { EnemyType } from "../types/battleTypes";

const ENEMIES: EnemyType[] = [
  // ─────────────────────────
  // Level 0
  // ─────────────────────────
  {
    id: "lvl1-rusty-sloop",
    name: "Rusty Sloop",
    level: 0,
    startingEnemyLife: 20,
    enemyDice: [
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
          { attackMultiplier: 1.2 },
        ],
      },
    ],
  },

  {
    id: "lvl1-rum-raiders",
    name: "Rum Raiders",
    level: 0,
    startingEnemyLife: 22,
    enemyDice: [
      {
        id: "rum-raider-cannon-1",
        faces: [
          { attack: 1 },
          { attack: 2 },
          { attack: 1, defense: 1 },
          { absDmg: 1 },
          { defense: 1 },
          { attackMultiplier: 1.2 },
        ],
      },
      {
        id: "rum-raider-chaos-1",
        faces: [
          { attack: 2 },
          { attackMultiplier: 1.3 },
          { defense: 1 },
          { attack: 1 },
          { absDmg: 1 },
          { defenseMultiplier: 1.2 },
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
    startingEnemyLife: 32,
    enemyDice: [
      {
        id: "quick-brig-cannon-1",
        faces: [
          { attack: 2 },
          { attack: 2 },
          { attack: 3 },
          { attack: 2, defense: 1 },
          { defense: 1 },
          { attackMultiplier: 1.5 },
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
          { defenseMultiplier: 1.3 },
        ],
      },
      {
        id: "quick-brig-rigging-1",
        faces: [
          { defense: 1 },
          { defenseMultiplier: 1.4 },
          { defense: 2 },
          { attack: 1 },
          { absDmg: 1 },
          { attackMultiplier: 1.2 },
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
    startingEnemyLife: 48,
    enemyDice: [
      {
        id: "ghost-frigate-phantom-cannon-1",
        faces: [
          { attack: 3 },
          { attack: 4 },
          { attackMultiplier: 2 },
          { absDmg: 3 },
          { defense: 2 },
          { defenseMultiplier: 1.5 },
        ],
      },
      {
        id: "ghost-frigate-phantom-crew-1",
        faces: [
          { attack: 3 },
          { attack: 2, defense: 1 },
          { absDmg: 2 },
          { attackMultiplier: 1.5 },
          { defense: 1 },
          { defenseMultiplier: 1.3 },
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
