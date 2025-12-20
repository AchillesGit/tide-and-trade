import type { CardReward } from "../types/gamblingTypes";

/**
 * Returns a new array with the elements shuffled randomly.
 *
 * @template T
 * @param array The input array to shuffle.
 * @returns A new shuffled array.
 */
export const shuffle = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

/**
 * Returns a human-readable item name based on its rarity level.
 *
 * @param rarity Numeric rarity value.
 * @returns The corresponding item name.
 */
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

/**
 * Selects a number of unique card rewards from a pool using
 * rarity-based weighted randomness influenced by the player's luck.
 *
 * Higher rarity cards have lower base weights, but luck increases
 * their probability of being selected.
 *
 * @param pool  The full pool of available card rewards.
 * @param luck  Player luck value (e.g. 0.05 = 5% luck).
 * @param count Number of cards to select.
 * @returns An array of randomly selected card rewards.
 */
export const weightedRandomSelection = (
  pool: CardReward[],
  luck: number,
  count: number,
): CardReward[] => {
  /**
   * Base selection weights per rarity.
   * Higher value = higher chance.
   */
  const RARITY_WEIGHT: Record<number, number> = {
    0: 50, // common
    1: 40, // uncommon
    2: 30, // rare
    3: 15, // epic
    4: 5, // legendary
    5: 1, // mythic
  };

  /**
   * Luck scaling modifiers per rarity.
   * Lower values make luck more impactful.
   */
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

    // Apply luck scaling to weight
    weight *= 1 + luck / modifier;

    return { card, weight };
  });

  const selected: CardReward[] = [];
  const poolCopy = [...weightedPool];

  // Select unique cards based on weighted probability
  while (selected.length < count && poolCopy.length > 0) {
    const totalWeight = poolCopy.reduce((sum, w) => sum + w.weight, 0);
    let roll = Math.random() * totalWeight;

    for (let i = 0; i < poolCopy.length; i += 1) {
      const { card, weight } = poolCopy[i];
      roll -= weight;

      if (roll <= 0) {
        selected.push(card);
        poolCopy.splice(i, 1); // prevent duplicates
        break;
      }
    }
  }

  return selected;
};
