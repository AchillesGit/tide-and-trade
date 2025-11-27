import type { Dice, FaceEffect, RollResult } from "../types/battleTypes";

export function rollFace(faces: FaceEffect[]): FaceEffect {
  const idx = Math.floor(Math.random() * faces.length);
  return faces[idx];
}

export function rollAll(diceList: Dice[]): RollResult[] {
  return diceList.map((d) => ({ id: d.id, face: rollFace(d.faces) }));
}

export function createDie(faces: FaceEffect[]): Dice {
  return { id: Math.random().toString(36).slice(2), faces };
}
