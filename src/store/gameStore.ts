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

/**
 * Combined game state including inventory, shop, resources,
 * grabbed item handling, and high-level UI interactions.
 */
export type GameState = ShopState &
  InventoryState &
  ResourceState &
  GrabbedItemState & {
    /**
     * When clicking an item inside inventory:
     * pick it up and remove it from inventory.
     *
     * @param item - Inventory item that was clicked
     */
    onClickInventoryItem: (item: Item) => void;
    /**
     * When clicking an item inside the shop:
     * buy the item if enough gold, then pick it up.
     *
     * @param item - Shop item that was clicked
     */
    onClickShopItem: (item: Item) => void;
    /** Handle right-click: return grabbed item to its original source. */
    onRightClick: () => void;
    /**
     * When clicking a cell in the inventory grid:
     * attempt to place the grabbed item.
     *
     * @param pos - Target inventory cell position
     * @param relativeX - Pointer offset within the cell (0–50)
     * @param relativeY - Pointer offset within the cell (0–50)
     */
    onClickInventoryCell: (
      pos: Position,
      relativeX: number,
      relativeY: number,
    ) => void;
    /**
     * When clicking on a shop cell:
     * sell the grabbed item back to the shop.
     */
    onClickShopCell: () => void;
  };

/** Main Zustand store combining all slices and high-level click handlers. */
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
    removeInventoryItem(item.instanceId);
  },

  onClickShopItem: (item: Item) => {
    const { gold, setGrabbedItem, removeShopItem, removeGold } =
      useGameStore.getState();
    if (item && gold > item.baseValue) {
      setGrabbedItem({ ...item });
      removeGold(item.baseValue);
    }
    removeShopItem(item.instanceId);
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

  onClickShopCell: () => {
    const { grabbedItem, setGrabbedItem, addGold } = useGameStore.getState();
    if (!grabbedItem) return;

    addGold(grabbedItem.baseValue);
    setGrabbedItem(null);
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
