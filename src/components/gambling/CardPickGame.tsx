import { useState } from "react";

import useGamblingInventory from "../../hooks/useGamblingInventory";
import { useGameStore } from "../../store/gameStore";
import { ALL_REWARDS } from "../../types/gamblingTypes";
import { weightedRandomSelection } from "../../util/gamblingHelper";
import { generateGamblingItem } from "../../util/itemHelper";
import Inventory from "../Inventory";
import ItemButton from "../item/ItemButton";

import type { FC } from "react";

import type { CardReward } from "../../types/gamblingTypes";

const CardPickGame: FC = () => {
  const {
    gold,
    removeGold,
    addGold,
    luck,
    addLuck,
    addGamblingItem,
    gamblingItems,
  } = useGameStore();

  const { takeGamblingItem } = useGamblingInventory();

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
        addGamblingItem(generateGamblingItem(picked.rarity));
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
    <div className="flex flex-col items-center gap-6 p-6 text-amber-100">
      <h2 className="text-2xl font-bold mb-4">Choose a Card</h2>

      <div className="flex gap-4 justify-center flex-wrap">
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
              relative h-28 w-20 rounded-xl border-2 text-sm font-semibold
              transition-transform duration-200
              ${revealed ? "border-amber-400 bg-amber-900 shadow-lg" : "border-cyan-700 bg-cyan-800 hover:-translate-y-2 hover:scale-105"}
              ${dimmed ? "opacity-50" : ""}
            `}
            >
              {revealed ? card.label : "❓"}
            </button>
          );
        })}
      </div>

      {pickedIndex !== null && (
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="text-amber-300 font-semibold text-lg">
            Prize: {cards[pickedIndex].label}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="rounded-lg bg-emerald-500 px-5 py-2 text-black font-semibold shadow-md hover:bg-emerald-600 disabled:opacity-50 transition-colors"
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

      <div className="flex gap-6 w-full mt-6">
        <Inventory />

        <div className="flex flex-col gap-3 flex-1 max-h-96 overflow-y-auto p-2 bg-cyan-800 rounded-xl shadow-inner">
          {gamblingItems.map((item) => (
            <ItemButton
              key={item.instanceId}
              item={item}
              onClick={() => takeGamblingItem(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPickGame;
