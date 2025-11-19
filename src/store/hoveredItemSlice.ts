import type { StateCreator } from "zustand";

import type { Item } from "../types/inventoryTypes";

/** Zustand slice for managing the currently hovered item. */
export interface HoveredItemState {
  /** Item currently being dragged, or null if none */
  hoveredItem: Item | null;
  /**
   * Set or clear the currently Hovered item.
   * @param hoveredItem - Item that was hovered, or null to reset
   */
  setHoveredItem: (hoveredItem: Item | null) => void;
}

/** Creates the slice for the currently hovered Item. */
export const createHoveredItemSlice: StateCreator<HoveredItemState> = (
  set,
) => ({
  hoveredItem: null,

  setHoveredItem: (hoveredItem) =>
    set(
      (state) =>
        ({
          ...state,
          hoveredItem,
        }) satisfies Partial<HoveredItemState>,
    ),
});
