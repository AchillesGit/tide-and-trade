import useShop from "../hooks/useShop";
import { useGameStore } from "../store/gameStore";
import ItemButton from "./item/ItemButton";
import GoldAmount from "./resources/GoldAmount";

import type { FC } from "react";

const Shop: FC = () => {
  const { gold } = useGameStore();

  const { buyShopItem, refreshShopItems, resolvedShopItems } = useShop();

  return (
    <div className="bg-gray-800 text-white rounded-md p-3 shadow-md border-2 border-transparent min-w-72 flex flex-col">
      {/* header */}
      <div className="flex justify-between items-baseline mb-2">
        <h1 className="text-lg font-bold">Shop</h1>
        <GoldAmount size={25} value={gold} />
      </div>

      <p className="text-xs text-gray-300 mb-4">
        You can <span className="text-yellow-400">sell items</span> by grabbing
        one and pressing <span className="font-bold">S</span>.
      </p>

      {/* shop items list */}
      <div className="flex flex-col gap-2 mb-3 flex-1 min-h-0 overflow-y-auto">
        {resolvedShopItems.map((item) => (
          <ItemButton
            key={item.instanceId}
            item={item}
            onClick={() => buyShopItem(item)}
          />
        ))}
      </div>

      {/* refresh button */}
      <button
        className="w-full cursor-pointer mt-10 bg-gray-500 hover:bg-gray-600 transition-colors border border-gray-300 rounded-md p-2 flex justify-between items-center shadow-sm"
        onClick={refreshShopItems}
        type="button"
      >
        <span className="font-semibold text-sm">Refresh</span>
        <GoldAmount value={3} />
      </button>
    </div>
  );
};
export default Shop;
