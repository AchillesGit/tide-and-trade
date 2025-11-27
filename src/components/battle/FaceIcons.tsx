import {
  GiBroadsword,
  GiCrossShield,
  GiHeartStake,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";

import type { FC } from "react";

import type { FaceEffect } from "../../types/battleTypes";

const FaceIcons: FC<FaceEffect> = ({
  attack = 0,
  defense = 0,
  attackMultiplier = 0,
  defenseMultiplier = 0,
  absDmg = 0,
  extraSelectNextRound = 0,
  cost = 1,
}) => {
  const elements: React.ReactNode[] = [];

  if (attack > 0) {
    const icons = Array.from({ length: attack }, (_, i) => (
      <GiBroadsword key={`a-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span key="attack" className="flex items-center gap-0.5 text-red-400">
        {icons}
      </span>,
    );
  }
  if (defense > 0) {
    const icons = Array.from({ length: defense }, (_, i) => (
      <GiCrossShield key={`d-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span key="defense" className="flex items-center gap-0.5 text-blue-300">
        {icons}
      </span>,
    );
  }
  if (absDmg > 0) {
    const icons = Array.from({ length: absDmg }, (_, i) => (
      <GiHeartStake key={`h-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span key="dmg" className="flex items-center gap-0.5 text-yellow-300">
        {icons}
      </span>,
    );
  }
  if (extraSelectNextRound > 0) {
    elements.push(
      <span
        key="extraSelectNextRound"
        className="flex items-center gap-0.5 text-green-400 text-xs font-bold"
      >
        +{extraSelectNextRound}
        <GiPerspectiveDiceSixFacesRandom className="w-3 h-3" />
      </span>,
    );
  }
  if (attackMultiplier > 1) {
    elements.push(
      <span key="attackM" className="text-red-500 text-xs font-bold">
        x{attackMultiplier}
      </span>,
    );
  }
  if (defenseMultiplier > 1) {
    elements.push(
      <span key="defenseM" className="text-blue-500 text-xs font-bold">
        x{defenseMultiplier}
      </span>,
    );
  }
  elements.push(
    <span key="cost" className="text-xs text-gray-400 font-mono">
      ({cost})
    </span>,
  );

  const hasEffect =
    attack ||
    defense ||
    absDmg ||
    extraSelectNextRound ||
    attackMultiplier > 1 ||
    defenseMultiplier > 1;
  return !hasEffect ? (
    <span className="text-xs opacity-50">-</span>
  ) : (
    <div className="flex items-center justify-center gap-1">{elements}</div>
  );
};

export default FaceIcons;
