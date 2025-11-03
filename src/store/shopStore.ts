import { create } from "zustand";
import type { ItemRegistry } from "../types/inventoryTypes";
import {
  mockInventoryGrid,
  mockShopItemRegistry,
} from "../mock/inventoryMockData";

interface ShopState {
  shopGrid: number[][];
  itemRegistry: ItemRegistry[];
  buyItem: (itemId: string) => void;
  sellItem: (item: ItemRegistry) => void;
}

const useShopStore = create<ShopState>((set) => ({
  shopGrid: mockInventoryGrid,
  itemRegistry: mockShopItemRegistry,

  buyItem: (itemId: string) =>
    set((state) => ({
      grabbedItem: state.itemRegistry.find((ir) => ir.item.id === itemId),
      itemRegistry: state.itemRegistry.filter((ir) => ir.item.id !== itemId),
    })),
  sellItem: (item: ItemRegistry) =>
    set((state) => ({
      itemRegistry: [...state.itemRegistry, item],
    })),
}));

export default useShopStore;
