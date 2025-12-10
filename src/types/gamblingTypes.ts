import type { ItemRarity } from "./inventoryTypes";

export interface CardReward {
  id: string;
  label: string;
  rarity: ItemRarity;
  reward:
    | { type: "gold"; amount: number }
    | { type: "item" }
    | { type: "luck"; amount: number };
}

export const ALL_REWARDS: CardReward[] = [
  {
    id: "gold5",
    label: "🪙 5 Gold",
    rarity: 0,
    reward: { type: "gold", amount: 5 },
  },
  {
    id: "gold10",
    label: "🪙 10 Gold",
    rarity: 0,
    reward: { type: "gold", amount: 10 },
  },
  {
    id: "gold15",
    label: "🪙 15 Gold",
    rarity: 0,
    reward: { type: "gold", amount: 15 },
  },
  {
    id: "luck1",
    label: "🍀 1% Luck",
    rarity: 0,
    reward: { type: "luck", amount: 0.01 },
  },
  {
    id: "luck2",
    label: "🍀 2% Luck",
    rarity: 0,
    reward: { type: "luck", amount: 0.02 },
  },
  {
    id: "itemCommon1",
    label: "🎁 Shitty Item 1",
    rarity: 0,
    reward: { type: "item" },
  },
  {
    id: "itemCommon2",
    label: "🎁 Shitty Item 2",
    rarity: 0,
    reward: { type: "item" },
  },
  {
    id: "itemCommon3",
    label: "🎁 Shitty Item 3",
    rarity: 0,
    reward: { type: "item" },
  },
  {
    id: "gold20",
    label: "🪙 20 Gold",
    rarity: 1,
    reward: { type: "gold", amount: 20 },
  },
  {
    id: "gold50",
    label: "🪙 50 Gold",
    rarity: 1,
    reward: { type: "gold", amount: 50 },
  },
  {
    id: "gold75",
    label: "🪙 75 Gold",
    rarity: 1,
    reward: { type: "gold", amount: 75 },
  },
  {
    id: "luck3",
    label: "🍀 3% Luck",
    rarity: 1,
    reward: { type: "luck", amount: 0.03 },
  },
  {
    id: "item1",
    label: "🎁 Item A",
    rarity: 1,
    reward: { type: "item" },
  },
  {
    id: "item2",
    label: "🎁 Item B",
    rarity: 1,
    reward: { type: "item" },
  },
  {
    id: "item3",
    label: "🎁 Item C",
    rarity: 1,
    reward: { type: "item" },
  },
  {
    id: "gold100",
    label: "🪙 100 Gold",
    rarity: 2,
    reward: { type: "gold", amount: 100 },
  },
  {
    id: "gold200",
    label: "🪙 200 Gold",
    rarity: 2,
    reward: { type: "gold", amount: 200 },
  },
  {
    id: "gold500",
    label: "🪙 500 Gold",
    rarity: 2,
    reward: { type: "gold", amount: 500 },
  },
  {
    id: "luck5",
    label: "🍀 5% Luck",
    rarity: 2,
    reward: { type: "luck", amount: 0.05 },
  },
  {
    id: "luck7",
    label: "🍀 7% Luck",
    rarity: 2,
    reward: { type: "luck", amount: 0.07 },
  },
  {
    id: "itemEpic1",
    label: "🎁 Meh Item 1",
    rarity: 2,
    reward: { type: "item" },
  },
  {
    id: "itemEpic2",
    label: "🎁 Meh Item 2",
    rarity: 2,
    reward: { type: "item" },
  },
  {
    id: "itemEpic3",
    label: "🎁 Meh Item 3",
    rarity: 2,
    reward: { type: "item" },
  },
  {
    id: "gold1000",
    label: "🪙 1000 Gold",
    rarity: 3,
    reward: { type: "gold", amount: 1000 },
  },
  {
    id: "gold2000",
    label: "🪙 2000 Gold",
    rarity: 3,
    reward: { type: "gold", amount: 2000 },
  },
  {
    id: "luck10",
    label: "🍀 10% Luck",
    rarity: 3,
    reward: { type: "luck", amount: 0.1 },
  },
  {
    id: "luck12",
    label: "🍀 12% Luck",
    rarity: 3,
    reward: { type: "luck", amount: 0.12 },
  },
  {
    id: "itemLegendary1",
    label: "🎁 Not-that-bad Item 1",
    rarity: 3,
    reward: { type: "item" },
  },
  {
    id: "itemLegendary2",
    label: "🎁 Not-that-bad Item 2",
    rarity: 3,
    reward: { type: "item" },
  },
  {
    id: "itemLegendary3",
    label: "🎁 Not-that-bad Item 3",
    rarity: 3,
    reward: { type: "item" },
  },
  {
    id: "itemLegendary4",
    label: "🎁 Not-that-bad Item 4",
    rarity: 3,
    reward: { type: "item" },
  },
];
