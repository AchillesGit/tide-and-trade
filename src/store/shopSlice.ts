import { mockShopGrid, mockShopItems } from "../mock/inventoryMockData";
import { fillInventoryGrid } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Item, ItemInstance } from "../types/inventoryTypes";

/** Zustand slice for managing shop inventory and grid layout. */
export interface ShopState {
  /** 2D grid representing shop item placement */
  shopGrid: number[][];
  /** All items currently sold in the shop */
  shopItems: ItemInstance[];
  /**
   * Add a new item to the shop.
   * @param item - Item to add
   */
  addShopItem: (item: Item) => void;
  /**
   * Remove an item from the shop by ID.
   * @param itemId - Target item identifier
   */
  removeShopItem: (itemId: string) => void;
}

/** Creates the shop slice: items for sale and their grid representation. */
export const createShopSlice: StateCreator<ShopState> = (set) => ({
  shopGrid: fillInventoryGrid(mockShopItems, mockShopGrid),
  shopItems: mockShopItems,

  addShopItem: (item) =>
    set(
      (state) =>
        ({
          shopItems: [...state.shopItems, item],
        }) satisfies Partial<ShopState>,
    ),

  removeShopItem: (itemId) => {
    set(
      (state) =>
        ({
          shopItems: state.shopItems.filter((it) => it.instanceId !== itemId),
        }) satisfies Partial<ShopState>,
    );
  },
});
