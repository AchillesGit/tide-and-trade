import {
  mockInventoryGrid,
  mockInventoryItems,
} from "../mock/inventoryMockData";
import { fillInventoryGrid, isPositionValid } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Item, Position } from "../types/inventoryTypes";

export interface InventoryState {
  inventoryGrid: number[][];
  inventoryItems: Item[];
  removeInventoryItem: (itemId: string) => void;
  addInventoryItem: (item: Item) => void;
  storeItem: (
    item: Item,
    position: Position,
    relativeX: number,
    relativeY: number,
  ) => boolean;
}

export const createInventorySlice: StateCreator<InventoryState> = (
  set,
  get,
) => ({
  inventoryGrid: fillInventoryGrid(mockInventoryItems, mockInventoryGrid),
  inventoryItems: mockInventoryItems,

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
    const filteredItems = get().inventoryItems.filter((i) => i.id !== itemId);
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

    const adjustedTarget = {
      row: targetCell.row - (itemHeight % 2 === 0 && relativeY < 25 ? 1 : 0),
      col: targetCell.col - (itemWidth % 2 === 0 && relativeX < 25 ? 1 : 0),
    };

    const newPosition = {
      row: Math.floor(adjustedTarget.row - itemHeight / 2) + 1,
      col: Math.floor(adjustedTarget.col - itemWidth / 2) + 1,
    };

    if (!isPositionValid(newPosition, get().inventoryGrid, item)) {
      return false;
    }

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
