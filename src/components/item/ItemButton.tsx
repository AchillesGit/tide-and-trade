import { useGameStore } from "../../store/gameStore";
import GoldAmount from "../resources/GoldAmount";

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
      onClick={onClick}
      onMouseEnter={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(null)}
      type="button"
      className="
    w-full cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors
    border border-gray-600 rounded-md p-2 flex justify-between items-start shadow-sm
  "
    >
      {/* Textbereich */}
      <div className="flex flex-col text-left">
        <span className="font-semibold text-sm mb-2">{item.name}</span>
        <GoldAmount size={25} value={item.baseValue} />
      </div>

      {/* Bild rechts */}
      <img alt={item.blueprintId} src={item.image} />
    </button>
  );
};

export default ItemButton;
