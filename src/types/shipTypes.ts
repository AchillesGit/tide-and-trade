export interface Ship {
    /** Name of the ship*/
    name: string;

    /** Current HP*/
    hp: number;

    /** Maximum HP*/
    maxHp: number;

    /** Firepower per level. Index corresponds to level - 1 (e.g. index 0 = level 1, index 4 = level 5). */
    firepower: number;

    /** Attack speed per level */
    attackSpeed: number;

    /** Critical hit chance per level (e.g. 0.15 = 15%) */
    criticalChance: number;

    /** Critical hit damage multiplier per level (e.g. 1.5 = +50% damage) */
    criticalDamage: number;

    /** Armor value per level */
    armor: number;

    /** Evasion chance per level (e.g. 0.10 = 10%) */
    evasionChance: number;

    /** Summed up Gold */
    gold: number;


}