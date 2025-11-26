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
      [0, 1],
    ],
    image: "items/cannon.png",
    baseValue: 150,
    rarity: 2,
    categories: ["weapon"],
    firepower: [10, 15, 20, 25, 30],
    attackSpeed: [0.1, 0.11, 0.12, 0.13, 0.14],
    criticalChance: [0.05, 0.07, 0.1, 0.12, 0.15],
    criticalDamage: [0.05, 0.06, 0.07, 0.08, 0.1],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0, 0, 0, 0, 0],
  },

  heavyCannon: {
    id: "heavyCannon",
    name: "Heavy Cannon",
    space: [
      [1, 1],
      [1, 1],
    ],
    image: "items/heavy_cannon.png",
    baseValue: 350,
    rarity: 3,
    categories: ["weapon"],
    firepower: [20, 28, 36, 45, 55],
    attackSpeed: [0.1, 0.11, 0.12, 0.13, 0.14],
    criticalChance: [0.08, 0.1, 0.12, 0.14, 0.17],
    criticalDamage: [0.08, 0.09, 0.1, 0.12, 0.15],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0.2, 0.3, 0.4, 0.5, 0.6],
  },

  rapidGatling: {
    id: "rapidGatling",
    name: "Rapid Gatling",
    space: [[1, 1, 1]],
    image: "items/rapid_gatling.png",
    baseValue: 300,
    rarity: 3,
    categories: ["weapon"],
    firepower: [8, 10, 13, 15, 18],
    attackSpeed: [0.1, 0.11, 0.12, 0.13, 0.14],
    criticalChance: [0.04, 0.06, 0.08, 0.1, 0.12],
    criticalDamage: [0.04, 0.05, 0.06, 0.07, 0.08],
    evasionChance: [0, 0, 0, 0, 0],
    shipHpIncrease: [0, 0, 0, 0, 0],
    armor: [0, 0, 0, 0, 0],
  },

  wheat: {
    id: "wheat",
    name: "Wheat",
    space: [[1], [1], [1]],
    image: "items/wheat.png",
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
    image: "items/rum.png",
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
    image: "items/cocoa.png",
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
