import type { Item } from "../types/inventoryTypes";

const mockItem: Item = {
  id: "item-001",
  name: "wheat",
  space: [[1], [1], [1]],
  image: "goods/wheat.png",
  direction: 0,
  belongsToShop: false,
  position: { row: 0, col: 0 },
};

const mockItem2: Item = {
  id: "item-002",
  name: "wheat",
  space: [[1], [1], [1]],
  image: "goods/wheat.png",
  direction: 0,
  belongsToShop: false,
  position: { row: 0, col: 0 },
};

const mockItem3: Item = {
  id: "item-003",
  name: "rum",
  space: [
    [1, 1],
    [1, 1],
    [1, 1],
  ],
  image: "goods/rum.png",
  direction: 0,
  belongsToShop: false,
  position: { row: 0, col: 0 },
};

const mockItem4: Item = {
  id: "item-004",
  name: "rum",
  space: [
    [1, 1],
    [1, 1],
    [1, 1],
  ],
  image: "goods/rum.png",
  direction: 0,
  belongsToShop: false,
  position: { row: 0, col: 0 },
};

const mockItem5: Item = {
  id: "item-005",
  name: "cocoa",
  space: [
    [1, 1],
    [1, 1],
  ],
  image: "goods/cocoa.png",
  direction: 0,
  belongsToShop: false,
  position: { row: 0, col: 0 },
};

export const mockInventoryItems: Item[] = [
  { ...mockItem, position: { row: 3, col: 3 }, belongsToShop: false },
  { ...mockItem2, position: { row: 3, col: 5 }, belongsToShop: false },
  { ...mockItem5, position: { row: 0, col: 0 }, belongsToShop: false },
];

export const mockShopItems: Item[] = [
  { ...mockItem3, position: { row: 1, col: 0 }, belongsToShop: true },
  { ...mockItem4, position: { row: 1, col: 3 }, belongsToShop: true },
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
