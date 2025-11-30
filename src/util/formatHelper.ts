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
