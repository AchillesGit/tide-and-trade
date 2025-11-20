import { useGameStore } from "../store/gameStore";
import { formatGold } from "../util/formatHelper";
import { resolveItem } from "../util/itemHelper";

import type { FC } from "react";

const Shop: FC = () => {
  const { shopItems, generateShopItems, setHoveredItem, gold, removeGold } =
    useGameStore();

  if (shopItems.length === 0) {
    generateShopItems(5);
  }

  /** Deducts 100 gold and regenerates 5 shop items if the player has enough gold. */
  const refreshShopItems = () => {
    if (gold >= 5) {
      removeGold(100);
      generateShopItems(5);
    }
  };

  const resolvedShopItems = shopItems.map((i) => resolveItem(i));

  return (
    <div>
      {resolvedShopItems.map((item) => (
        <div
          key={item.instanceId}
          className="border p-2 cursor-pointer flex items-center gap-2"
          onMouseEnter={() => {
            setHoveredItem(item);
          }}
          onMouseLeave={() => {
            setHoveredItem(null);
          }}
        >
          <div>
            <div>{item.name}</div>
            <span className="text-base text-yellow-600">
              {formatGold(item.baseValue)}
            </span>
          </div>
          <img alt={item.blueprintId} className="h-10" src={item.image} />
        </div>
      ))}
      <button
        className="border p-1 cursor-pointer"
        type="button"
        onClick={() => {
          refreshShopItems();
        }}
      >
        Refresh{" "}
        <span className="text-base text-yellow-600">{formatGold(100)}</span>
      </button>
    </div>
  );
};
export default Shop;
