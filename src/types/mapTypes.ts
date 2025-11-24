/** Represents a single node within the generated map. */
export interface Node {
  /** Unique identifier of the node. */
  id: string;
  /** Vertical level index this node belongs to (0 = top level). */
  level: number;
  /** Horizontal position index within its level. */
  position: number;
  /** X-coordinate of the node in the visual layout. */
  x: number;
  /** Y-coordinate of the node in the visual layout. */
  y: number;
  /** Type of encounter this node represents. */
  nodeType: NodeType;
}

/** Type of encounter on the map. */
export type NodeType = "shop" | "battle" | "treasure" | "shipyard" | "boss";

/** List of all possible node encounter types that can appear on the map (boss is excluded). */
export const nodeTypes: NodeType[] = ["shop", "battle", "treasure", "shipyard"];

/**
 * Represents a directed connection between two nodes.
 * Each edge has a source node (from) and a target node (to).
 */
export interface Edge {
  /** ID of the source node. */
  from: string;
  /** ID of the target node. */
  to: string;
}

/**
 * The full data structure returned by the map generator.
 * Contains an array of levels, where each level contains its nodes,
 * and a list of all edges connecting nodes across levels.
 */
export interface MapData {
  /** Nested list of nodes grouped by level. */
  levels: Node[][];
  /** List of all directed edges in the graph. */
  edges: Edge[];
}
