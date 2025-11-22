import { useGameStore } from "../store/gameStore";
import {
  formatGold,
  formatNumber,
  formatPercent,
  getStars,
} from "../util/formatHelper";

import type { FC } from "react";

const ItemInfo: FC = () => {
  const { hoveredItem } = useGameStore();

  if (!hoveredItem) return null;

  return (
    <div className="relative min-w-60 max-w-[320px] bg-gray-800 text-white rounded-[10px] p-3 shadow-md border-2 border-transparent">
      {/* name + gold */}
      <div className="flex justify-between items-baseline mb-1.5">
        <h1 className="text-xl font-bold">{hoveredItem.name}</h1>
        <span className="text-base text-yellow-400">
          {formatGold(hoveredItem.baseValue)}
        </span>
      </div>

      {/* category + stars */}
      <div className="flex justify-between items-center gap-1.5 mb-2">
        <span className="text-[13px] text-gray-300">
          {hoveredItem.categories}
        </span>
        <span className="text-base text-yellow-400">
          {getStars(hoveredItem.level)}
        </span>
      </div>

      {/* item values */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        <span className="text-gray-400">Armor:</span>
        <span className="text-right">
          {formatNumber(hoveredItem.armor[hoveredItem.level - 1])}
        </span>

        <span className="text-gray-400">Attack Speed:</span>
        <span className="text-right">
          {formatNumber(hoveredItem.attackSpeed[hoveredItem.level - 1])}
        </span>

        <span className="text-gray-400">Critical Chance:</span>
        <span className="text-right">
          {formatPercent(hoveredItem.criticalChance[hoveredItem.level - 1])}
        </span>

        <span className="text-gray-400">Critical Damage:</span>
        <span className="text-right">
          {formatNumber(hoveredItem.criticalDamage[hoveredItem.level - 1])}
        </span>

        <span className="text-gray-400">Evasion Chance:</span>
        <span className="text-right">
          {formatPercent(hoveredItem.evasionChance[hoveredItem.level - 1])}
        </span>

        <span className="text-gray-400">Firepower:</span>
        <span className="text-right">
          {formatNumber(hoveredItem.firepower[hoveredItem.level - 1])}
        </span>

        <span className="text-gray-400">Ship HP +:</span>
        <span className="text-right">
          {formatNumber(hoveredItem.shipHpIncrease[hoveredItem.level - 1])}
        </span>
      </div>
    </div>
  );
};

export default ItemInfo;
