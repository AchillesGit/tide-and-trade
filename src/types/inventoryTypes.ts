/** Rarity of an item. 1 = common, 5 = extremely rare. */
export type ItemRarity = 0 | 1 | 2 | 3 | 4 | 5;

/** Item categories. Extend as needed. */
export type ItemCategory = "white" | "green" | "blue" | "violet" | "yellow";

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
}

/** Fully resolved item for usage in UI / logic. Combines blueprint data and instance data. */
export type Item = ItemBlueprint & ItemInstance;
