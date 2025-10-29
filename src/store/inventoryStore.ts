import { create } from "zustand";

interface Item {
  id: string;
  name: string;
  space: number[][];
  image: string;
}

const mockItem: Item = {
  id: "item-001",
  name: "wheat",
  space: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  image: "goods/wheat.png",
};

interface ItemPosition {
  item: Item;
  position: { row: number; col: number };
}

interface InventoryState {
  cols: number;
  rows: number;
  itemRegistry: ItemPosition[];
  grabbedItem: ItemPosition | null;
  grabItem: (itemId: string) => void;
  releaseItem: (position: { row: number; col: number }) => void;
  addItem: (item: ItemPosition) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  cols: 10,
  rows: 6,
  itemRegistry: [{ item: mockItem, position: { row: 3, col: 3 } }],
  grabbedItem: null,

  addItem: (item: ItemPosition) =>
    set((state) => ({
      itemRegistry: [...state.itemRegistry, item],
    })),

  grabItem: (itemId: string) =>
    set((state) => ({
      grabbedItem: state.itemRegistry.find((ir) => ir.item.id === itemId),
      itemRegistry: state.itemRegistry.filter((ir) => ir.item.id !== itemId),
    })),

  releaseItem: (position: { row: number; col: number }) =>
    set((state) => {
      if (!state.grabbedItem) return {};
      const releasedItem = {
        ...state.grabbedItem,
        position,
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
