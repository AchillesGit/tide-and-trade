import { formatGold, formatNumber, formatPercent } from "../util/formatHelper";
import styles from "./ItemInfo.module.css";

const StatsSumInfo = () => {

    const shipInfo = {
        name: "Battleship",
        gold: 15000,
        armor: 300,
        attackSpeed: 1.2,
        criticalChance: 0.25,
        criticalDamage: 1.75,
        evasionChance: 0.15,
        firepower: 500,
        hp: 2000,
    };


    return (
        <div className={styles.container}>

            {/* Name + Gold */}
            <div className={styles.nameContainer}>
                <h1 className={styles.title}>{shipInfo.name}</h1>
                <span className={styles.goldValue}>{formatGold(shipInfo.gold)}</span>
            </div>

            {/* Werte */}
            <div className={styles.valuesGrid}>
                <span className={styles.label}>Armor:</span>
                <span className={styles.value}>{formatNumber(shipInfo.armor)}</span>

                <span className={styles.label}>Attack Speed:</span>
                <span className={styles.value}>{formatNumber(shipInfo.attackSpeed)}</span>

                <span className={styles.label}>Critical Chance:</span>
                <span className={styles.value}>{formatPercent(shipInfo.criticalChance)}</span>

                <span className={styles.label}>Critical Damage:</span>
                <span className={styles.value}>{formatPercent(shipInfo.criticalDamage)}</span>

                <span className={styles.label}>Evasion Chance:</span>
                <span className={styles.value}>{formatPercent(shipInfo.evasionChance)}</span>

                <span className={styles.label}>Firepower:</span>
                <span className={styles.value}>{formatNumber(shipInfo.firepower)}</span>

                <span className={styles.label}>Ship HP +:</span>
                <span className={styles.value}>{formatNumber(shipInfo.hp)}</span>
            </div>
        </div>
    );
};
export default StatsSumInfo;