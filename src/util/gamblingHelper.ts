import type { CardReward } from "../types/gamblingTypes";

export const shuffle = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export const getItemnameByRarity = (rarity: number): string => {
  switch (rarity) {
    case 0:
      return "Common Item";
    case 1:
      return "Uncommon Item";
    case 2:
      return "Rare Item";
    case 3:
      return "Epic Item";
    case 4:
      return "Legendary Item";
    case 5:
      return "Mythic Item";
    default:
      return "Unknown Item";
  }
};

export const weightedRandomSelection = (
  pool: CardReward[],
  luck: number,
  count: number,
): CardReward[] => {
  const RARITY_WEIGHT: Record<number, number> = {
    0: 50, // common
    1: 40, // uncommon
    2: 30, // rare
    3: 15, // epic
    4: 5, // legendary
    5: 1, // mythic
  };

  const LUCK_MODIFIERS = {
    0: 500, // common
    1: 300, // uncommon
    2: 200, // rare
    3: 80, // epic
    4: 40, // legendary
    5: 20, // mythic
  } as const;

  const weightedPool = pool.map((card) => {
    let weight = RARITY_WEIGHT[card.rarity] ?? 1;
    const modifier = LUCK_MODIFIERS[card.rarity] ?? 1000;
    weight *= 1 + luck / modifier;
    return { card, weight };
  });

  const selected: CardReward[] = [];
  const poolCopy = [...weightedPool];

  while (selected.length < count && poolCopy.length > 0) {
    const totalWeight = poolCopy.reduce((sum, w) => sum + w.weight, 0);
    let roll = Math.random() * totalWeight;

    for (let i = 0; i < poolCopy.length; i += 1) {
      const { card, weight } = poolCopy[i];
      roll -= weight;
      if (roll <= 0) {
        selected.push(card);
        poolCopy.splice(i, 1);
        break;
      }
    }
  }

  return selected;
};
