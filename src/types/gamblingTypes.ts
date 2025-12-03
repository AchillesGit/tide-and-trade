export interface CardReward {
  id: string;
  label: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  reward:
    | { type: "gold"; amount: number }
    | { type: "item"; name: string }
    | { type: "luck"; amount: number };
}

export const RARITY_WEIGHT: Record<string, number> = {
  common: 50,
  rare: 30,
  epic: 15,
  legendary: 5,
};

export const ALL_REWARDS: CardReward[] = [
  // Common
  {
    id: "gold5",
    label: "🪙 5 Gold",
    rarity: "common",
    reward: { type: "gold", amount: 5 },
  },
  {
    id: "gold10",
    label: "🪙 10 Gold",
    rarity: "common",
    reward: { type: "gold", amount: 10 },
  },
  {
    id: "gold15",
    label: "🪙 15 Gold",
    rarity: "common",
    reward: { type: "gold", amount: 15 },
  },
  {
    id: "luck1",
    label: "🍀 1% Luck",
    rarity: "common",
    reward: { type: "luck", amount: 0.01 },
  },
  {
    id: "luck2",
    label: "🍀 2% Luck",
    rarity: "common",
    reward: { type: "luck", amount: 0.02 },
  },
  {
    id: "itemCommon1",
    label: "🎁 Kleines Item 1",
    rarity: "common",
    reward: { type: "item", name: "Kleines Item 1" },
  },
  {
    id: "itemCommon2",
    label: "🎁 Kleines Item 2",
    rarity: "common",
    reward: { type: "item", name: "Kleines Item 2" },
  },
  {
    id: "itemCommon3",
    label: "🎁 Kleines Item 3",
    rarity: "common",
    reward: { type: "item", name: "Kleines Item 3" },
  },

  // Rare
  {
    id: "gold20",
    label: "🪙 20 Gold",
    rarity: "rare",
    reward: { type: "gold", amount: 20 },
  },
  {
    id: "gold50",
    label: "🪙 50 Gold",
    rarity: "rare",
    reward: { type: "gold", amount: 50 },
  },
  {
    id: "gold75",
    label: "🪙 75 Gold",
    rarity: "rare",
    reward: { type: "gold", amount: 75 },
  },
  {
    id: "luck3",
    label: "🍀 3% Luck",
    rarity: "rare",
    reward: { type: "luck", amount: 0.03 },
  },
  {
    id: "item1",
    label: "🎁 Item A",
    rarity: "rare",
    reward: { type: "item", name: "Item A" },
  },
  {
    id: "item2",
    label: "🎁 Item B",
    rarity: "rare",
    reward: { type: "item", name: "Item B" },
  },
  {
    id: "item3",
    label: "🎁 Item C",
    rarity: "rare",
    reward: { type: "item", name: "Item C" },
  },

  // Epic
  {
    id: "gold100",
    label: "🪙 100 Gold",
    rarity: "epic",
    reward: { type: "gold", amount: 100 },
  },
  {
    id: "gold200",
    label: "🪙 200 Gold",
    rarity: "epic",
    reward: { type: "gold", amount: 200 },
  },
  {
    id: "gold500",
    label: "🪙 500 Gold",
    rarity: "epic",
    reward: { type: "gold", amount: 500 },
  },
  {
    id: "luck5",
    label: "🍀 5% Luck",
    rarity: "epic",
    reward: { type: "luck", amount: 0.05 },
  },
  {
    id: "luck7",
    label: "🍀 7% Luck",
    rarity: "epic",
    reward: { type: "luck", amount: 0.07 },
  },
  {
    id: "itemEpic1",
    label: "🎁 Großes Item 1",
    rarity: "epic",
    reward: { type: "item", name: "Großes Item 1" },
  },
  {
    id: "itemEpic2",
    label: "🎁 Großes Item 2",
    rarity: "epic",
    reward: { type: "item", name: "Großes Item 2" },
  },
  {
    id: "itemEpic3",
    label: "🎁 Großes Item 3",
    rarity: "epic",
    reward: { type: "item", name: "Großes Item 3" },
  },

  // Legendary
  {
    id: "gold1000",
    label: "🪙 1000 Gold",
    rarity: "legendary",
    reward: { type: "gold", amount: 1000 },
  },
  {
    id: "gold2000",
    label: "🪙 2000 Gold",
    rarity: "legendary",
    reward: { type: "gold", amount: 2000 },
  },
  {
    id: "luck10",
    label: "🍀 10% Luck",
    rarity: "legendary",
    reward: { type: "luck", amount: 0.1 },
  },
  {
    id: "luck12",
    label: "🍀 12% Luck",
    rarity: "legendary",
    reward: { type: "luck", amount: 0.12 },
  },
  {
    id: "itemLegendary1",
    label: "🎁 Legendäres Item 1",
    rarity: "legendary",
    reward: { type: "item", name: "Legendäres Item 1" },
  },
  {
    id: "itemLegendary2",
    label: "🎁 Legendäres Item 2",
    rarity: "legendary",
    reward: { type: "item", name: "Legendäres Item 2" },
  },
  {
    id: "itemLegendary3",
    label: "🎁 Legendäres Item 3",
    rarity: "legendary",
    reward: { type: "item", name: "Legendäres Item 3" },
  },
  {
    id: "itemLegendary4",
    label: "🎁 Legendäres Item 4",
    rarity: "legendary",
    reward: { type: "item", name: "Legendäres Item 4" },
  },
];
