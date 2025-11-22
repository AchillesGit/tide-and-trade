import { useGameStore } from "../store/gameStore";
import { formatGold } from "../util/formatHelper";
import { resolveItem } from "../util/itemHelper";

import type { FC } from "react";

import type { Item } from "../types/inventoryTypes";

const Shop: FC = () => {
  const {
    shopItems,
    generateShopItems,
    setHoveredItem,
    gold,
    removeGold,
    setGrabbedItem,
    removeShopItem,
  } = useGameStore();

  if (shopItems.length === 0) {
    generateShopItems(5);
  }

  /** Deducts 100 gold and regenerates 5 shop items if the player has enough gold. */
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

  return (
    <div className="bg-gray-800 text-white rounded-md p-3 shadow-md border-2 border-transparent min-w-72">
      {/* header */}
      <div className="flex justify-between items-baseline mb-2">
        <h1 className="text-lg font-bold">Shop</h1>
        <span className="text-base text-yellow-400">{formatGold(gold)}</span>
      </div>

      {/* shop items list */}
      <div className="flex flex-col gap-2 mb-3">
        {resolvedShopItems.map((item) => (
          <button
            key={item.instanceId}
            className="w-full cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600 rounded-md p-2 flex justify-between items-center shadow-sm"
            onClick={() => buyShopItem(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            type="button"
          >
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm">{item.name}</span>
              <span className="text-sm text-yellow-400">
                {formatGold(item.baseValue)}
              </span>
            </div>
            <img alt={item.blueprintId} className="h-10" src={item.image} />
          </button>
        ))}
      </div>

      {/* refresh button */}
      <button
        className="w-full cursor-pointer mt-10 bg-gray-500 hover:bg-gray-600 transition-colors border border-gray-300 rounded-md p-2 flex justify-between items-center shadow-sm"
        onClick={refreshShopItems}
        type="button"
      >
        <span className="font-semibold text-sm">Refresh</span>
        <span className="text-sm text-yellow-400">{formatGold(100)}</span>
      </button>
    </div>
  );
};
export default Shop;
