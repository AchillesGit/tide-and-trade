export type Node = {
  id: string;
  level: number;
  position: number;
  x: number;
  y: number;
};
export type Edge = { from: string; to: string };
export type MapData = { levels: Node[][]; edges: Edge[] };
