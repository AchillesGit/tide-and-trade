export interface Item {
  id: string;
  name: string;
  space: number[][];
  image: string;
  direction: Degree;
  position: Position;
  belongsToShop: boolean;
}

export type Degree = 90 | 180 | 270 | 0;

export interface Position {
  row: number;
  col: number;
}

export type Direction = "left" | "right";
