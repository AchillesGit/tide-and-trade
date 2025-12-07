import generateMap from "../util/mapHelper";

import type { StateCreator } from "zustand";

import type { MapData, Node } from "../types/mapTypes";

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
  /**
   * Returns the currently selected node.
   * @returns The current node object, or null if no node is selected.
   */
  getCurrentNode: () => Node | null;
}

/** Creates the Zustand map slice containing map data and navigation state. */
export const createMapSlice: StateCreator<MapState> = (set, get) => ({
  mapData: generateMap(),
  currentNodeId: null,

  setCurrentNodeId: (id: string) =>
    set(
      () =>
        ({
          currentNodeId: id,
        }) satisfies Partial<MapState>,
    ),

  getCurrentNode: () => {
    const { mapData, currentNodeId } = get();
    if (!currentNodeId) return null;

    const node = mapData.levels
      .flatMap((level) => level)
      .find((n) => n.id === currentNodeId);

    return node ?? null;
  },
});
