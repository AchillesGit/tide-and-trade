import generateMap from "../util/mapHelper";

import type { StateCreator } from "zustand";

import type { MapData } from "../types/mapTypes";

export interface MapState {
  /** Generated map layout including levels, nodes, and edges. */
  mapData: MapData;
  /** The ID of the node the player is currently located on. */
  currentNodeId: string | null;
  /**
   * Updates the player's current node ID.
   * @param id - The ID of the node to set as current.
   */
  setCurrentNodeId: (id: string) => void;
}

/** Creates the Zustand map slice containing map data and navigation state. */
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
