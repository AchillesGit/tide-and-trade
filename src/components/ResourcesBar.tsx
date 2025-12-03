import ShipHpBar from "./ShipHpBar";
import { useGameStore } from "../store/gameStore";
import { formatPercent } from "../util/formatHelper";

import type { FC } from "react";

const ResourcesBar: FC = () => {
  const { gold, luck } = useGameStore();

  return (
    <div className="flex items-center gap-5 bg-cyan-950 px-4 py-3 shadow-lg backdrop-blur text-amber-100">
      {/* Gold */}
      <div className="flex items-center gap-2 font-semibold text-yellow-300">
        <span className="text-xl">🪙</span>
        <span>{gold}</span>
      </div>
      {/* Luck */}
      <div className="flex items-center gap-2 font-semibold text-yellow-300">
        <span className="text-xl">🍀</span>
        <span>{formatPercent(luck)}</span>
      </div>

      {/* HP bar pushed to the right */}
      <div className="ml-auto w-40">
        <ShipHpBar />
      </div>
    </div>
  );
};

export default ResourcesBar;
