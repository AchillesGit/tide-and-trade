import { createDie } from "./battleHelper";
import { enemyDices } from "../blueprints/diceBlueprints";

import type { Dice, EnemyConfig, FaceEffect } from "../types/battleTypes";

/**
 * Randomly selects a die template from the predefined enemy dice.
 * Avoids loops and generators by using Math.random and array indexing.
 */
const getRandomEnemyDieFaces = (): FaceEffect[] => {
  const idx = Math.floor(Math.random() * enemyDices.length);
  return enemyDices[idx].faces;
};

export function generateEnemyForLevel(level: number): EnemyConfig {
  const lvl = Math.max(1, Math.floor(level));

  const diceCount = Math.ceil(lvl / 2);

  const enemyDice: Dice[] = Array.from({ length: diceCount }).map(() => {
    const faces = getRandomEnemyDieFaces();
    return createDie(faces);
  });

  const startingEnemyLife = 10 + lvl * 2;

  return { enemyDice, startingEnemyLife };
}

export default generateEnemyForLevel;
