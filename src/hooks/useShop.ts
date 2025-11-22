import { useEffect } from "react";

import { useGameStore } from "../store/gameStore";
import { resolveItem } from "../util/itemHelper";

import type { Item } from "../types/inventoryTypes";

interface UseShopReturn {
  /** Deducts 100 gold and regenerates 5 shop items if the player has enough gold. */
  refreshShopItems: () => void;
  /**
   * Purchases the item: deducts its cost, grabs it, and removes it from the shop.
   * @param item the item to sell.
   */
  buyShopItem: (item: Item) => void;
  resolvedShopItems: Item[];
}

const useShop = (): UseShopReturn => {
  const {
    shopItems,
    generateShopItems,
    gold,
    grabbedItem,
    addGold,
    removeGold,
    setGrabbedItem,
    removeShopItem,
  } = useGameStore();

  useEffect(() => {
    /** Sell grabbed item */
    const onPressS = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (grabbedItem) {
          addGold(grabbedItem.baseValue);
          setGrabbedItem(null);
        }
      }
    };

    document.addEventListener("keydown", onPressS);
    return () => {
      document.removeEventListener("keydown", onPressS);
    };
  }, [addGold, grabbedItem, setGrabbedItem]);

  if (shopItems.length === 0) {
    generateShopItems(5);
  }

  const refreshShopItems = () => {
    if (gold >= 100) {
      removeGold(100);
      generateShopItems(5);
    }
  };

  /** Purchases the item: deducts its cost, grabs it, and removes it from the shop. */
  const buyShopItem = (item: Item) => {
    if (gold >= item.baseValue) {
      setGrabbedItem({ ...item });
      removeGold(item.baseValue);
      removeShopItem(item.instanceId);
    }
  };

  const resolvedShopItems = shopItems.map((i) => resolveItem(i));

  return { refreshShopItems, resolvedShopItems, buyShopItem };
};
export default useShop;
