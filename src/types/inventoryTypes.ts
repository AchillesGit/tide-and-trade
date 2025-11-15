/**
 * Represents an item that can exist in the shop or inventory.
 */
export interface Item {
  /** Unique item identifier */
  id: string;
  /** Display name of the item */
  name: string;
  /**
   * 2D matrix representing the item's footprint on the grid.
   * 1 = occupied cell, 0 = empty.
   */
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
