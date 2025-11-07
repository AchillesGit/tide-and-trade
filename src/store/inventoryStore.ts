import { create } from "zustand";
import { isPositionValid, rotateMatrix } from "../util/gridHelper";
import type {
  Degree,
  Direction,
  ItemRegistry,
  Position,
} from "../types/inventoryTypes";
import {
  mockInventoryGrid,
  mockInventoryItemRegistry,
} from "../mock/inventoryMockData";

interface InventoryState {
  inventoryGrid: number[][];
  itemRegistry: ItemRegistry[];
  grabbedItem: ItemRegistry | null;
  setGrabbedItem: (item: ItemRegistry | null) => void;
  grabItem: (itemId: string) => void;
  releaseItem: (
    position: Position,
    relativeX: number,
    relativeY: number
  ) => void;
  rotateItem: (direction: Direction) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  inventoryGrid: mockInventoryGrid,
  itemRegistry: mockInventoryItemRegistry,
  grabbedItem: null,

  setGrabbedItem: (item) => set({ grabbedItem: item }),
  grabItem: (itemId: string) =>
    set((state) => ({
      grabbedItem: state.itemRegistry.find((ir) => ir.item.id === itemId),
      itemRegistry: state.itemRegistry.filter((ir) => ir.item.id !== itemId),
    })),

  rotateItem: (direction: Direction) => {
    set((state) => {
      if (!state.grabbedItem) return {};
      const rotatedSpace = rotateMatrix(
        state.grabbedItem.item.space,
        direction
      );
      const rotatedItem = {
        ...state.grabbedItem,
        item: {
          ...state.grabbedItem.item,
          space: rotatedSpace,
          direction: (direction === "left"
            ? (state.grabbedItem.item.direction + 270) % 360
            : (state.grabbedItem.item.direction + 90) % 360) as Degree,
        },
      };
      return {
        grabbedItem: rotatedItem,
      };
    });
  },

  releaseItem: (targetCell: Position, relativeX: number, relativeY: number) =>
    set((state) => {
      if (!state.grabbedItem) return {};

      if (
        !isPositionValid(targetCell, state.inventoryGrid, state.grabbedItem)
      ) {
        return {
          itemRegistry: [...state.itemRegistry, state.grabbedItem],
          grabbedItem: null,
        };
      }

      const itemHeight = state.grabbedItem.item.space.length;
      const itemWidth = state.grabbedItem.item.space[0].length;

      /** Snap to grid  */
      if (itemHeight % 2 === 0 && relativeY < 25) targetCell.row -= 1;
      if (itemWidth % 2 === 0 && relativeX < 25) targetCell.col -= 1;

      const newPosition = {
        row: Math.floor(targetCell.row - itemHeight / 2) + 1,
        col: Math.floor(targetCell.col - itemWidth / 2) + 1,
      };

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
