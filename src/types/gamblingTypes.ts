import type { ItemRarity } from "./inventoryTypes";

export interface CardReward {
  id: string;
  rarity: ItemRarity;
  reward:
    | { type: "gold"; amount: number }
    | { type: "item" }
    | { type: "luck"; amount: number };
}

export const ALL_REWARDS: CardReward[] = [
  {
    id: "gold10",
    rarity: 0,
    reward: { type: "gold", amount: 10 },
  },
  {
    id: "gold15",
    rarity: 0,
    reward: { type: "gold", amount: 15 },
  },
  {
    id: "luck1",
    rarity: 0,
    reward: { type: "luck", amount: 0.01 },
  },
  {
    id: "luck2",
    rarity: 0,
    reward: { type: "luck", amount: 0.02 },
  },
  {
    id: "itemCommon1",
    rarity: 0,
    reward: { type: "item" },
  },
  {
    id: "itemCommon2",
    rarity: 0,
    reward: { type: "item" },
  },
  {
    id: "gold50",
    rarity: 1,
    reward: { type: "gold", amount: 50 },
  },
  {
    id: "gold75",
    rarity: 1,
    reward: { type: "gold", amount: 75 },
  },
  {
    id: "luck3",
    rarity: 1,
    reward: { type: "luck", amount: 0.03 },
  },
  {
    id: "item1",
    rarity: 1,
    reward: { type: "item" },
  },
  {
    id: "item2",
    rarity: 1,
    reward: { type: "item" },
  },
  {
    id: "gold100",
    rarity: 2,
    reward: { type: "gold", amount: 100 },
  },
  {
    id: "gold500",
    rarity: 2,
    reward: { type: "gold", amount: 500 },
  },
  {
    id: "luck5",
    rarity: 2,
    reward: { type: "luck", amount: 0.05 },
  },
  {
    id: "luck7",
    rarity: 2,
    reward: { type: "luck", amount: 0.07 },
  },
  {
    id: "itemEpic1",
    rarity: 2,
    reward: { type: "item" },
  },
  {
    id: "itemEpic2",
    rarity: 2,
    reward: { type: "item" },
  },
  {
    id: "gold1000",
    rarity: 3,
    reward: { type: "gold", amount: 1000 },
  },
  {
    id: "gold2000",
    rarity: 3,
    reward: { type: "gold", amount: 2000 },
  },
  {
    id: "luck10",
    rarity: 3,
    reward: { type: "luck", amount: 0.1 },
  },
  {
    id: "luck12",
    rarity: 3,
    reward: { type: "luck", amount: 0.12 },
  },
  {
    id: "itemLegendary1",
    rarity: 3,
    reward: { type: "item" },
  },
  {
    id: "itemLegendary2",
    rarity: 3,
    reward: { type: "item" },
  },
  {
    id: "itemLegendary3",
    rarity: 3,
    reward: { type: "item" },
  },
  {
    id: "itemLegendary4",
    rarity: 3,
    reward: { type: "item" },
  },
];
