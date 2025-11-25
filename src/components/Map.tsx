import {
  GiCash,
  GiIsland,
  GiJellyfish,
  GiJeweledChalice,
  GiMermaid,
  GiPirateFlag,
  GiRollingDices,
  GiShoonerSailboat,
  GiSurprisedSkull,
  GiTreasureMap,
  GiWoodBeam,
} from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { useGameStore } from "../store/gameStore";
import { edgePath, hash01 } from "../util/mapHelper";

import type { FC } from "react";

import type { Node } from "../types/mapTypes";

const Map: FC = () => {
  const { mapData, currentNodeId, setCurrentNodeId } = useGameStore();
  const navigate = useNavigate();

  if (!mapData) {
    return <div>Loading map…</div>;
  }

  const availableNextNodes: string[] = (() => {
    if (!currentNodeId) {
      return mapData.levels[0].map((lvl) => lvl.id);
    }
    return mapData.edges
      .filter((e) => e.from === currentNodeId)
      .map((e) => e.to);
  })();

  const onNodeClick = (node: Node) => {
    if (!availableNextNodes.includes(node.id)) return;
    setCurrentNodeId(node.id);
    navigate(`/${node.nodeType}`);
  };

  return (
    <svg height={window.innerHeight} width={window.innerWidth}>
      {/* Render edges as lines */}
      {mapData.edges.map((edge) => {
        const fromNode = mapData.levels.flat().find((n) => n.id === edge.from);
        const toNode = mapData.levels.flat().find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return null;

        const seed = `${edge.from}-${edge.to}`;
        const r = hash01(seed);

        const dashOffset = Math.round(r * 20);

        return (
          <path
            key={seed}
            d={edgePath(fromNode, toNode, seed)}
            fill="none"
            opacity={0.9}
            stroke="#6b6b6b"
            strokeDasharray="5 10"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            strokeWidth={2}
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
                height={50}
                overflow="visible"
                width={50}
                x={node.x - 25}
                y={node.y - 25}
              >
                {node.id === currentNodeId ? (
                  <GiShoonerSailboat
                    color="oklch(50.5% 0.213 27.518)"
                    size={36}
                  />
                ) : (
                  <button
                    onClick={() => onNodeClick(node)}
                    type="button"
                    className={`flex items-center justify-center hover:scale-110 transition-all cursor-pointer
                    ${
                      availableNextNodes.includes(node.id)
                        ? "animate-bounce"
                        : ""
                    }`}
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
                    {node.nodeType === "island" && (
                      <GiIsland color="#45556c" size={36} />
                    )}
                    {node.nodeType === "mermaid" && (
                      <GiMermaid color="#45556c" size={36} />
                    )}
                    {node.nodeType === "diamond" && (
                      <GiJeweledChalice color="#45556c" size={36} />
                    )}
                    {node.nodeType === "rollingDices" && (
                      <GiRollingDices color="#45556c" size={36} />
                    )}
                    {node.nodeType === "jellyfish" && (
                      <GiJellyfish color="#45556c" size={36} />
                    )}
                  </button>
                )}
              </foreignObject>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

export default Map;
