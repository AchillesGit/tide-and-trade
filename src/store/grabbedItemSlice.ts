import { rotateMatrix } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Degree, Direction, Item } from "../types/inventoryTypes";

export interface GrabbedItemState {
  grabbedItem: Item | null;
  initialGrab: Item | null;
  setGrabbedItem: (item: Item | null) => void;
  rotateItem: (dir: Direction) => void;
}

export const createGrabbedItemSlice: StateCreator<GrabbedItemState> = (
  set,
) => ({
  grabbedItem: null,
  initialGrab: null,

  setGrabbedItem: (item) =>
    set(
      (state) =>
        ({
          ...state,
          grabbedItem: item,
          initialGrab: item,
        }) satisfies Partial<GrabbedItemState>,
    ),

  rotateItem: (dir) =>
    set((state) => {
      if (!state.grabbedItem) return {};
      const rotatedSpace = rotateMatrix(state.grabbedItem.space, dir);
      return {
        grabbedItem: {
          ...state.grabbedItem,
          space: rotatedSpace,
          direction: (dir === "left"
            ? (state.grabbedItem.direction + 270) % 360
            : (state.grabbedItem.direction + 90) % 360) as Degree,
        },
      } satisfies Partial<GrabbedItemState>;
    }),
});
