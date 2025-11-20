import { useGameStore } from "../store/gameStore";
import { resolveItem } from "../util/itemHelper";

import type { FC } from "react";

const Shop: FC = () => {
  const { shopItems, generateShopItems } = useGameStore();

  if (shopItems.length === 0) {
    generateShopItems(5);
  }

  const resolvedShopItems = shopItems.map((i) => resolveItem(i));

  return (
    <div>
      {resolvedShopItems.map((item) => (
        <div key={item.blueprintId} className="border p-2">
          <div>{item.blueprintId}</div>
          <div>{item.baseValue}</div>
          <img alt={item.blueprintId} className="h-8" src={item.image} />
        </div>
      ))}
    </div>
  );
};
export default Shop;
