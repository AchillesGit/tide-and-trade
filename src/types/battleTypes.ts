/**
 * Describes the effect of a single die face.
 *
 * All fields are optional so that a face can represent different combinations
 * of attack, defense, multipliers, or special effects.
 */
export interface FaceEffect {
  /** Amount of attack this face contributes. */
  attack?: number;
  /** Amount of defense this face contributes. */
  defense?: number;
  /** Multiplier applied to total attack when this face is selected. */
  attackMultiplier?: number;
  /** Multiplier applied to total defense when this face is selected. */
  defenseMultiplier?: number;
  /** Absolute damage that ignores enemy defense. */
  absDmg?: number;
  /**
   * Additional action cost capacity granted for the next round
   * when this face is selected.
   */
  extraSelectNextRound?: number;
  /**
   * Action cost to select this face for the current round.
   * If omitted, a default of 1 is assumed in the logic.
   */
  cost?: number;
}

/**
 * A single die, identified by id and containing a set of faces.
 */
export interface Dice {
  /** Unique identifier for the die instance. */
  id: string;
  /** All possible faces the die can roll. */
  faces: FaceEffect[];
}

/**
 * Full dice pool for both player and enemy.
 */
export interface DiceState {
  /** Player's dice collection. */
  player: Dice[];
  /** Enemy's dice collection. */
  enemy: Dice[];
}

/**
 * Result of rolling a single die.
 */
export interface RollResult {
  /** The id of the die that was rolled. */
  id: string;
  /** The face that came up on this roll. */
  face: FaceEffect;
}

/**
 * Roll results for both sides for a single round.
 */
export interface RollsState {
  /** Player's roll results. */
  player: RollResult[];
  /** Enemy's roll results. */
  enemy: RollResult[];
}

/** Configuration object describing an enemy in battle. */
export interface EnemyConfig {
  /** The list of dice assigned to this enemy. */
  enemyDice: Dice[];

  /**
   * The initial amount of health the enemy starts with
   * at the beginning of the battle.
   */
  startingEnemyLife: number;
}
