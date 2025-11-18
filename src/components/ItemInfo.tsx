import styles from "./ItemInfo.module.css";
import type { Item } from "../types/inventoryTypes";
import { formatGold, formatNumber, formatPercent } from "../util/formatHelper";

// Hilfsfunktion: CSS-Klasse für Seltenheit
const getRarityClass = (rarity: number) => {
    switch (rarity) {
        case 1: return styles.common;
        case 2: return styles.uncommon;
        case 3: return styles.rare;
        case 4: return styles.epic;
        case 5: return styles.legendary;
        default: return "";
    }
};

// Sterne-Anzeige für das Item-Level
const getStars = (level: number) => {
    const maxStars = 5;
    const filledStars = Array(level).fill("★");
    const emptyStars = Array(maxStars - level).fill("☆");
    return filledStars.concat(emptyStars).join(" ");
};

const ItemInfo = (item: Item) => {
    return (
        <div className={`${styles.container} ${getRarityClass(item.rarity)}`}>

            {/* Name + Gold */}
            <div className={styles.nameContainer}>
                <h1 className={styles.title}>{item.name}</h1>
                <span className={styles.goldValue}>{formatGold(item.baseValue)}</span>
            </div>

            {/* Kategorie + Sterne */}
            <div className={styles.categoryContainer}>
                <span className={styles.category}>{item.categories}</span>
                <span className={styles.stars}>{getStars(item.level)}</span>
            </div>

            {/* Werte */}
            <div className={styles.valuesGrid}>
                <span className={styles.label}>Armor:</span>
                <span className={styles.value}>{formatNumber(item.armor[item.level])}</span>

                <span className={styles.label}>Attack Speed:</span>
                <span className={styles.value}>{formatNumber(item.attackSpeed[item.level])}</span>

                <span className={styles.label}>Critical Chance:</span>
                <span className={styles.value}>{formatPercent(item.criticalChance[item.level])}</span>

                <span className={styles.label}>Critical Damage:</span>
                <span className={styles.value}>{formatPercent(item.criticalDamage[item.level])}</span>

                <span className={styles.label}>Evasion Chance:</span>
                <span className={styles.value}>{formatPercent(item.evasionChance[item.level])}</span>

                <span className={styles.label}>Firepower:</span>
                <span className={styles.value}>{formatNumber(item.firepower[item.level])}</span>

                <span className={styles.label}>Ship HP +:</span>
                <span className={styles.value}>{formatNumber(item.shipHpIncrease[item.level])}</span>
            </div>
        </div>
    );
};

export default ItemInfo;
