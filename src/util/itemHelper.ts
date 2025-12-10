import { v4 as uuid } from "uuid";

import ItemBlueprints from "../blueprints/itemBlueprints";

import type {
  Item,
  ItemBlueprint,
  ItemInstance,
  ItemOrigin,
  ItemRarity,
} from "../types/inventoryTypes";

/**
 * Creates a new runtime instance of an item based on a given blueprint.
 *
 * @param blueprint - The static blueprint from which this item instance is created.
 * @param origin - The source where the item was generated (e.g. "shop" or "inventory").
 *                 Defaults to `"inventory"`.
 *
 * @returns A new {@link ItemInstance} object.
 */
export function createItemInstance(
  blueprint: ItemBlueprint,
  origin: ItemOrigin = "inventory",
): ItemInstance {
  return {
    instanceId: uuid(),
    blueprintId: blueprint.id,
    direction: 0,
    position: { row: 0, col: 0 },
    origin,
  };
}

/**
 * Resolves a complete {@link Item} object by combining an {@link ItemInstance}
 * with its referenced {@link ItemBlueprint}.
 *
 * The resulting object contains both:
 * - all static properties defined in the blueprint (e.g. name, stats, image, footprint)
 * - all dynamic properties from the instance (e.g. position, rotation, instanceId, level)
 *
 * This is typically used for rendering items in the UI or performing
 * gameplay logic where all item information must be available in one object.
 *
 * @param instance - The item instance to resolve into a full item.
 *
 * @returns A fully resolved {@link Item} that merges blueprint and instance data.
 */
export function resolveItem(instance: ItemInstance): Item {
  const blueprint = ItemBlueprints[instance.blueprintId];
  return {
    ...blueprint,
    ...instance,
  };
}

/**
 * Generates a single gambling item of the specified rarity.
 *
 * The function filters all available item blueprints to those matching
 * the requested rarity, randomly selects one, creates an item instance
 * for gambling purposes, and resolves it for use in the game.
 *
 * @param rarity - The desired rarity of the item (0-5 or your ItemRarity enum)
 * @returns A resolved Item instance of the given rarity ready for gambling
 * @throws Error if no blueprints exist for the specified rarity
 */
export function generateGamblingItem(rarity: ItemRarity): Item {
  const blueprints = Object.values(ItemBlueprints).filter(
    (blueprint) => blueprint.rarity === rarity,
  );

  if (blueprints.length === 0) {
    throw new Error(`No blueprints found for rarity ${rarity}`);
  }

  const randomBlueprint =
    blueprints[Math.floor(Math.random() * blueprints.length)];

  return resolveItem(createItemInstance(randomBlueprint, "gambling"));
}
