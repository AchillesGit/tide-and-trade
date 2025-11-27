export interface FaceEffect {
  attack?: number;
  defense?: number;
  attackMultiplier?: number;
  defenseMultiplier?: number;
  absDmg?: number;
  extraSelectNextRound?: number;
  cost?: number;
}

export interface Dice {
  id: string;
  faces: FaceEffect[];
}

export interface DiceState {
  player: Dice[];
  enemy: Dice[];
}

export interface RollResult {
  id: string;
  face: FaceEffect;
}

export interface RollsState {
  player: RollResult[];
  enemy: RollResult[];
}
