import ShipHpBar from "./ShipHpBar";
import { useGameStore } from "../store/gameStore";
import GoldAmount from "./resources/GoldAmount";
import LuckAmount from "./resources/LuckAmount";

import type { FC } from "react";

const ResourcesBar: FC = () => {
  const { gold, luck } = useGameStore();

  return (
    <div className="flex items-center gap-5 bg-cyan-950 px-4 py-3 shadow-lg backdrop-blur text-amber-100">
      {/* Gold */}
      <GoldAmount value={gold} />
      {/* Luck */}
      <LuckAmount value={luck} />

      {/* HP bar pushed to the right */}
      <div className="ml-auto w-40">
        <ShipHpBar />
      </div>
    </div>
  );
};

export default ResourcesBar;
