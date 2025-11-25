import generateMap from "../util/mapHelper";

import type { StateCreator } from "zustand";

import type { MapData } from "../types/mapTypes";

export interface MapState {
  mapData: MapData;
  currentNodeId: string | null;
  setCurrentNodeId: (id: string) => void;
}

export const createMapSlice: StateCreator<MapState> = (set) => ({
  mapData: generateMap(),
  currentNodeId: null,

  setCurrentNodeId: (id: string) =>
    set(
      () =>
        ({
          currentNodeId: id,
        }) satisfies Partial<MapState>,
    ),
});
