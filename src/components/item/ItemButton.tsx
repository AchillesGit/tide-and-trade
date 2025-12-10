import { useGameStore } from "../../store/gameStore";
import { formatGold } from "../../util/formatHelper";

import type { FC } from "react";

import type { Item } from "../../types/inventoryTypes";

interface ShopItemButtonProps {
  item: Item;
  onClick: () => void;
}

const ItemButton: FC<ShopItemButtonProps> = ({ item, onClick }) => {
  const { setHoveredItem } = useGameStore();

  return (
    <button
      key={item.instanceId}
      className="w-full cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600 rounded-md p-2 flex justify-between items-center shadow-sm"
      onClick={onClick}
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
  );
};

export default ItemButton;
