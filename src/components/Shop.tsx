import useShop from "../hooks/useShop";
import { useGameStore } from "../store/gameStore";
import { formatGold } from "../util/formatHelper";

import type { FC } from "react";

const Shop: FC = () => {
  const { setHoveredItem, gold } = useGameStore();

  const { buyShopItem, refreshShopItems, resolvedShopItems } = useShop();

  return (
    <div className="bg-gray-800 text-white rounded-md p-3 shadow-md border-2 border-transparent min-w-72 flex flex-col">
      {/* header */}
      <div className="flex justify-between items-baseline mb-2">
        <h1 className="text-lg font-bold">Shop</h1>
        <span className="text-base text-yellow-400">{formatGold(gold)}</span>
      </div>

      <p className="text-xs text-gray-300 mb-4">
        You can <span className="text-yellow-400">sell items</span> by grabbing
        one and pressing <span className="font-bold">S</span>.
      </p>

      {/* shop items list */}
      <div className="flex flex-col gap-2 mb-3 flex-1 min-h-0 overflow-y-auto">
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
            <img alt={item.blueprintId} src={item.image} />
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
        <span className="text-sm text-yellow-400">{formatGold(3)}</span>
      </button>
    </div>
  );
};
export default Shop;
