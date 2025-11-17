import ItemBlueprints from "../blueprints/itemBlueprints";
import { createItemInstance } from "../util/itemHelper";

import type { StateCreator } from "zustand";

import type { ItemInstance } from "../types/inventoryTypes";

/** Zustand slice for managing shop inventory and grid layout. */
export interface ShopState {
  /** All items currently sold in the shop */
  shopItems: ItemInstance[];
  /**
   * Add a new item to the shop.
   * @param item - Item to add
   */
  addShopItem: (item: ItemInstance) => void;
  /**
   * Remove an item from the shop by ID.
   * @param itemId - Target item identifier
   */
  removeShopItem: (itemId: string) => void;
  /**
   * Generates a new set of random shop items.
   * @param count - Number of items to generate (default: 5).
   */
  generateShopItems: (count: number) => void;
}

/** Creates the shop slice: items for sale and their grid representation. */
export const createShopSlice: StateCreator<ShopState> = (set) => ({
  shopItems: [],

  addShopItem: (item) =>
    set(
      (state) =>
        ({
          shopItems: [...state.shopItems, item],
        }) satisfies Partial<ShopState>,
    ),

  removeShopItem: (itemId) => {
    set(
      (state) =>
        ({
          shopItems: state.shopItems.filter((it) => it.instanceId !== itemId),
        }) satisfies Partial<ShopState>,
    );
  },

  generateShopItems: (count) =>
    set(() => {
      const blueprints = Object.values(ItemBlueprints);

      const newShopItems: ItemInstance[] = Array.from({ length: count }, () => {
        const randomBlueprint =
          blueprints[Math.floor(Math.random() * blueprints.length)];
        return createItemInstance(randomBlueprint, "shop", 1);
      });

      return {
        shopItems: newShopItems,
      } satisfies Partial<ShopState>;
    }),
});
