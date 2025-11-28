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
  green1: {
    id: "green1",
    name: "green1",
    space: [
      [0, 1],
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    image: "items/green1.png",
    baseValue: 2,
    rarity: 0,
    categories: ["green"],
  },
  green2: {
    id: "green2",
    name: "green2",
    space: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    image: "items/green2.png",
    baseValue: 5,
    rarity: 0,
    categories: ["green"],
  },
  green3: {
    id: "green3",
    name: "green3",
    space: [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    image: "items/green3.png",
    baseValue: 1,
    rarity: 0,
    categories: ["green"],
  },
  green4: {
    id: "green4",
    name: "green4",
    space: [
      [1, 0],
      [1, 1],
    ],
    image: "items/green4.png",
    baseValue: 8,
    rarity: 0,
    categories: ["green"],
  },
  green5: {
    id: "green5",
    name: "green5",
    space: [
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    image: "items/green5.png",
    baseValue: 2,
    rarity: 0,
    categories: ["green"],
  },
  green6: {
    id: "green6",
    name: "green6",
    space: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    image: "items/green6.png",
    baseValue: 5,
    rarity: 0,
    categories: ["green"],
  },
  violet1: {
    id: "violet1",
    name: "violet1",
    space: [
      [1, 1],
      [1, 1],
    ],
    image: "items/violet1.png",
    baseValue: 5,
    rarity: 0,
    categories: ["violet"],
  },
  violet2: {
    id: "violet2",
    name: "violet2",
    space: [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    image: "items/violet2.png",
    baseValue: 2,
    rarity: 0,
    categories: ["violet"],
  },
  violet3: {
    id: "violet3",
    name: "violet3",
    space: [
      [1, 1],
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    image: "items/violet3.png",
    baseValue: 1,
    rarity: 0,
    categories: ["violet"],
  },
  violet4: {
    id: "violet4",
    name: "violet4",
    space: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    image: "items/violet4.png",
    baseValue: 5,
    rarity: 0,
    categories: ["violet"],
  },
  violet5: {
    id: "violet5",
    name: "violet5",
    space: [[1], [1]],
    image: "items/violet5.png",
    baseValue: 12,
    rarity: 0,
    categories: ["violet"],
  },
  violet6: {
    id: "violet6",
    name: "violet6",
    space: [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    image: "items/violet6.png",
    baseValue: 1,
    rarity: 0,
    categories: ["violet"],
  },
  white1: {
    id: "white1",
    name: "white1",
    space: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    image: "items/white1.png",
    baseValue: 5,
    rarity: 0,
    categories: ["white"],
  },
  white2: {
    id: "white2",
    name: "white2",
    space: [
      [1, 1],
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    image: "items/white2.png",
    baseValue: 1,
    rarity: 0,
    categories: ["white"],
  },
  white3: {
    id: "white3",
    name: "white3",
    space: [
      [1, 1],
      [1, 1],
      [1, 0],
    ],
    image: "items/white3.png",
    baseValue: 2,
    rarity: 0,
    categories: ["white"],
  },
  white4: {
    id: "white4",
    name: "white4",
    space: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    image: "items/white4.png",
    baseValue: 1,
    rarity: 0,
    categories: ["white"],
  },
  white5: {
    id: "white5",
    name: "white5",
    space: [[1]],
    image: "items/white5.png",
    baseValue: 16,
    rarity: 0,
    categories: ["white"],
  },
  white6: {
    id: "white6",
    name: "white6",
    space: [
      [0, 1, 1],
      [0, 1, 0],
      [1, 1, 0],
    ],
    image: "items/white6.png",
    baseValue: 2,
    rarity: 0,
    categories: ["white"],
  },
  yellow1: {
    id: "yellow1",
    name: "yellow1",
    space: [
      [1, 0],
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    image: "items/yellow1.png",
    baseValue: 2,
    rarity: 0,
    categories: ["yellow"],
  },
  yellow2: {
    id: "yellow2",
    name: "yellow2",
    space: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    image: "items/yellow2.png",
    baseValue: 2,
    rarity: 0,
    categories: ["yellow"],
  },
  yellow3: {
    id: "yellow3",
    name: "yellow3",
    space: [[1], [1], [1]],
    image: "items/yellow3.png",
    baseValue: 8,
    rarity: 0,
    categories: ["yellow"],
  },
  yellow4: {
    id: "yellow4",
    name: "yellow4",
    space: [[1], [1], [1], [1]],
    image: "items/yellow4.png",
    baseValue: 5,
    rarity: 0,
    categories: ["yellow"],
  },
  yellow5: {
    id: "yellow5",
    name: "yellow5",
    space: [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    image: "items/yellow5.png",
    baseValue: 2,
    rarity: 0,
    categories: ["yellow"],
  },

  yellow6: {
    id: "yellow6",
    name: "yellow6",
    space: [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    image: "items/yellow6.png",
    baseValue: 2,
    rarity: 0,
    categories: ["yellow"],
  },
};

export default ItemBlueprints;
