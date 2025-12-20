import { useGameStore } from "../store/gameStore";
import { resolveItem } from "../util/itemHelper";

import type { Item } from "../types/inventoryTypes";

interface UseGamblingInventoryReturn {
  /**
   * Player takes the item: receives gold (baseValue), item removed.
   */
  takeGamblingItem: (item: Item) => void;

  /** Allows inserting new items from outside */
  addGamblingItem: (item: Item) => void;

  resolvedGamblingItems: Item[];
}

const useGamblingInventory = (): UseGamblingInventoryReturn => {
  const {
    gamblingItems,
    addGold,
    setGrabbedItem,
    removeGamblingItem,
    addGamblingItem,
  } = useGameStore();

  /** Player steals item → gets gold instead of losing it */
  const takeGamblingItem = (item: Item) => {
    addGold(item.baseValue);
    setGrabbedItem({ ...item });
    removeGamblingItem(item.instanceId);
  };

  const resolvedGamblingItems = gamblingItems.map((i) => resolveItem(i));

  return {
    resolvedGamblingItems,
    takeGamblingItem,
    addGamblingItem,
  };
};

export default useGamblingInventory;
