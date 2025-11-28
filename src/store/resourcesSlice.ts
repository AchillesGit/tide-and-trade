import type { StateCreator } from "zustand";

/** Simple resource state for tracking player gold. */
export interface ResourceState {
  /** Current amount of gold */
  gold: number;
  /**
   * Increase gold.
   * @param amount - Amount to add
   */
  addGold: (amount: number) => void;
  /**
   * Decrease gold.
   * @param amount - Amount to remove
   */
  removeGold: (amount: number) => void;
}

/** Creates the resource slice for managing gold. */
export const createResourceSlice: StateCreator<ResourceState> = (set) => ({
  gold: 10,
  addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
  removeGold: (amount) => set((state) => ({ gold: state.gold - amount })),
});
