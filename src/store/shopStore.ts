import { create } from "zustand";
import type { ItemRegistry } from "../types/inventoryTypes";
import {
  mockInventoryGrid,
  mockShopItemRegistry,
} from "../mock/inventoryMockData";
import useInventoryStore from "./inventoryStore";

interface ShopState {
  shopGrid: number[][];
  itemRegistry: ItemRegistry[];
  buyItem: (itemId: string) => void;
  sellItem: (item: ItemRegistry) => void;
}

const useShopStore = create<ShopState>((set, get) => ({
  shopGrid: mockInventoryGrid,
  itemRegistry: mockShopItemRegistry,

  buyItem: (itemId: string) => {
    const item = get().itemRegistry.find((ir) => ir.item.id === itemId);
    if (!item) return;
    set((state) => ({
      itemRegistry: state.itemRegistry.filter((ir) => ir.item.id !== itemId),
    }));

    const { grabItemFromShop } = useInventoryStore.getState();
    grabItemFromShop(item);
  },

  sellItem: (item: ItemRegistry) =>
    set((state) => ({
      itemRegistry: [...state.itemRegistry, item],
    })),
}));

export default useShopStore;
