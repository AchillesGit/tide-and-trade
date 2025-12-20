import { useNavigate } from "react-router-dom";

import ShipHpBar from "./ShipHpBar";
import { useGameStore } from "../store/gameStore";
import GoldAmount from "./resources/GoldAmount";

import type { FC } from "react";

const Shipyard: FC = () => {
  const navigate = useNavigate();

  const { currentHp, maxHp, addCurrentHP, gold, removeGold } = useGameStore();

  const repairAmount = 25;
  const goldPerHp = 0.4;

  const missingHp = maxHp - currentHp;
  const singleRepairCost = Math.ceil(repairAmount * goldPerHp);
  const fullRepairCost = Math.ceil(missingHp * goldPerHp);

  const isFullHp = currentHp >= maxHp;
  const canAffordSingle = gold >= singleRepairCost;
  const canAffordFull = gold >= fullRepairCost;

  const repairPartial = () => {
    if (isFullHp || !canAffordSingle) return;
    removeGold(singleRepairCost);
    addCurrentHP(repairAmount);
  };

  const repairFull = () => {
    if (isFullHp || !canAffordFull) return;
    removeGold(fullRepairCost);
    addCurrentHP(missingHp);
  };

  return (
    <div className="flex  items-center justify-center from-slate-900 to-slate-800 p-6 text-white">
      <div className="w-full max-w-md rounded-2xl bg-slate-700/80 p-6 shadow-xl">
        <h1 className="mb-4 text-center text-2xl font-bold">⚓ Shipyard</h1>

        {/* HP Bar */}
        <div className="mb-10">
          <ShipHpBar />
        </div>

        {/* Partial Repair */}
        <button
          disabled={isFullHp || !canAffordSingle}
          onClick={repairPartial}
          type="button"
          className={`mb-2 w-full rounded-lg px-4 py-2 font-semibold transition
            ${
              isFullHp || !canAffordSingle
                ? "cursor-not-allowed bg-slate-500"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
          🔧 Repair +{repairAmount} HP <GoldAmount value={singleRepairCost} />
        </button>

        {/* Full Repair */}
        <button
          disabled={isFullHp || !canAffordFull}
          onClick={repairFull}
          type="button"
          className={`mb-10 w-full rounded-lg px-4 py-2 font-semibold transition
            ${
              isFullHp || !canAffordFull
                ? "cursor-not-allowed bg-slate-500"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
        >
          🛠️ Fully Repair <GoldAmount value={fullRepairCost} />
        </button>

        {/* Feedback */}
        {isFullHp ? (
          <p className="mb-2 text-center text-sm text-emerald-300">
            Your ship is fully repaired.
          </p>
        ) : null}

        {!isFullHp && !canAffordFull && (
          <p className="mb-2 text-center text-sm text-red-300">
            Not enough gold for a full repair.
          </p>
        )}

        {/* Continue */}
        <button
          className="mt-2 w-full rounded-lg bg-slate-600 px-4 py-2 transition hover:bg-slate-500"
          onClick={async () => navigate("/")}
          type="button"
        >
          ⛵ Continue Journey
        </button>
      </div>
    </div>
  );
};

export default Shipyard;
