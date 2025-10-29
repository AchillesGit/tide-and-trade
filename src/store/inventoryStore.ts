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

const mockItem2: Item = {
  id: "item-002",
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

function getInventoryAsTwoDArray(): number[][] {
  const inventory = useInventoryStore.getState().itemRegistry;
  const rows = useInventoryStore.getState().inventoryGrid.length;
  const cols = useInventoryStore.getState().inventoryGrid[0].length;

  const grid: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  inventory.forEach(({ item, position }) => {
    item.space.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === 1) {
          const gridRow = position.row + rIdx - 2;
          const gridCol = position.col + cIdx - 2;
          if (gridRow < rows && gridCol < cols) {
            grid[gridRow][gridCol] = 1;
          }
        }
      });
    });
  });

  return grid;
}

function isPositionValid(
  newPosition: { row: number; col: number },
  space: number[][]
): boolean {
  const inventoryGrid = getInventoryAsTwoDArray();
  for (let rIdx = 0; rIdx < space.length; rIdx++) {
    for (let cIdx = 0; cIdx < space[rIdx].length; cIdx++) {
      if (space[rIdx][cIdx] === 1) {
        const gridRow = newPosition.row + rIdx - 2;
        const gridCol = newPosition.col + cIdx - 2;
        if (
          gridRow < 0 ||
          gridCol < 0 ||
          gridRow >= inventoryGrid.length ||
          gridCol >= inventoryGrid[0].length ||
          inventoryGrid[gridRow][gridCol] === 1
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

interface ItemPosition {
  item: Item;
  position: { row: number; col: number };
}

interface InventoryState {
  inventoryGrid: number[][];
  itemRegistry: ItemPosition[];
  grabbedItem: ItemPosition | null;
  grabItem: (itemId: string) => void;
  releaseItem: (position: { row: number; col: number }) => void;
  addItem: (item: ItemPosition) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  inventoryGrid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  itemRegistry: [
    { item: mockItem, position: { row: 3, col: 3 } },
    { item: mockItem2, position: { row: 3, col: 5 } },
  ],
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

      if (!isPositionValid(position, state.grabbedItem.item.space)) {
        return {
          itemRegistry: [...state.itemRegistry, state.grabbedItem],
          grabbedItem: null,
        };
      }

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
