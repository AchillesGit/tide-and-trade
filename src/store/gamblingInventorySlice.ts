import type { StateCreator } from "zustand";

import type { Item } from "../types/inventoryTypes";

/** Zustand slice for managing gambling inventory. */
export interface GamblingInventoryState {
  /** All items currently available in the gambling inventory */
  gamblingItems: Item[];

  /** Adds an item to the gambling inventory */
  addGamblingItem: (item: Item) => void;

  /** Removes an item by ID */
  removeGamblingItem: (itemId: string) => void;
}

/** Creates the gambling inventory slice */
export const createGamblingInventorySlice: StateCreator<
  GamblingInventoryState
> = (set) => ({
  gamblingItems: [],

  addGamblingItem: (item) =>
    set((state) => ({
      gamblingItems: [...state.gamblingItems, item],
    })),

  removeGamblingItem: (itemId) =>
    set((state) => ({
      gamblingItems: state.gamblingItems.filter(
        (it) => it.instanceId !== itemId,
      ),
    })),
});
