import { create } from "zustand";

interface ResourcesState {
  gold: number;
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
}

const useResourcesStore = create<ResourcesState>((set) => ({
  gold: 1000,
  addGold: (amount) =>
    set((state): Partial<ResourcesState> => ({ gold: state.gold + amount })),
  removeGold: (amount) =>
    set((state): Partial<ResourcesState> => ({ gold: state.gold - amount })),
}));

export default useResourcesStore;
