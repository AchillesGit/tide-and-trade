import type { Item, ItemRegistry } from "../types/inventoryTypes";

const mockItem: Item = {
  id: "item-001",
  name: "wheat",
  space: [[1], [1], [1]],
  image: "goods/wheat.png",
  direction: 0,
};

const mockItem2: Item = {
  id: "item-002",
  name: "wheat",
  space: [[1], [1], [1]],
  image: "goods/wheat.png",
  direction: 0,
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
};

export const mockInventoryItemRegistry: ItemRegistry[] = [
  { item: mockItem, position: { row: 3, col: 3 } },
  { item: mockItem2, position: { row: 3, col: 5 } },
  { item: mockItem5, position: { row: 0, col: 0 } },
];

export const mockShopItemRegistry: ItemRegistry[] = [
  { item: mockItem3, position: { row: 1, col: 0 } },
  { item: mockItem4, position: { row: 1, col: 3 } },
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
