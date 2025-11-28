import { mockInventoryGrid } from "../mock/inventoryMockData";
import { fillInventoryGrid, isPositionValid } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Item, ItemInstance, Position } from "../types/inventoryTypes";

/** Zustand slice state for managing the inventory grid and items. */
export interface InventoryState {
  /** 2D grid representing occupied (item ID) or empty (0) cells */
  inventoryGrid: number[][];
  /** All items currently stored in the inventory */
  inventoryItems: ItemInstance[];
  /**
   * Remove an item from inventory by its ID.
   * @param itemId - Target item identifier
   */
  removeInventoryItem: (itemId: string) => void;
  /**
   * Add a new item into inventory (top-level, not positioned).
   * @param item - Item to add
   */
  addInventoryItem: (item: Item) => void;
  /**
   * Place an item into the grid at a given position.
   * @param item - Item being placed
   * @param position - Target inventory cell
   * @param relativeX - Pointer offset inside the target cell (0–50)
   * @param relativeY - Pointer offset inside the target cell (0–50)
   * @returns Whether placement was successful
   */
  storeItem: (
    item: Item,
    position: Position,
    relativeX: number,
    relativeY: number,
  ) => boolean;
}

/**
 * Creates the inventory slice: managing grid state, adding/removing items,
 * and validating/placing items inside the inventory grid.
 */
export const createInventorySlice: StateCreator<InventoryState> = (
  set,
  get,
) => ({
  inventoryGrid: fillInventoryGrid([], mockInventoryGrid),
  inventoryItems: [],

  addInventoryItem: (item) =>
    set(
      (state) =>
        ({
          inventoryItems: [...state.inventoryItems, item],
          inventoryGrid: fillInventoryGrid(
            [...state.inventoryItems, item],
            state.inventoryGrid,
          ),
        }) satisfies Partial<InventoryState>,
    ),

  removeInventoryItem: (itemId) => {
    const filteredItems = get().inventoryItems.filter(
      (i) => i.instanceId !== itemId,
    );
    set(
      (state) =>
        ({
          inventoryItems: filteredItems,
          inventoryGrid: fillInventoryGrid(filteredItems, state.inventoryGrid),
        }) satisfies Partial<InventoryState>,
    );
  },

  storeItem: (item, targetCell, relativeX, relativeY) => {
    const itemHeight = item.space.length;
    const itemWidth = item.space[0].length;

    // Adjust to handle even-sized items relative to cell center
    const adjustedTarget = {
      row: targetCell.row - (itemHeight % 2 === 0 && relativeY < 25 ? 1 : 0),
      col: targetCell.col - (itemWidth % 2 === 0 && relativeX < 25 ? 1 : 0),
    };

    // Convert to top-left item origin
    const newPosition = {
      row: Math.floor(adjustedTarget.row - itemHeight / 2) + 1,
      col: Math.floor(adjustedTarget.col - itemWidth / 2) + 1,
    };

    // Reject if item doesn't fit
    if (!isPositionValid(newPosition, get().inventoryGrid, item)) {
      return false;
    }

    // Position item in inventory
    const releasedItem: Item = {
      ...item,
      position: newPosition,
      origin: "inventory",
    };

    const updatedItems = [...get().inventoryItems, releasedItem];
    const updatedGrid = fillInventoryGrid(updatedItems, get().inventoryGrid);
    set(
      (state) =>
        ({
          ...state,
          inventoryItems: updatedItems,
          inventoryGrid: updatedGrid,
        }) satisfies Partial<InventoryState>,
    );

    return true;
  },
});
