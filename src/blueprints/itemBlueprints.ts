import type { ItemBlueprint } from "../types/inventoryTypes";

/**
 * A registry containing all available item blueprints in the game.
 *
 * Each blueprint defines the static, non-changing data of an item such as:
 * - visual appearance
 * - footprint size
 * - base stats
 * - per-level stat progression
 * - rarity, category, base value
 *
 * Blueprints serve as templates from which runtime instances are created.
 *
 * @remarks
 * The key of the record is the blueprint's unique ID.
 */
const ItemBlueprints: Record<string, ItemBlueprint> = {
  cannonBasic: {
    id: "cannonBasic",
    name: "Basic Cannon",
    space: [
      [1, 1],
      [1, 0],
    ],
    image: "/assets/items/cannon.png",
    baseValue: 150,
    rarity: 2,
    categories: ["weapon"],
    firepower: [10, 15, 20, 25, 30],
    attackSpeed: [1.0, 1.1, 1.2, 1.3, 1.4],
    criticalChance: [0.05, 0.07, 0.1, 0.12, 0.15],
    criticalDamage: [1.5, 1.6, 1.7, 1.8, 2.0],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0, 0, 0, 0, 0],
  },

  wheat: {
    id: "wheat",
    name: "Wheat",
    space: [[1], [1], [1]],
    image: "goods/wheat.png",
    baseValue: 50,
    rarity: 1,
    categories: ["commodity"],
    firepower: [0, 0, 0, 0, 0],
    attackSpeed: [0, 0, 0, 0, 0],
    criticalChance: [0, 0, 0, 0, 0],
    criticalDamage: [0, 0, 0, 0, 0],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0, 0, 0, 0, 0],
  },

  rum: {
    id: "rum",
    name: "Rum",
    space: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    image: "goods/rum.png",
    baseValue: 50,
    rarity: 1,
    categories: ["commodity"],
    firepower: [0, 0, 0, 0, 0],
    attackSpeed: [0, 0, 0, 0, 0],
    criticalChance: [0, 0, 0, 0, 0],
    criticalDamage: [0, 0, 0, 0, 0],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0, 0, 0, 0, 0],
  },

  cocoa: {
    id: "cocoa",
    name: "Cocoa",
    space: [
      [1, 1],
      [1, 1],
    ],
    image: "goods/cocoa.png",
    baseValue: 50,
    rarity: 1,
    categories: ["commodity"],
    firepower: [0, 0, 0, 0, 0],
    attackSpeed: [0, 0, 0, 0, 0],
    criticalChance: [0, 0, 0, 0, 0],
    criticalDamage: [0, 0, 0, 0, 0],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0, 0, 0, 0, 0],
  },
};

export default ItemBlueprints;
