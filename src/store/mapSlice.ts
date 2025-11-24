import generateMap from "../util/mapHelper";

import type { StateCreator } from "zustand";

import type { MapData } from "../types/mapTypes";

export interface MapState {
  mapData: MapData;
}

export const createMapSlice: StateCreator<MapState> = () => ({
  mapData: generateMap(),
});
