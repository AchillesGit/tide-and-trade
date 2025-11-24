import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// <button
//   className="border p-2 cursor-pointer"
//   onClick={async () => navigate("/shop")}
//   type="button"
// >
//   Shop
// </button>;
//   const navigate = useNavigate();

import type { FC } from "react";

const Map: FC = () => {
  const [mapData, setMapData] = useState<{
    levels: {
      id: number;
      level: number;
      position: number;
      x: number;
      y: number;
    }[][];
    edges: { from: number; to: number }[];
  } | null>(null);

  const levels = 6;
  const minNodesPerLevel = 2;
  const maxNodesPerLevel = 4;
  const width = 600;
  const height = 800;

  // Generate the map on mount or when the configuration changes. For
  // reproducibility you could seed the random number generator via a
  // library like seedrandom; for simplicity we use Math.random.
  useEffect(() => {
    function generateMap() {
      const levelsData: {
        id: number;
        level: number;
        position: number;
        x: number;
        y: number;
      }[][] = [];
      const edges: { from: number; to: number }[] = [];

      // Helper to generate a node with an id and random x position
      let nodeIdCounter = 0;
      const createNode = (
        levelIndex: number,
        positionIndex: number,
        nodesInLevel: number,
      ) => {
        const xSpacing = width / (nodesInLevel + 1);
        const x = xSpacing * (positionIndex + 1);
        const y = (height / (levels + 1)) * (levelIndex + 1);
        nodeIdCounter += 1;
        return {
          id: nodeIdCounter,
          level: levelIndex,
          position: positionIndex,
          x,
          y,
        };
      };

      // Generate nodes for each level
      for (let lvl = 0; lvl < levels; lvl++) {
        const nodes: {
          id: number;
          level: number;
          position: number;
          x: number;
          y: number;
        }[] = [];

        // Single start/end node if first or last level
        if (lvl === 0) {
          nodes.push(createNode(lvl, 0, 5));
          nodes.push(createNode(lvl, 2, 5));
          nodes.push(createNode(lvl, 4, 5));
        } else if (lvl === levels - 1) {
          nodes.push(createNode(lvl, 2, 5));
          for (const node of levelsData[lvl - 1]) {
            edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
          }
        } else {
          const prevLevel = levelsData[lvl - 1];
          const isShortLevel = lvl % 2 === 1;

          for (const node of prevLevel) {
            const { position } = node;

            if (isShortLevel) {
              // Special endpoints for short levels
              if (position === 0) {
                if (!nodes.some((n) => n.level === lvl && n.position === 0)) {
                  nodes.push(createNode(lvl, 0, 4));
                }
                edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
                continue;
              }
              if (position === 4) {
                if (!nodes.some((n) => n.level === lvl && n.position === 3)) {
                  nodes.push(createNode(lvl, 3, 4));
                }
                edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
                continue;
              }
            }

            if (Math.random() < 0.5) {
              // Connect to one or two nodes
              const newUpperPos = isShortLevel ? position - 1 : position;
              const newLowerPos = isShortLevel ? position : position + 1;
              if (
                !nodes.some(
                  (n) => n.level === lvl && n.position === newUpperPos,
                )
              ) {
                nodes.push(createNode(lvl, newUpperPos, isShortLevel ? 4 : 5));
              }
              edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
              if (
                !nodes.some(
                  (n) => n.level === lvl && n.position === newLowerPos,
                )
              ) {
                nodes.push(createNode(lvl, newLowerPos, isShortLevel ? 4 : 5));
              }
              edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
            } else {
              const newUpperPos = isShortLevel ? position - 1 : position;
              const newLowerPos = isShortLevel ? position : position + 1;
              const newRandomPos =
                Math.random() < 0.5 ? newUpperPos : newLowerPos;

              if (
                !nodes.some(
                  (n) => n.level === lvl && n.position === newRandomPos,
                )
              ) {
                nodes.push(createNode(lvl, newRandomPos, isShortLevel ? 4 : 5));
              }
              edges.push({ from: node.id, to: nodes[nodes.length - 1].id });
            }
          }
        }

        levelsData.push(nodes);
      }

      return { levels: levelsData, edges };
    }

    setMapData(generateMap());
  }, [levels, minNodesPerLevel, maxNodesPerLevel, width, height]);

  if (!mapData) {
    return <div>Loading map…</div>;
  }

  return (
    <svg
      height={height}
      style={{ border: "1px solid #ccc", background: "#fafafa" }}
      width={width}
    >
      {/* Render edges as lines */}
      {mapData.edges.map((edge) => {
        const fromNode = mapData.levels.flat().find((n) => n.id === edge.from);
        const toNode = mapData.levels.flat().find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return null;
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            stroke="#888"
            strokeWidth={2}
            x1={fromNode.x}
            x2={toNode.x}
            y1={fromNode.y}
            y2={toNode.y}
          />
        );
      })}

      {/* Render nodes */}
      {mapData.levels.map((levelNodes) => (
        <g key={levelNodes.map((n) => n.id).join("-")}>
          {levelNodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                fill="#e5e5e5"
                r={15}
                stroke="#333"
                strokeWidth={2}
              />
              {/* label the node with its id or type */}
              <text
                fill="#333"
                fontSize="10"
                textAnchor="middle"
                x={node.x}
                y={node.y + 5}
              >
                {node.id}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

export default Map;
