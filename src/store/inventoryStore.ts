import { create } from "zustand";
import { isPositionValid } from "../util/gridHelper";
import type { ItemRegistry, Position } from "../types/inventoryTypes";
import { mockInventoryGrid, mockItemRegistry } from "../mock/inventoryMockData";

interface InventoryState {
  inventoryGrid: number[][];
  itemRegistry: ItemRegistry[];
  grabbedItem: ItemRegistry | null;
  grabItem: (itemId: string) => void;
  releaseItem: (position: Position) => void;
  addItem: (item: ItemRegistry) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  inventoryGrid: mockInventoryGrid,
  itemRegistry: mockItemRegistry,
  grabbedItem: null,

  addItem: (item: ItemRegistry) =>
    set((state) => ({
      itemRegistry: [...state.itemRegistry, item],
    })),

  grabItem: (itemId: string) =>
    set((state) => ({
      grabbedItem: state.itemRegistry.find((ir) => ir.item.id === itemId),
      itemRegistry: state.itemRegistry.filter((ir) => ir.item.id !== itemId),
    })),

  releaseItem: (newPosition: Position) =>
    set((state) => {
      if (!state.grabbedItem) return {};

      if (!isPositionValid(newPosition)) {
        return {
          itemRegistry: [...state.itemRegistry, state.grabbedItem],
          grabbedItem: null,
        };
      }

      const releasedItem = {
        ...state.grabbedItem,
        position: newPosition,
      };
      const filteredRegistry = state.itemRegistry.filter(
        (ir) => ir.item.id !== state.grabbedItem?.item.id
      );
      return {
        itemRegistry: [...filteredRegistry, releasedItem],
        grabbedItem: null,
      };
    }),
}));
export default useInventoryStore;
