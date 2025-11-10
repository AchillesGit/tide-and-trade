import type { StateCreator } from "zustand";

export interface ResourceState {
  gold: number;
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
}

export const createResourceSlice: StateCreator<ResourceState> = (set) => ({
  gold: 1000,
  addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
  removeGold: (amount) => set((state) => ({ gold: state.gold - amount })),
});
