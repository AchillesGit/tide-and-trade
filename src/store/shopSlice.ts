import { mockShopGrid, mockShopItems } from "../mock/inventoryMockData";
import { fillInventoryGrid } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Item } from "../types/inventoryTypes";

export interface ShopState {
  shopGrid: number[][];
  shopItems: Item[];
  addShopItem: (item: Item) => void;
  removeItem: (itemId: string) => Item | null;
}

export const createShopSlice: StateCreator<ShopState> = (set, get) => ({
  shopGrid: fillInventoryGrid(mockShopItems, mockShopGrid),
  shopItems: mockShopItems,

  addShopItem: (item) =>
    set((state) => ({
      shopItems: [...state.shopItems, item],
    })),

  removeItem: (itemId) => {
    const item = get().shopItems.find((it) => it.id === itemId) ?? null;
    set((state) => ({
      shopItems: state.shopItems.filter((it) => it.id !== itemId),
    }));
    return item;
  },
});
