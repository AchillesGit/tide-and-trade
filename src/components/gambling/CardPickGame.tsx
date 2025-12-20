import { useState } from "react";

import Card from "./Card";
import useGamblingInventory from "../../hooks/useGamblingInventory";
import { useGameStore } from "../../store/gameStore";
import { ALL_REWARDS } from "../../types/gamblingTypes";
import {
  getItemnameByRarity,
  weightedRandomSelection,
} from "../../util/gamblingHelper";
import { generateGamblingItem } from "../../util/itemHelper";
import ContinueButton from "../ContinueButton";
import Inventory from "../Inventory";
import ItemButton from "../item/ItemButton";
import GiftIconAndLabel from "../resources/GiftIconAndLabel";
import GoldAmount from "../resources/GoldAmount";
import LuckAmount from "../resources/LuckAmount";

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
      {/* Header */}
      <div className="grid w-full grid-cols-3 items-center">
        <div />

        <h2 className="text-3xl font-bold tracking-wide text-black text-center">
          Choose a Card
        </h2>

        <div className="flex justify-end">
          <ContinueButton />
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-6 justify-center flex-wrap">
        {cards.map((card, index) => {
          const revealed = pickedIndex === index;
          const dimmed = pickedIndex !== null && !revealed;
          // Dynamisch Content erzeugen
          let content;
          switch (card.reward.type) {
            case "gold":
              content = <GoldAmount size={20} value={card.reward.amount} />;
              break;
            case "luck":
              content = <LuckAmount size={20} value={card.reward.amount} />;
              break;
            case "item":
              content = (
                <GiftIconAndLabel
                  size={20}
                  text={getItemnameByRarity(card.rarity)}
                />
              );
              break;
            default:
              content = null;
          }

          return (
            <Card
              key={card.id}
              content={content}
              dimmed={dimmed}
              disabled={pickedIndex !== null}
              onClick={() => pickCard(index)}
              revealed={revealed}
            />
          );
        })}
      </div>

      <div className="min-h-[50px] flex items-center justify-center w-full">
        {pickedIndex !== null && (
          <button
            disabled={gold < cost}
            onClick={resetGame}
            type="button"
            className="
    flex items-center gap-2 justify-center
    rounded-xl bg-emerald-500 px-6 py-3
    text-black font-bold
    shadow-lg hover:bg-emerald-600 active:bg-emerald-700
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  "
          >
            <span>Play Again for</span>
            <GoldAmount size={24} value={cost} />
          </button>
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
          <h1 className="text-center text-xl font-bold text-amber-200">
            Your gambled items
          </h1>
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
