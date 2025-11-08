import { create } from "zustand";
import {
  fillInventoryGrid,
  isPositionValid,
  rotateMatrix,
} from "../util/gridHelper";
import type {
  Degree,
  Direction,
  Item,
  Position,
} from "../types/inventoryTypes";
import {
  mockInventoryGrid,
  mockInventoryItems,
} from "../mock/inventoryMockData";

interface InventoryState {
  inventoryGrid: number[][];
  items: Item[];
  grabbedItem: Item | null;
  initialGrabbedItem: Item | null;
  grabItemFromShop: (item: Item | null) => void;
  grabItem: (itemId: string) => void;
  releaseItem: (
    position: Position,
    relativeX: number,
    relativeY: number
  ) => void;
  rotateItem: (direction: Direction) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  inventoryGrid: fillInventoryGrid(mockInventoryItems, mockInventoryGrid),
  items: mockInventoryItems,
  grabbedItem: null,
  initialGrabbedItem: null,

  grabItemFromShop: (item) =>
    set({ grabbedItem: item, initialGrabbedItem: item }),
  grabItem: (itemId: string) =>
    set((state) => ({
      grabbedItem: state.items.find((ir) => ir.id === itemId),
      items: state.items.filter((ir) => ir.id !== itemId),
      initialGrabbedItem: state.items.find((ir) => ir.id === itemId),
      inventoryGrid: fillInventoryGrid(
        state.items.filter((ir) => ir.id !== itemId),
        state.inventoryGrid
      ),
    })),

  rotateItem: (direction: Direction) => {
    set((state) => {
      if (!state.grabbedItem) return {};
      const rotatedSpace = rotateMatrix(state.grabbedItem.space, direction);
      const rotatedItem = {
        ...state.grabbedItem,
        space: rotatedSpace,
        direction: (direction === "left"
          ? (state.grabbedItem.direction + 270) % 360
          : (state.grabbedItem.direction + 90) % 360) as Degree,
      };
      return {
        grabbedItem: rotatedItem,
      };
    });
  },

  releaseItem: (targetCell: Position, relativeX: number, relativeY: number) =>
    set((state) => {
      if (!state.grabbedItem || !state.initialGrabbedItem) return {};

      const itemHeight = state.grabbedItem.space.length;
      const itemWidth = state.grabbedItem.space[0].length;

      /** Snap to grid  */
      if (itemHeight % 2 === 0 && relativeY < 25) targetCell.row -= 1;
      if (itemWidth % 2 === 0 && relativeX < 25) targetCell.col -= 1;

      const newPosition = {
        row: Math.floor(targetCell.row - itemHeight / 2) + 1,
        col: Math.floor(targetCell.col - itemWidth / 2) + 1,
      };

      if (
        !isPositionValid(newPosition, state.inventoryGrid, state.grabbedItem)
      ) {
        if (state.grabbedItem.belongsToShop) {
          return {
            items: [...state.items],
            grabbedItem: null,
            initialGrabbedItem: null,
          };
        } else {
          return {
            items: [...state.items, state.initialGrabbedItem],
            grabbedItem: null,
            initialGrabbedItem: null,
          };
        }
      }

      if (state.grabbedItem.belongsToShop) {
      }

      const releasedItem: Item = {
        ...state.grabbedItem,
        position: newPosition,
        belongsToShop: false,
      };

      const updatedRegistry = [...state.items, releasedItem];

      state.inventoryGrid = fillInventoryGrid(
        updatedRegistry,
        state.inventoryGrid
      );

      return {
        items: [...updatedRegistry],
        grabbedItem: null,
        initialGrabbedItem: null,
      };
    }),
}));
export default useInventoryStore;
