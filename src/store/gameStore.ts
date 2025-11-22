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
import type { Item, ItemLevel, Position } from "../types/inventoryTypes";

/**
 * Combined game state including inventory, shop, resources,
 * grabbed item handling, and high-level UI interactions.
 */
export type GameState = ShopState &
  InventoryState &
  ResourceState &
  GrabbedItemState &
  HoveredItemState & {
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
  ...createHoveredItemSlice(...args),

  onClickInventoryItem: (clickedItem: Item) => {
    const {
      grabbedItem,
      setGrabbedItem,
      removeInventoryItem,
      addInventoryItem,
      storeItem,
    } = useGameStore.getState();

    // Kein Item gegrabbt → Angeclicktes grabben
    if (!grabbedItem) {
      setGrabbedItem({ ...clickedItem });
      removeInventoryItem(clickedItem.instanceId);
      return;
    }

    // Gleiches Item angeklickt → nichts tun
    if (grabbedItem.instanceId === clickedItem.instanceId) return;

    // Gleiche Blueprint → MERGE
    if (grabbedItem.blueprintId === clickedItem.blueprintId) {
      const newLevel = Math.min(clickedItem.level + 1, 5) as ItemLevel;

      const mergedItem: Item = {
        ...clickedItem,
        instanceId: crypto.randomUUID(),
        level: newLevel,
      };

      // beide Items entfernen
      removeInventoryItem(grabbedItem.instanceId);
      removeInventoryItem(clickedItem.instanceId);

      // neues einsetzen
      addInventoryItem(mergedItem);

      setGrabbedItem(null);
      return;
    }

    //  Unterschiedliche Blueprint → SWAP + grabbed tauschen
    // TODO: Das passt noch nicht -> schauen, ob das Item da auch rein passt
    // Positionen merken
    const posGrabbed = grabbedItem.position;
    const posClicked = clickedItem.position;

    // remove beide
    removeInventoryItem(grabbedItem.instanceId);
    removeInventoryItem(clickedItem.instanceId);

    let placementValid;

    const itemH = clickedItem.space.length;
    const itemW = clickedItem.space[0].length;
    const occupiedCells: Position[] = [];

    for (let r = 0; r < itemH; r++) {
      for (let c = 0; c < itemW; c++) {
        if (clickedItem.space[r][c] === 1) {
          occupiedCells.push({
            row: posClicked.row + r,
            col: posClicked.col + c,
          });
        }
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cell of occupiedCells) {
      placementValid = storeItem(grabbedItem, cell, 0, 0);
      if (placementValid) break;
    }

    if (!placementValid) {
      addInventoryItem(clickedItem);
    }

    if (placementValid) {
      setGrabbedItem({
        ...clickedItem,
        position: posGrabbed,
      });
    }
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
