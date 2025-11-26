/** Rarity of an item. 1 = common, 5 = extremely rare. */
export type ItemRarity = 1 | 2 | 3 | 4 | 5;

/** Merge level of an item. 1 = base, 5 = max. */
export type ItemLevel = 1 | 2 | 3 | 4 | 5;

/** Item categories. Extend as needed. */
export type ItemCategory = "weapon" | "commodity";

/** Allowed rotation angles in degrees */
export type Degree = 0 | 90 | 180 | 270;

/** A grid position (row/column index) */
export interface Position {
  row: number;
  col: number;
}

/** Rotation direction for an item */
export type Direction = "left" | "right";

/** Origin source of an item */
export type ItemOrigin = "shop" | "inventory";

/**
 * A blueprint defines the static properties of an item.
 * These never change per instance.
 */
export interface ItemBlueprint {
  /** Unique blueprint ID (e.g. "cannonBasic") */
  id: string;

  /** Display name */
  name: string;

  /** 2D footprint matrix */
  space: number[][];

  /** Asset path */
  image: string;

  /** Base gold value */
  baseValue: number;

  /** Rarity (1–5) */
  rarity: ItemRarity;

  /** One or more categories */
  categories: ItemCategory[];

  /** Firepower per level. Index corresponds to level - 1 (e.g. index 0 = level 1, index 4 = level 5). */
  firepower: number[];

  /** Attack speed per level */
  attackSpeed: number[];

  /** Critical hit chance per level (e.g. 0.15 = 15%) */
  criticalChance: number[];

  /** Critical hit damage multiplier per level (e.g. 1.5 = +50% damage) */
  criticalDamage: number[];

  /** Evasion chance per level (e.g. 0.10 = 10%) */
  evasionChance: number[];

  /** Ship HP increase per level */
  shipHpIncrease: number[];

  /** Armor value per level */
  armor: number[];
}

/**
 * A runtime instance of an item.
 * Contains dynamic data such as position, rotation, level, and a unique instance ID.
 */
export interface ItemInstance {
  /** Unique ID for this specific instance */
  instanceId: string;

  /** Reference to the blueprint ID */
  blueprintId: string;

  /** Rotation */
  direction: Degree;

  /** Grid position */
  position: Position;

  /** Origin: shop/inventory */
  origin: ItemOrigin;

  /** Merge level (1–5) */
  level: ItemLevel;
}

/** Fully resolved item for usage in UI / logic. Combines blueprint data and instance data. */
export type Item = ItemBlueprint & ItemInstance;

export interface Ship {
  /** Name of the ship */
  name: string;

  /** Current HP */
  currentHp: number;

  /** Maximum HP */
  maxHp: number;

  /** Firepower per level. Index corresponds to level - 1 (e.g. index 0 = level 1, index 4 = level 5). */
  firepower: number;

  /** Attack speed per level */
  attackSpeed: number;

  /** Critical hit chance per level (e.g. 0.15 = 15%) */
  criticalChance: number;

  /** Critical hit damage multiplier per level (e.g. 1.5 = +50% damage) */
  criticalDamage: number;

  /** Armor value per level */
  armor: number;

  /** Evasion chance per level (e.g. 0.10 = 10%) */
  evasionChance: number;

  // TODO: Do we need this?
  gold: number;
}

export const baseShipValues: Ship = {
  gold: 0,
  armor: 10,
  attackSpeed: 1,
  criticalChance: 0,
  criticalDamage: 20,
  evasionChance: 5,
  firepower: 10,
  currentHp: 1000,
  name: "Battle Reiner",
  maxHp: 1000,
};
