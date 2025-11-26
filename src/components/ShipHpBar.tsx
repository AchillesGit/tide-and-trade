import { useGameStore } from "../store/gameStore";

import type { FC } from "react";

const ShipHpBar: FC = () => {
  const { currentHp, maxHp } = useGameStore();

  const percent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  // Color transitions: red → yellow → green
  const getColor = () => {
    if (percent < 30) return "bg-red-600";
    if (percent < 60) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>Ship</span>
        <span>
          {currentHp} / {maxHp} HP
        </span>
      </div>

      <div className="h-4 w-full overflow-hidden rounded-full bg-slate-900">
        <div
          className={`h-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ShipHpBar;
