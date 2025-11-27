import type { FaceEffect } from "../types/battleTypes";

export const ATTACK_DIE_FACES: FaceEffect[] = [
  { attack: 1, cost: 1 },
  { attack: 1, cost: 1 },
  { attack: 1, cost: 1 },
  { attack: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

export const DEFENSE_DIE_FACES: FaceEffect[] = [
  { defense: 1, cost: 1 },
  { defense: 1, cost: 1 },
  { defense: 1, cost: 1 },
  { defense: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

export const HYBRID_DIE_FACES: FaceEffect[] = [
  { attack: 1, defense: 1, cost: 2 },
  { attack: 1, defense: 1, cost: 2 },
  { attack: 1, defense: 1, cost: 2 },
  { attack: 2, defense: 2, cost: 4 },
  { cost: 0 },
  { cost: 0 },
];

export const ENEMY_DIE_FACES: FaceEffect[] = [
  { attack: 1 },
  { attack: 1 },
  { defense: 1 },
];

export const MULTIPLY_ATTACK_DIE_FACES: FaceEffect[] = [
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

export const MULTIPLY_DEFENSE_DIE_FACES: FaceEffect[] = [
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

export const DAMAGE_DIE_FACES: FaceEffect[] = [
  { absDmg: 3, cost: 3 },
  { absDmg: 3, cost: 3 },
  { absDmg: 3, cost: 3 },
  { absDmg: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

export const EXTRA_SELECT_DIE_FACES: FaceEffect[] = [
  { extraSelectNextRound: 1, cost: 1 },
  { extraSelectNextRound: 1, cost: 1 },
  { extraSelectNextRound: 1, cost: 1 },
  { extraSelectNextRound: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];
