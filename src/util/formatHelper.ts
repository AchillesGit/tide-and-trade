/**
 * Formatiert eine Zahl als Prozentsatz
 * @param value - Zahl zwischen 0 und 1 oder 0 und 100
 * @param decimals - Anzahl Nachkommastellen
 * @param multiply - true: multipliziert value mit 100 (für 0-1 Werte)
 */
export const formatPercent = (
    value: number,
    decimals = 0,
    multiply = true
): string => {
    if (multiply) value = value * 100;
    return `${value.toFixed(decimals)}%`;
};

/**
 * Formatiert eine Zahl mit optionalen Tausender-Trennzeichen
 */
export const formatNumber = (value: number, decimals = 0): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

/**
 * Formatiert eine Zahl mit einem Goldmünzen-Symbol dahinter
 * @param value - die Zahl
 * @param decimals - Nachkommastellen
 * @param coinSymbol - Symbol für die Goldmünze, Standard: "🪙"
 */
export const formatGold = (value: number, decimals = 0, coinSymbol = "🪙"): string => {
    const num = formatNumber(value, decimals);
    return `${num} ${coinSymbol}`;
};
