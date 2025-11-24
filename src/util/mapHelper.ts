import type { Edge, MapData, Node } from "../types/mapTypes";
const levels = 6;
const maxNodesPerLevel = 5;
const width = 600;
const height = 800;
const chanceForTwoNodes = 0.35;

const createNode = (
  nodes: Node[],
  levelIndex: number,
  positionIndex: number,
  nodesInLevel: number,
): Node => {
  const existing = nodes.find(
    (n) => n.level === levelIndex && n.position === positionIndex,
  );
  if (existing) return existing;

  const xSpacing = width / (nodesInLevel + 1);
  const x = xSpacing * (positionIndex + 1);
  const y = (height / (levels + 1)) * (levelIndex + 1);

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

export function generateMap(): MapData {
  const levelsData: Node[][] = [];
  const edges: Edge[] = [];

  for (let lvl = 0; lvl < levels; lvl++) {
    const nodes: Node[] = [];

    if (lvl === 0) {
      createNode(nodes, lvl, 0, maxNodesPerLevel);
      createNode(
        nodes,
        lvl,
        Math.floor(maxNodesPerLevel / 2),
        maxNodesPerLevel,
      );
      createNode(nodes, lvl, maxNodesPerLevel - 1, maxNodesPerLevel);
    } else if (lvl === levels - 1) {
      createNode(
        nodes,
        lvl,
        Math.floor(maxNodesPerLevel / 2),
        maxNodesPerLevel,
      );
      for (const node of levelsData[lvl - 1]) {
        edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
      }
    } else {
      const prevLevel = levelsData[lvl - 1];
      const isShortLevel = lvl % 2 === 1;

      for (const node of prevLevel) {
        const { position } = node;

        if (isShortLevel) {
          if (position === 0) {
            createNode(nodes, lvl, 0, maxNodesPerLevel - 1);
            edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
            continue;
          }
          if (position === maxNodesPerLevel - 1) {
            createNode(nodes, lvl, maxNodesPerLevel - 2, maxNodesPerLevel - 1);
            edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
            continue;
          }
        }

        const newUpperPos = isShortLevel ? position - 1 : position;
        const newLowerPos = isShortLevel ? position : position + 1;

        if (Math.random() < chanceForTwoNodes) {
          createNode(
            nodes,
            lvl,
            newUpperPos,
            isShortLevel ? maxNodesPerLevel - 1 : maxNodesPerLevel,
          );
          edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
          createNode(
            nodes,
            lvl,
            newLowerPos,
            isShortLevel ? maxNodesPerLevel - 1 : maxNodesPerLevel,
          );
          edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
        } else {
          const newRandomPos = Math.random() < 0.5 ? newUpperPos : newLowerPos;
          createNode(
            nodes,
            lvl,
            newRandomPos,
            isShortLevel ? maxNodesPerLevel - 1 : maxNodesPerLevel,
          );
          edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
        }
      }
    }

    levelsData.push(nodes);
  }

  return { levels: levelsData, edges };
}
