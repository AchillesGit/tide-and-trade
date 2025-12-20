import type { StateCreator } from "zustand";

/** Passive abilities like luck, crit chance, etc. */
export interface LuckSlice {
  /** Luck value (0 = no bonus) */
  luck: number;

  /** Increase luck */
  addLuck: (amount: number) => void;

  /** Decrease luck */
  removeLuck: (amount: number) => void;
}

/** Creates the slice for passive abilities */
export const createLuckSlice: StateCreator<LuckSlice> = (set) => ({
  luck: 0,

  addLuck: (amount) => set((state) => ({ luck: state.luck + amount })),

  removeLuck: (amount) =>
    set((state) => ({ luck: Math.max(0, state.luck - amount) })),
});
