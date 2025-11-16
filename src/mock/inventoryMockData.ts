import type { ItemInstance } from "../types/inventoryTypes";

export const mockInventoryItems: ItemInstance[] = [
  {
    instanceId: "mock-inv-001",
    blueprintId: "wheat",
    direction: 0,
    origin: "inventory",
    position: { row: 3, col: 3 },
    level: 1,
  },
  {
    instanceId: "mock-inv-002",
    blueprintId: "wheat",
    direction: 0,
    origin: "inventory",
    position: { row: 3, col: 5 },
    level: 1,
  },
  {
    instanceId: "mock-inv-003",
    blueprintId: "cocoa",
    direction: 0,
    origin: "inventory",
    position: { row: 0, col: 0 },
    level: 1,
  },
  {
    instanceId: "mock-inv-004",
    blueprintId: "cannonBasic",
    direction: 0,
    origin: "inventory",
    position: { row: 2, col: 0 },
    level: 1,
  },
  {
    instanceId: "mock-inv-005",
    blueprintId: "rapidGatling",
    direction: 0,
    origin: "inventory",
    position: { row: 4, col: 0 },
    level: 1,
  },
  {
    instanceId: "mock-inv-006",
    blueprintId: "heavyCannon",
    direction: 0,
    origin: "inventory",
    position: { row: 6, col: 0 },
    level: 1,
  },
];

export const mockShopItems: ItemInstance[] = [
  {
    instanceId: "mock-shop-001",
    blueprintId: "rum",
    direction: 0,
    origin: "shop",
    position: { row: 1, col: 0 },
    level: 1,
  },
  {
    instanceId: "mock-shop-002",
    blueprintId: "rum",
    direction: 0,
    origin: "shop",
    position: { row: 1, col: 3 },
    level: 1,
  },
];

export const mockInventoryGrid: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const mockShopGrid: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
