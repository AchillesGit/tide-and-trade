import {
  GiCoins,
  GiPirateCannon,
  GiPirateSkull,
  GiRoundShield,
  GiSaberAndPistol,
  GiToken,
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
      <GiSaberAndPistol key={`a-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span key="attack" className="flex items-center gap-0.5 text-red-400">
        {icons}
      </span>,
    );
  }
  if (defense > 0) {
    const icons = Array.from({ length: defense }, (_, i) => (
      <GiRoundShield key={`d-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span key="defense" className="flex items-center gap-0.5 text-blue-300">
        {icons}
      </span>,
    );
  }
  if (absDmg > 0) {
    const icons = Array.from({ length: absDmg }, (_, i) => (
      <GiPirateCannon key={`h-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span key="dmg" className="flex items-center gap-0.5 text-emerald-400">
        {icons}
      </span>,
    );
  }
  if (extraSelectNextRound > 0) {
    const diceIcons = Array.from({ length: extraSelectNextRound }, (_, i) => (
      <GiCoins key={`x-${i}`} className="w-4 h-4" />
    ));
    elements.push(
      <span
        key="extraSelectNextRound"
        className="flex items-center gap-0.5 text-yellow-400"
      >
        {diceIcons}
      </span>,
    );
  }

  if (attackMultiplier > 1) {
    elements.push(
      <span key="attackM" className="text-red-400 text-xs font-bold">
        x{attackMultiplier}
      </span>,
    );
  }
  if (defenseMultiplier > 1) {
    elements.push(
      <span key="defenseM" className="text-blue-300 text-xs font-bold">
        x{defenseMultiplier}
      </span>,
    );
  }
  if (cost > 0) {
    const coins = Array.from({ length: cost }, (_, i) => (
      <GiToken key={`coin-${i}`} className="w-2 h-2 text-yellow-400" />
    ));

    elements.push(
      <span key="cost" className="flex flex-col items-center">
        {coins}
      </span>,
    );
  }

  const hasEffect =
    attack ||
    defense ||
    absDmg ||
    extraSelectNextRound ||
    attackMultiplier > 1 ||
    defenseMultiplier > 1;
  return !hasEffect ? (
    <span className="flex items-center justify-center opacity-40 text-gray-400">
      <GiPirateSkull className="w-4 h-4" />
    </span>
  ) : (
    <div className="flex items-center justify-center gap-1">{elements}</div>
  );
};

export default FaceIcons;
