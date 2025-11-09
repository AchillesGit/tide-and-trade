import { create } from "zustand";

import {
  mockInventoryGrid,
  mockInventoryItems,
} from "../mock/inventoryMockData";
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
    relativeY: number,
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
        state.inventoryGrid,
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

      /** Snap to grid */
      const adjustedTarget = {
        row: targetCell.row - (itemHeight % 2 === 0 && relativeY < 25 ? 1 : 0),
        col: targetCell.col - (itemWidth % 2 === 0 && relativeX < 25 ? 1 : 0),
      };

      const newPosition = {
        row: Math.floor(adjustedTarget.row - itemHeight / 2) + 1,
        col: Math.floor(adjustedTarget.col - itemWidth / 2) + 1,
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
        }
        return {
          items: [...state.items, state.initialGrabbedItem],
          grabbedItem: null,
          initialGrabbedItem: null,
        };
      }

      const releasedItem: Item = {
        ...state.grabbedItem,
        position: newPosition,
        belongsToShop: false,
      };

      const updatedRegistry = [...state.items, releasedItem];
      const updatedGrid = fillInventoryGrid(
        updatedRegistry,
        state.inventoryGrid,
      );

      return {
        items: [...updatedRegistry],
        inventoryGrid: updatedGrid,
        grabbedItem: null,
        initialGrabbedItem: null,
      };
    }),
}));
export default useInventoryStore;
