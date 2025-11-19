import { formatGold, formatNumber, formatPercent } from "../util/formatHelper";
import type { ItemInstance } from "../types/inventoryTypes";
import styles from "./ItemInfo.module.css";
import { useGameStore } from "../store/gameStore";
import ItemBlueprints from "../blueprints/itemBlueprints";


const sumInventoryStats = (items: ItemInstance[]) => {
    return items.reduce(
        (sum, instance) => {
            const blueprint = ItemBlueprints[instance.blueprintId];
            if (!blueprint) return sum;

            const lvl = instance.level;

            sum.gold += blueprint.baseValue ?? 0;
            sum.armor += blueprint.armor?.[lvl] ?? 0;
            sum.attackSpeed += blueprint.attackSpeed?.[lvl] ?? 0;
            sum.criticalChance += blueprint.criticalChance?.[lvl] ?? 0;
            sum.criticalDamage += blueprint.criticalDamage?.[lvl] ?? 0;
            sum.evasionChance += blueprint.evasionChance?.[lvl] ?? 0;
            sum.firepower += blueprint.firepower?.[lvl] ?? 0;
            sum.hp += blueprint.shipHpIncrease?.[lvl] ?? 0;

            return sum;
        },
        {
            gold: 0,
            armor: 0,
            attackSpeed: 0,
            criticalChance: 0,
            criticalDamage: 0,
            evasionChance: 0,
            firepower: 0,
            hp: 0,
        }
    );
};

const StatsSumInfo = () => {

    const { inventoryItems } = useGameStore();
    const totals = sumInventoryStats(inventoryItems);

    return (
        <div className={styles.container}>

            {/* Name + Gold */}
            <div className={styles.nameContainer}>
                <h1 className={styles.title}>{"BATTLEREINER"}</h1>
                <span className={styles.goldValue}>{formatGold(totals.gold)}</span>
            </div>

            {/* Werte */}
            <div className={styles.valuesGrid}>
                <span className={styles.label}>Armor:</span>
                <span className={styles.value}>{formatNumber(totals.armor)}</span>

                <span className={styles.label}>Attack Speed:</span>
                <span className={styles.value}>{formatNumber(totals.attackSpeed)}</span>

                <span className={styles.label}>Critical Chance:</span>
                <span className={styles.value}>{formatPercent(totals.criticalChance)}</span>

                <span className={styles.label}>Critical Damage:</span>
                <span className={styles.value}>{formatPercent(totals.criticalDamage)}</span>

                <span className={styles.label}>Evasion Chance:</span>
                <span className={styles.value}>{formatPercent(totals.evasionChance)}</span>

                <span className={styles.label}>Firepower:</span>
                <span className={styles.value}>{formatNumber(totals.firepower)}</span>

                <span className={styles.label}>Ship HP +:</span>
                <span className={styles.value}>{formatNumber(totals.hp)}</span>
            </div>
        </div>
    );
};
export default StatsSumInfo;
