// import { useNavigate } from "react-router-dom";
// <button
//   className="border p-2 cursor-pointer"
//   onClick={async () => navigate("/shop")}
//   type="button"
// >
//   Shop
// </button>;
//   const navigate = useNavigate();

import { useGameStore } from "../store/gameStore";

import type { FC } from "react";

const Map: FC = () => {
  const { mapData } = useGameStore();

  if (!mapData) {
    return <div>Loading map…</div>;
  }

  return (
    <svg height={window.innerHeight} width={window.innerWidth}>
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
                {node.nodeType}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

export default Map;
