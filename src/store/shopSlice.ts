import { mockShopGrid, mockShopItems } from "../mock/inventoryMockData";
import { fillInventoryGrid } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Item } from "../types/inventoryTypes";

export interface ShopState {
  shopGrid: number[][];
  shopItems: Item[];
  addShopItem: (item: Item) => void;
  removeShopItem: (itemId: string) => void;
}

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
          shopItems: state.shopItems.filter((it) => it.id !== itemId),
        }) satisfies Partial<ShopState>,
    );
  },
});
