import type { Item } from "../types/inventoryTypes";

const mockItem: Item = {
  id: "item-001",
  name: "wheat",
  space: [[1], [1], [1]],
  image: "goods/wheat.png",
  direction: 0,
  origin: "inventory",
  position: { row: 3, col: 3 },
  baseValue: 50,
};

const mockItem2: Item = {
  id: "item-002",
  name: "wheat",
  space: [[1], [1], [1]],
  image: "goods/wheat.png",
  direction: 0,
  origin: "inventory",
  position: { row: 3, col: 5 },
  baseValue: 50,
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
  origin: "shop",
  position: { row: 1, col: 0 },
  baseValue: 50,
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
  origin: "shop",
  position: { row: 1, col: 3 },
  baseValue: 50,
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
  origin: "inventory",
  position: { row: 0, col: 0 },
  baseValue: 50,
};

export const mockInventoryItems: Item[] = [
  { ...mockItem },
  { ...mockItem2 },
  { ...mockItem5 },
];

export const mockShopItems: Item[] = [{ ...mockItem3 }, { ...mockItem4 }];

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
