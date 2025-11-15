import { rotateMatrix } from "../util/gridHelper";

import type { StateCreator } from "zustand";

import type { Degree, Direction, Item } from "../types/inventoryTypes";

/** Zustand slice for managing the currently grabbed (dragged) item. */
export interface GrabbedItemState {
  /** Item currently being dragged, or null if none */
  grabbedItem: Item | null;
  /** Snapshot of the item at the moment it was first grabbed */
  initialGrab: Item | null;
  /**
   * Set or clear the currently grabbed item.
   * @param item - Item to grab, or null to release
   */
  setGrabbedItem: (item: Item | null) => void;
  /**
   * Rotate the grabbed item in the given direction.
   * @param dir - Rotation direction ("left" or "right")
   */
  rotateItem: (dir: Direction) => void;
}

/** Creates the slice for item-grab and rotation logic. */
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
