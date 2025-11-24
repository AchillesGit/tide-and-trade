// import { useNavigate } from "react-router-dom";
// <button
//   className="border p-2 cursor-pointer"
//   onClick={async () => navigate("/shop")}
//   type="button"
// >
//   Shop
// </button>;
//   const navigate = useNavigate();

import {
  GiCash,
  GiPirateFlag,
  GiSurprisedSkull,
  GiTreasureMap,
  GiWoodBeam,
} from "react-icons/gi";

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
            strokeWidth={1}
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
              <circle cx={node.x} cy={node.y} fill="white" r={34} />
              <foreignObject
                height={36}
                width={36}
                x={node.x - 18}
                y={node.y - 18}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {node.nodeType === "battle" && (
                    <GiPirateFlag color="#45556c" size={36} />
                  )}
                  {node.nodeType === "boss" && (
                    <GiSurprisedSkull color="#45556c" size={36} />
                  )}
                  {node.nodeType === "shipyard" && (
                    <GiWoodBeam color="#45556c" size={36} />
                  )}
                  {node.nodeType === "shop" && (
                    <GiCash color="#45556c" size={36} />
                  )}
                  {node.nodeType === "treasure" && (
                    <GiTreasureMap color="#45556c" size={36} />
                  )}
                </div>
              </foreignObject>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

export default Map;
