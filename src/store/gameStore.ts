/* eslint-disable no-plusplus */
import { create } from "zustand";

import { createGrabbedItemSlice } from "./grabbedItemSlice";
import { createHoveredItemSlice } from "./hoveredItemSlice";
import { createInventorySlice } from "./inventorySlice";
import { createResourceSlice } from "./resourcesSlice";
import { createShopSlice } from "./shopSlice";

import type { GrabbedItemState } from "./grabbedItemSlice";
import type { HoveredItemState } from "./hoveredItemSlice";
import type { InventoryState } from "./inventorySlice";
import type { ResourceState } from "./resourcesSlice";
import type { ShopState } from "./shopSlice";

/**
 * Combined game state including inventory, shop, resources,
 * grabbed item handling, and high-level UI interactions.
 */
export type GameState = ShopState &
  InventoryState &
  ResourceState &
  GrabbedItemState &
  HoveredItemState & {
    /** Handle right-click: return grabbed item to its original source. */
    onRightClick: () => void;
  };

/** Main Zustand store combining all slices and high-level click handlers. */
export const useGameStore = create<GameState>((...args) => ({
  ...createShopSlice(...args),
  ...createInventorySlice(...args),
  ...createResourceSlice(...args),
  ...createGrabbedItemSlice(...args),
  ...createHoveredItemSlice(...args),

  onRightClick: () => {
    const {
      initialGrab,
      addInventoryItem,
      addShopItem,
      setGrabbedItem,
      addGold,
    } = useGameStore.getState();
    if (initialGrab?.origin === "inventory") {
      addInventoryItem(initialGrab);
    } else if (initialGrab?.origin === "shop") {
      addShopItem(initialGrab);
      addGold(initialGrab.baseValue);
    }
    setGrabbedItem(null);
  },
}));
