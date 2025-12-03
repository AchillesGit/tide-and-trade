import { useState } from "react";

import { useGameStore } from "../../store/gameStore";
import { ALL_REWARDS } from "../../types/gamblingTypes";
import { weightedRandomSelection } from "../../util/gamblingHelper";

import type { FC } from "react";

import type { CardReward } from "../../types/gamblingTypes";

const CardPickGame: FC = () => {
  const { gold, removeGold, addGold, luck, addLuck } = useGameStore();
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState<CardReward[]>(() =>
    weightedRandomSelection(ALL_REWARDS, luck, 5),
  );
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);

  const cost = round * 50;

  const pickCard = (index: number) => {
    if (pickedIndex !== null) return;

    setPickedIndex(index);
    const picked = cards[index];

    switch (picked.reward.type) {
      case "gold":
        addGold(picked.reward.amount);
        break;
      case "luck":
        addLuck(picked.reward.amount);
        break;
      case "item":
        // Item hinzufügen / Inventory-Logik
        break;
      default:
        break;
    }
  };

  const resetGame = () => {
    if (gold < cost) {
      return;
    }
    removeGold(cost);
    setPickedIndex(null);
    setRound((r) => r + 1);
    setCards(weightedRandomSelection(ALL_REWARDS, luck, 5));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 text-amber-100">
      <h2 className="font-semibold text-lg">🃏 Choose a Card</h2>

      <div className="flex gap-3">
        {cards.map((card, index) => {
          const revealed = pickedIndex === index;
          const dimmed = pickedIndex !== null && !revealed;

          return (
            <button
              key={card.id}
              disabled={pickedIndex !== null}
              onClick={() => pickCard(index)}
              type="button"
              className={`
                h-24 w-16 rounded-md border-2 text-sm font-semibold
                transition
                ${revealed ? "border-amber-400 bg-amber-900" : "border-cyan-700 bg-cyan-800 hover:-translate-y-1"}
                ${dimmed ? "opacity-40" : ""}
              `}
            >
              {revealed ? card.label : "❓"}
            </button>
          );
        })}
      </div>

      {pickedIndex !== null && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-amber-300 font-semibold">
            Price: {cards[pickedIndex].label}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded bg-emerald-500 px-4 py-1 text-black font-semibold disabled:opacity-50"
              disabled={gold < cost}
              onClick={resetGame}
              type="button"
            >
              Play Again
            </button>
            <span className="text-amber-200 font-medium">Cost: {cost} 🪙</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPickGame;
