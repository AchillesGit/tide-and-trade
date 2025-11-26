import type { StateCreator } from "zustand";

/** Simple resource state for tracking player gold. */
export interface ShipHpState {
  /** Current amount of HP of the ship */
  currentHp: number;
  maxHp: number;
  /**
   * Increase current HP.
   * @param amount - Amount to add
   */
  addCurrentHP: (amount: number) => void;
  /**
   * Decrease current HP.
   * @param amount - Amount to remove
   */
  removeCurrentHP: (amount: number) => void;
}

/** Creates the resource slice for managing gold. */
export const createShipHpSlice: StateCreator<ShipHpState> = (set) => ({
  currentHp: 500,
  maxHp: 1000,
  addCurrentHP: (amount) =>
    set((state) => ({ currentHp: state.currentHp + amount })),
  removeCurrentHP: (amount) =>
    set((state) => ({ currentHp: state.currentHp - amount })),
});
