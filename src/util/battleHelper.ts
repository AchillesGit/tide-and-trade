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

/**
 * Checks if a face has no useful effect.
 * @param f - Face to evaluate.
 * @returns True if dud.
 */
const isDud = (f: FaceEffect): boolean =>
  !(
    f.attack ??
    f.defense ??
    f.absDmg ??
    f.attackMultiplier ??
    f.defenseMultiplier ??
    f.extraSelectNextRound
  );

/**
 * Computes usefulness score of a face.
 * @param f - Face to score.
 * @returns Numeric score.
 */
const faceScore = (f: FaceEffect): number =>
  (f.attack ?? 0) * 10 +
  (f.defense ?? 0) * 5 +
  (f.absDmg ?? 0) * 15 +
  (f.attackMultiplier ?? 1 - 1) * 30 +
  (f.defenseMultiplier ?? 1 - 1) * 20 +
  (f.extraSelectNextRound ?? 0) * 3;

/**
 * Sorts rolls so strong faces are first and duds last.
 * @param rolls - Roll results to sort.
 * @returns Sorted roll results.
 */
export const sortRollResults = (rolls: RollResult[]): RollResult[] =>
  [...rolls].sort((a, b) => {
    const aDud = isDud(a.face);
    const bDud = isDud(b.face);

    if (aDud && !bDud) return 1;
    if (!aDud && bDud) return -1;

    return faceScore(b.face) - faceScore(a.face);
  });
