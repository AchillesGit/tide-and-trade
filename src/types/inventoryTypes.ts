/**
 * Rarity of an item. 1 = common, 5 = extremely rare.
 */
export type ItemRarity = 1 | 2 | 3 | 4 | 5;

/**
 * Merge level of an item. 1 = base, 5 = max.
 */
export type ItemLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Item categories. Extend as needed.
 */
export type ItemCategory = "weapon" | "commodity";

/**
 * Represents an item that can exist in the shop or inventory.
 */
export interface Item {
  /** Unique item identifier */
  id: string;

  /** Display name of the item */
  name: string;

  /** 2D matrix representing the item's footprint on the grid. 1 = occupied cell, 0 = empty. */
  space: number[][];

  /** Asset path */
  image: string;

  /** Current rotation angle of the item */
  direction: Degree;

  /** Top-left position of the item inside the grid */
  position: Position;

  /** Where the item originated from (shop or inventory) */
  origin: ItemOrigin;

  /** Base gold value (buy/sell price) */
  baseValue: number;

  /** How rare this item is (1–5) */
  rarity: ItemRarity;

  /** Merge level of the item (1–5) */
  level: ItemLevel;

  /** One or more categories this item belongs to */
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
