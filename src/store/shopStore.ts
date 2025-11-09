import { create } from "zustand";

import useInventoryStore from "./inventoryStore";
import { mockInventoryGrid, mockShopItems } from "../mock/inventoryMockData";

import type { Item } from "../types/inventoryTypes";

interface ShopState {
  shopGrid: number[][];
  itemRegistry: Item[];
  buyItem: (itemId: string) => void;
  sellItem: (item: Item) => void;
}

const useShopStore = create<ShopState>((set, get) => ({
  shopGrid: mockInventoryGrid,
  itemRegistry: mockShopItems,

  buyItem: (itemId: string) => {
    const item = get().itemRegistry.find((ir) => ir.id === itemId);
    if (!item) return;
    set((state) => ({
      itemRegistry: state.itemRegistry.filter((ir) => ir.id !== itemId),
    }));

    const { grabItemFromShop } = useInventoryStore.getState();
    grabItemFromShop(item);
  },

  sellItem: (item: Item) =>
    set(
      (state): Partial<ShopState> => ({
        itemRegistry: [...state.itemRegistry, item],
      }),
    ),
}));

export default useShopStore;
