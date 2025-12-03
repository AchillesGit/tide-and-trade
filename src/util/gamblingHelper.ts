import type { CardReward } from "../types/gamblingTypes";

export const shuffle = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export const weightedRandomSelection = (
  pool: CardReward[],
  luck: number, // Luck in Prozent, z.B. 5
  count: number,
): CardReward[] => {
  // Basisgewichte
  const RARITY_WEIGHT: Record<string, number> = {
    common: 50,
    rare: 30,
    epic: 15,
    legendary: 5,
  };

  // Gewichte an Luck anpassen
  const weightedPool = pool.map((card) => {
    let weight = RARITY_WEIGHT[card.rarity];
    if (card.rarity === "rare") weight *= 1 + luck / 200;
    if (card.rarity === "epic") weight *= 1 + luck / 50;
    if (card.rarity === "legendary") weight *= 1 + luck / 25;
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
        poolCopy.splice(i, 1); // Keine Duplikate
        break;
      }
    }
  }

  return selected;
};
