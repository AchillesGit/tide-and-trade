import type { FaceEffect } from "../types/battleTypes";

/**
 * Predefined enemy dice templates.
 * Each template consists of a level and an array of possible die faces.
 */
export const enemyDices: { level: number; faces: FaceEffect[] }[] = [
  {
    level: 1,
    faces: [{ attack: 3 }, { attack: 1 }, { attack: 1 }, { attack: 1 }, {}],
  },
  {
    level: 1,
    faces: [{ absDmg: 1 }, { attack: 2 }, { defense: 5 }, { defense: 5 }, {}],
  },
];

/**
 * Standard attack die faces.
 * Primarily grants attack points, sometimes at higher cost, with some blank faces.
 */
export const ATTACK_DIE_FACES: FaceEffect[] = [
  { attack: 1, cost: 1 },
  { attack: 1, cost: 1 },
  { attack: 1, cost: 1 },
  { attack: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

/**
 * Standard defense die faces.
 * Provides defense points similar to the attack die but for defense, with some blanks.
 */
export const DEFENSE_DIE_FACES: FaceEffect[] = [
  { defense: 1, cost: 1 },
  { defense: 1, cost: 1 },
  { defense: 1, cost: 1 },
  { defense: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

/**
 * Hybrid die faces combining attack and defense on the same face.
 */
export const HYBRID_DIE_FACES: FaceEffect[] = [
  { attack: 1, defense: 1, cost: 1 },
  { attack: 1, defense: 1, cost: 1 },
  { attack: 1, defense: 1, cost: 1 },
  { attack: 2, defense: 2, cost: 3 },
  { cost: 0 },
  { cost: 0 },
];

/**
 * Enemy die faces.
 * Enemy uses simple attack/defense values without explicit cost.
 */
export const ENEMY_DIE_FACES: FaceEffect[] = [
  { attack: 1 },
  { attack: 1 },
  { defense: 1 },
];

/**
 * Attack multiplier die faces.
 * Multiplies total player attack for the round.
 */
export const MULTIPLY_ATTACK_DIE_FACES: FaceEffect[] = [
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

/**
 * Defense multiplier die faces.
 * Multiplies total player defense for the round.
 */
export const MULTIPLY_DEFENSE_DIE_FACES: FaceEffect[] = [
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

/**
 * Absolute damage die faces.
 * Deals damage that bypasses enemy defense.
 */
export const DAMAGE_DIE_FACES: FaceEffect[] = [
  { absDmg: 2, cost: 2 },
  { absDmg: 2, cost: 2 },
  { absDmg: 2, cost: 2 },
  { absDmg: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

/**
 * Extra selection die faces.
 * Increases maximum action cost available next round.
 */
export const EXTRA_SELECT_DIE_FACES: FaceEffect[] = [
  { extraSelectNextRound: 2, cost: 1 },
  { extraSelectNextRound: 2, cost: 1 },
  { extraSelectNextRound: 2, cost: 1 },
  { extraSelectNextRound: 4, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];
