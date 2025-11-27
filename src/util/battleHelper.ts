import type { Dice, FaceEffect, RollResult } from "../types/battleTypes";

/**
 * Rolls a single random face from the provided list of faces.
 *
 * @param faces - All possible faces a die can have.
 * @returns The randomly selected face.
 */
export function rollFace(faces: FaceEffect[]): FaceEffect {
  const idx = Math.floor(Math.random() * faces.length);
  return faces[idx];
}

/**
 * Rolls all given dice once.
 *
 * @param diceList - Array of dice to roll.
 * @returns A list of roll results containing die id and rolled face.
 */
export function rollAll(diceList: Dice[]): RollResult[] {
  return diceList.map((d) => ({ id: d.id, face: rollFace(d.faces) }));
}

/**
 * Creates a new die with a random string id.
 *
 * @param faces - The faces the die can land on when rolled.
 * @returns A new {@link Dice} instance.
 */
export function createDie(faces: FaceEffect[]): Dice {
  return { id: Math.random().toString(36).slice(2), faces };
}
