import { useGameStore } from "../store/gameStore";
import { formatGold } from "../util/formatHelper";
import { resolveItem } from "../util/itemHelper";

import type { FC } from "react";

const Shop: FC = () => {
  const { shopItems, generateShopItems, setHoveredItem } = useGameStore();

  if (shopItems.length === 0) {
    generateShopItems(5);
  }

  const resolvedShopItems = shopItems.map((i) => resolveItem(i));

  return (
    <div>
      {resolvedShopItems.map((item) => (
        <div
          key={item.blueprintId}
          className="border p-2"
          onMouseEnter={() => {
            setHoveredItem(item);
          }}
          onMouseLeave={() => {
            setHoveredItem(null);
          }}
        >
          <div>{item.blueprintId}</div>
          <span className="text-base text-yellow-600">
            {formatGold(item.baseValue)}
          </span>
          <img alt={item.blueprintId} className="h-8" src={item.image} />
        </div>
      ))}
    </div>
  );
};
export default Shop;
