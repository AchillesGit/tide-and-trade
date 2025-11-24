export type Node = {
  id: number;
  level: number;
  position: number;
  x: number;
  y: number;
};
export type Edge = { from: number; to: number };
export type MapData = { levels: Node[][]; edges: Edge[] };
