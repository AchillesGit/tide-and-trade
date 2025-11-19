import ItemBlueprints from "../blueprints/itemBlueprints";

import type { ItemInstance, Ship } from "../types/inventoryTypes";

/**
 * Formats a number as a percentage.
 *
 * @param value     Numeric value to format.
 * @param decimals  Number of decimal places.
 * @param multiply  Whether to multiply the value by 100 before formatting.
 * @returns A formatted percentage string.
 */
export const formatPercent = (
  value: number,
  decimals = 0,
  multiply = true,
): string =>
  multiply
    ? `${(value * 100).toFixed(decimals)}%`
    : `${value.toFixed(decimals)}%`;

/**
 * Formats a number with fixed decimal places and locale separators.
 *
 * @param value     Numeric value to format.
 * @param decimals  Number of decimal places.
 * @returns A formatted number string.
 */
export const formatNumber = (value: number, decimals = 0): string =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Formats a gold value with an optional coin symbol.
 *
 * @param value       Numeric value to format.
 * @param decimals    Number of decimal places.
 * @param coinSymbol  Symbol to append (default: 🪙).
 * @returns A formatted gold string.
 */
export const formatGold = (
  value: number,
  decimals = 0,
  coinSymbol = "🪙",
): string => {
  const num = formatNumber(value, decimals);
  return `${num} ${coinSymbol}`;
};

/**
 * Returns a 5-star string representation for the given item level.
 *
 * @param level The current item level.
 * @returns A string of filled (★) and empty (☆) stars.
 */
export const getStars = (level: number): string => {
  const maxStars = 5;
  const filledStars = Array(level).fill("★");
  const emptyStars = Array(maxStars - level).fill("☆");
  return [...filledStars, ...emptyStars].join(" ");
};

export const sumInventoryStats = (items: ItemInstance[]): Ship =>
  items.reduce(
    (sum, instance) => {
      const blueprint = ItemBlueprints[instance.blueprintId];
      if (!blueprint) return sum;

      const lvl = instance.level;

      return {
        ...sum,
        gold: sum.gold + (blueprint.baseValue ?? 0),
        armor: sum.armor + (blueprint.armor?.[lvl] ?? 0),
        attackSpeed: sum.attackSpeed + (blueprint.attackSpeed?.[lvl] ?? 0),
        criticalChance:
          sum.criticalChance + (blueprint.criticalChance?.[lvl] ?? 0),
        criticalDamage:
          sum.criticalDamage + (blueprint.criticalDamage?.[lvl] ?? 0),
        evasionChance:
          sum.evasionChance + (blueprint.evasionChance?.[lvl] ?? 0),
        firepower: sum.firepower + (blueprint.firepower?.[lvl] ?? 0),
        hp: sum.currentHp + (blueprint.shipHpIncrease?.[lvl] ?? 0),
      };
    },
    {
      gold: 0,
      armor: 0,
      attackSpeed: 0,
      criticalChance: 0,
      criticalDamage: 0,
      evasionChance: 0,
      firepower: 0,
      currentHp: 0,
      name: "Battle Reiner",
      maxHp: 0,
    } satisfies Ship,
  );
