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
  addItem: (item: ItemPosition) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  cols: 10,
  rows: 6,
  itemRegistry: [{ item: mockItem, position: { row: 3, col: 3 } }],

  addItem: (item: ItemPosition) =>
    set((state) => ({
      itemRegistry: [...state.itemRegistry, item],
    })),
}));
export default useInventoryStore;
