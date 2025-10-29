export interface Item {
  id: string;
  name: string;
  space: number[][];
  image: string;
  direction: number;
}

export interface ItemRegistry {
  item: Item;
  position: Position;
}

export interface Position {
  row: number;
  col: number;
}

export type Direction = "left" | "right";
