import { create } from "zustand";

import { createGrabbedItemSlice } from "./grabbedItemSlice";
import { createInventorySlice } from "./inventorySlice";
import { createResourceSlice } from "./resourcesSlice";
import { createShopSlice } from "./shopSlice";

import type { GrabbedItemState } from "./grabbedItemSlice";
import type { InventoryState } from "./inventorySlice";
import type { ResourceState } from "./resourcesSlice";
import type { ShopState } from "./shopSlice";
import type { Item, Position } from "../types/inventoryTypes";

export type GameState = ShopState &
  InventoryState &
  ResourceState &
  GrabbedItemState & {
    onClickInventoryItem: (item: Item) => void;
    onClickShopItem: (item: Item) => void;
    onRightClick: () => void;
    onClickInventoryCell: (
      pos: Position,
      relativeX: number,
      relativeY: number,
    ) => void;
  };

export const useGameStore = create<GameState>((...args) => ({
  ...createShopSlice(...args),
  ...createInventorySlice(...args),
  ...createResourceSlice(...args),
  ...createGrabbedItemSlice(...args),

  onClickInventoryItem: (item: Item) => {
    const { removeInventoryItem, setGrabbedItem } = useGameStore.getState();
    if (item) {
      setGrabbedItem({ ...item });
    }
    removeInventoryItem(item.id);
  },

  onClickShopItem: (item: Item) => {
    const { gold, setGrabbedItem, removeShopItem, removeGold } =
      useGameStore.getState();
    if (item && gold > item.baseValue) {
      setGrabbedItem({ ...item });
      removeGold(item.baseValue);
    }
    removeShopItem(item.id);
  },

  onClickInventoryCell: (targetCell, relativeX, relativeY) => {
    const { grabbedItem, storeItem, setGrabbedItem } = useGameStore.getState();
    if (!grabbedItem) return;

    const placementValid = storeItem(
      grabbedItem,
      targetCell,
      relativeX,
      relativeY,
    );

    if (placementValid) setGrabbedItem(null);
  },

  onRightClick: () => {
    const { initialGrab, addInventoryItem, addShopItem, setGrabbedItem } =
      useGameStore.getState();
    if (initialGrab?.origin === "inventory") {
      addInventoryItem(initialGrab);
    } else if (initialGrab?.origin === "shop") {
      addShopItem(initialGrab);
    }
    setGrabbedItem(null);
  },
}));
