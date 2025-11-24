import type { Edge, MapData, Node } from "../types/mapTypes";

/** Number of vertical levels in the generated map. */
const levels = 6;

/** Maximum number of nodes per level. */
const maxNodesPerLevel = 5;

/** Total width (in px) of the map layout. */
const width = window.innerWidth;

/** Total height (in px) of the map layout. */
const height = window.innerHeight;

/** Chance (0–1) that a node branches into two nodes on the next level. */
const chanceForTwoNodes = 0.35;

/**
 * Creates a node at a specified level and position. If the node already exists (same level + position),
 * the existing node is returned instead of creating a new one.
 *
 * @param nodes - List of existing nodes in the current level.
 * @param levelIndex - The vertical level this node belongs to.
 * @param positionIndex - Horizontal index within the level.
 * @param nodesInLevel - Total nodes expected in this level (used to space positions).
 * @returns The created or reused Node.
 */
const createNode = (
  nodes: Node[],
  levelIndex: number,
  positionIndex: number,
  nodesInLevel: number,
): Node => {
  // Check if we already created this node for the level/position.
  const existing = nodes.find(
    (n) => n.level === levelIndex && n.position === positionIndex,
  );
  if (existing) return existing;

  // Compute vertical spacing (positions within a level) and coordinates.
  const ySpacing = height / (nodesInLevel + 1);
  const y = ySpacing * (positionIndex + 1);
  const x = (width / (levels + 1)) * (levelIndex + 1);

  const node: Node = {
    id: crypto.randomUUID(),
    level: levelIndex,
    position: positionIndex,
    x,
    y,
  };

  nodes.push(node);
  return node;
};

/**
 * Generates a multi‑level directed graph structure representing a map layout.
 * Each level has nodes positioned horizontally, and edges connect nodes to nodes
 * in the next level based on branching rules.
 *
 * @returns A MapData object containing all levels and edges.
 */
function generateMap(): MapData {
  const levelsData: Node[][] = [];
  const edges: Edge[] = [];

  for (let lvl = 0; lvl < levels; lvl += 1) {
    const nodes: Node[] = [];

    if (lvl === 0) {
      // First level: always create 3 starting nodes.
      createNode(nodes, lvl, 0, maxNodesPerLevel);
      createNode(
        nodes,
        lvl,
        Math.floor(maxNodesPerLevel / 2),
        maxNodesPerLevel,
      );
      createNode(nodes, lvl, maxNodesPerLevel - 1, maxNodesPerLevel);
    } else if (lvl === levels - 1) {
      // Final level: create a single central node.
      createNode(
        nodes,
        lvl,
        Math.floor(maxNodesPerLevel / 2),
        maxNodesPerLevel,
      );

      // Connect all nodes from the previous level to this final node.
      levelsData[lvl - 1].forEach((node) => {
        edges.push({
          from: node.id,
          to: nodes[nodes.length - 1].id,
        });
      });
    } else {
      const prevLevel = levelsData[lvl - 1];
      const isShortLevel = lvl % 2 === 1; // Odd levels have fewer horizontal positions.

      prevLevel.forEach((node) => {
        const { position } = node;

        // Special handling for short levels: clamp edge positions.
        if (isShortLevel) {
          // Upmost node: always connect to the upmost new node.
          if (position === 0) {
            createNode(nodes, lvl, 0, maxNodesPerLevel - 1);
            edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
            return;
          }
          // Most down node: always connect to the down most new node.
          if (position === maxNodesPerLevel - 1) {
            createNode(nodes, lvl, maxNodesPerLevel - 2, maxNodesPerLevel - 1);
            edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
            return;
          }
        }

        // Compute potential new positions for this node.
        const newUpperPos = isShortLevel ? position - 1 : position;
        const newLowerPos = isShortLevel ? position : position + 1;

        // Branch into one or two nodes.
        if (Math.random() < chanceForTwoNodes) {
          // Upper branch.
          createNode(
            nodes,
            lvl,
            newUpperPos,
            isShortLevel ? maxNodesPerLevel - 1 : maxNodesPerLevel,
          );
          edges.push({ from: node.id, to: nodes[nodes.length - 1].id });

          // Lower branch.
          createNode(
            nodes,
            lvl,
            newLowerPos,
            isShortLevel ? maxNodesPerLevel - 1 : maxNodesPerLevel,
          );
          edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
        } else {
          // Single branch to a random one of the two possible positions.
          const newRandomPos = Math.random() < 0.5 ? newUpperPos : newLowerPos;
          createNode(
            nodes,
            lvl,
            newRandomPos,
            isShortLevel ? maxNodesPerLevel - 1 : maxNodesPerLevel,
          );
          edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
        }
      });
    }

    levelsData.push(nodes);
  }

  return { levels: levelsData, edges };
}

export default generateMap;
