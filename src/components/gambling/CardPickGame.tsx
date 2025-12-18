import { useState } from "react";

import Card from "./Card";
import useGamblingInventory from "../../hooks/useGamblingInventory";
import { useGameStore } from "../../store/gameStore";
import { ALL_REWARDS } from "../../types/gamblingTypes";
import { weightedRandomSelection } from "../../util/gamblingHelper";
import { generateGamblingItem } from "../../util/itemHelper";
import Inventory from "../Inventory";
import ItemButton from "../item/ItemButton";
import GoldAmount from "../resources/GoldAmount";

import type { FC } from "react";

import type { CardReward } from "../../types/gamblingTypes";

const CardPlay: FC = () => {
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
    <div className="flex flex-col items-center gap-8 p-8 text-amber-100">
      {/* Title */}
      <h2 className="text-3xl font-bold tracking-wide text-amber-200">
        Choose a Card
      </h2>

      {/* Cards */}
      <div className="flex gap-6 justify-center flex-wrap">
        {cards.map((card, index) => {
          const revealed = pickedIndex === index;
          const dimmed = pickedIndex !== null && !revealed;

          return (
            <Card
              key={card.id}
              dimmed={dimmed}
              disabled={pickedIndex !== null}
              label={card.label}
              onClick={() => pickCard(index)}
              revealed={revealed}
            />
          );
        })}
      </div>

      <div className="min-h-[140px] flex items-center justify-center w-full">
        {pickedIndex !== null && (
          <div className="flex flex-col items-center gap-4 bg-cyan-900/60 px-6 py-4 rounded-xl shadow-lg">
            <div className="text-amber-300 font-semibold text-lg">
              Prize:{" "}
              <span className="text-amber-200">{cards[pickedIndex].label}</span>
            </div>

            <div className="flex items-center gap-6">
              <button
                className="rounded-lg bg-emerald-500 px-6 py-2 text-black font-semibold shadow-md hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                disabled={gold < cost}
                onClick={resetGame}
                type="button"
              >
                Play Again
              </button>

              <span className="text-amber-200 font-medium">
                Cost: <GoldAmount value={cost} />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6 w-full flex-1 items-stretch">
        <Inventory />

        <div
          className="
      ml-auto
      flex flex-col gap-3
      w-90
      h-full
      overflow-y-auto
      p-3
      bg-cyan-900/70
      rounded-xl
      shadow-inner
    "
        >
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

export default CardPlay;
