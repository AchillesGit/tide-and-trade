import React, { useState } from "react";

import {
  GiBroadsword,
  GiCrossShield,
  GiHeartStake,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface FaceEffect {
  attack?: number;
  defense?: number;
  attackMultiplier?: number;
  defenseMultiplier?: number;
  absDmg?: number;
  extraSelectNextRound?: number;
  cost?: number;
}

interface Dice {
  id: string;
  faces: FaceEffect[];
}

interface DiceState {
  player: Dice[];
  enemy: Dice[];
}

interface RollResult {
  id: string;
  face: FaceEffect;
}

interface RollsState {
  player: RollResult[];
  enemy: RollResult[];
}
const ATTACK_DIE_FACES: FaceEffect[] = [
  { attack: 1, cost: 1 },
  { attack: 1, cost: 1 },
  { attack: 1, cost: 1 },
  { attack: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

const DEFENSE_DIE_FACES: FaceEffect[] = [
  { defense: 1, cost: 1 },
  { defense: 1, cost: 1 },
  { defense: 1, cost: 1 },
  { defense: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

const HYBRID_DIE_FACES: FaceEffect[] = [
  { attack: 1, defense: 1, cost: 2 },
  { attack: 1, defense: 1, cost: 2 },
  { attack: 1, defense: 1, cost: 2 },
  { attack: 2, defense: 2, cost: 4 },
  { cost: 0 },
  { cost: 0 },
];

const ENEMY_DIE_FACES: FaceEffect[] = [
  { attack: 1 },
  { attack: 1 },
  { defense: 1 },
];

const MULTIPLY_ATTACK_DIE_FACES: FaceEffect[] = [
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 2, cost: 1 },
  { attackMultiplier: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

const MULTIPLY_DEFENSE_DIE_FACES: FaceEffect[] = [
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 2, cost: 1 },
  { defenseMultiplier: 3, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

const DAMAGE_DIE_FACES: FaceEffect[] = [
  { absDmg: 3, cost: 3 },
  { absDmg: 3, cost: 3 },
  { absDmg: 3, cost: 3 },
  { absDmg: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

const EXTRA_SELECT_DIE_FACES: FaceEffect[] = [
  { extraSelectNextRound: 1, cost: 1 },
  { extraSelectNextRound: 1, cost: 1 },
  { extraSelectNextRound: 1, cost: 1 },
  { extraSelectNextRound: 2, cost: 2 },
  { cost: 0 },
  { cost: 0 },
];

function rollFace(faces: FaceEffect[]): FaceEffect {
  const idx = Math.floor(Math.random() * faces.length);
  return faces[idx];
}

function rollAll(diceList: Dice[]): RollResult[] {
  return diceList.map((d) => ({ id: d.id, face: rollFace(d.faces) }));
}

function createDie(faces: FaceEffect[]): Dice {
  return { id: Math.random().toString(36).slice(2), faces };
}

const dices: DiceState = {
  player: [
    createDie(ATTACK_DIE_FACES),
    createDie(ATTACK_DIE_FACES),
    createDie(ATTACK_DIE_FACES),
    createDie(HYBRID_DIE_FACES),
    createDie(HYBRID_DIE_FACES),
    createDie(DEFENSE_DIE_FACES),
    createDie(DEFENSE_DIE_FACES),
    createDie(MULTIPLY_ATTACK_DIE_FACES),
    createDie(MULTIPLY_DEFENSE_DIE_FACES),
    createDie(DAMAGE_DIE_FACES),
    createDie(EXTRA_SELECT_DIE_FACES),
  ],
  enemy: [
    createDie(ENEMY_DIE_FACES),
    createDie(ENEMY_DIE_FACES),
    createDie(ENEMY_DIE_FACES),
    createDie(ENEMY_DIE_FACES),
  ],
};

const DEFAULT_MAX_ACTIONS = 3;

const Battle: React.FC = () => {
  const navigate = useNavigate();
  const [playerLife, setPlayerLife] = useState(10);
  const [computerLife, setComputerLife] = useState(10);
  const [rolls, setRolls] = useState<RollsState>({ player: [], enemy: [] });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rolled, setRolled] = useState(false);
  const [maxActions, setMaxActions] = useState<number>(DEFAULT_MAX_ACTIONS);

  const handleRoll = () => {
    if (playerLife <= 0 || computerLife <= 0) return;
    setRolls({
      player: rollAll(dices.player),
      enemy: rollAll(dices.enemy),
    });
    setSelectedIds([]);
    setRolled(true);
  };

  const toggleSelect = (id: string) => {
    if (!rolled) return;
    const currentCost = selectedIds.reduce((sum, sid) => {
      const roll = rolls.player.find((r) => r.id === sid);
      return sum + (roll?.face.cost ?? 1);
    }, 0);

    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    } else {
      const roll = rolls.player.find((r) => r.id === id);
      const cost = roll?.face.cost ?? 1;
      if (currentCost + cost <= maxActions) {
        setSelectedIds((prev) => [...prev, id]);
      }
    }
  };

  const handleResolve = () => {
    if (!rolled) return;
    const totalCost = selectedIds.reduce((sum, sid) => {
      const roll = rolls.player.find((r) => r.id === sid);
      return sum + (roll?.face.cost ?? 1);
    }, 0);
    if (totalCost !== maxActions) return;
    if (rolls.player.length === 0 || rolls.enemy.length === 0) return;

    let playerAttack = 0;
    let playerDefense = 0;
    let playerAttackMultiplier = 1;
    let playerDefenseMultiplier = 1;
    let playerAbsDamage = 0;
    let extraSelectSum = 0;

    selectedIds.forEach((id) => {
      const roll = rolls.player.find((r) => r.id === id);
      if (!roll) return;
      const { face } = roll;
      playerAttack += face.attack ?? 0;
      playerDefense += face.defense ?? 0;
      if (face.attackMultiplier)
        playerAttackMultiplier *= face.attackMultiplier;
      if (face.defenseMultiplier)
        playerDefenseMultiplier *= face.defenseMultiplier;
      if (face.absDmg) playerAbsDamage += face.absDmg;
      if (face.extraSelectNextRound)
        extraSelectSum += face.extraSelectNextRound;
    });

    const totalPlayerAttack = playerAttack * playerAttackMultiplier;
    const totalPlayerDefense = playerDefense * playerDefenseMultiplier;

    let enemyAttack = 0;
    let enemyDefense = 0;
    rolls.enemy.forEach((r) => {
      enemyAttack += r.face.attack ?? 0;
      enemyDefense += r.face.defense ?? 0;
    });

    const damageToComputer =
      Math.max(totalPlayerAttack - enemyDefense, 0) + playerAbsDamage;
    const damageToPlayer = Math.max(enemyAttack - totalPlayerDefense, 0);

    setPlayerLife(Math.max(playerLife - damageToPlayer, 0));
    setComputerLife(Math.max(computerLife - damageToComputer, 0));

    setMaxActions(DEFAULT_MAX_ACTIONS + extraSelectSum);
    setRolled(false);
  };

  const renderFaceIcons = (face: FaceEffect) => {
    const atk = face.attack ?? 0;
    const def = face.defense ?? 0;
    const atkMult = face.attackMultiplier ?? 0;
    const defMult = face.defenseMultiplier ?? 0;
    const absDmg = face.absDmg ?? 0;
    const extra = face.extraSelectNextRound ?? 0;
    const cost = face.cost ?? 1;

    const elements: React.ReactNode[] = [];

    if (atk > 0) {
      const icons = Array.from({ length: atk }, (_, i) => (
        <GiBroadsword key={`a-${i}`} className="w-4 h-4" />
      ));
      elements.push(
        <span key="atk" className="flex items-center gap-0.5 text-red-400">
          {icons}
        </span>,
      );
    }
    if (def > 0) {
      const icons = Array.from({ length: def }, (_, i) => (
        <GiCrossShield key={`d-${i}`} className="w-4 h-4" />
      ));
      elements.push(
        <span key="def" className="flex items-center gap-0.5 text-blue-300">
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
    if (extra > 0) {
      elements.push(
        <span
          key="extra"
          className="flex items-center gap-0.5 text-green-400 text-xs font-bold"
        >
          +{extra}
          <GiPerspectiveDiceSixFacesRandom className="w-3 h-3" />
        </span>,
      );
    }
    if (atkMult > 1) {
      elements.push(
        <span key="atkM" className="text-red-500 text-xs font-bold">
          ×{atkMult}
        </span>,
      );
    }
    if (defMult > 1) {
      elements.push(
        <span key="defM" className="text-blue-500 text-xs font-bold">
          ×{defMult}
        </span>,
      );
    }
    // Kosten anzeigen (in Klammern)
    elements.push(
      <span key="cost" className="text-xs text-gray-400 font-mono">
        ({cost})
      </span>,
    );

    const hasEffect =
      atk || def || absDmg || extra || atkMult > 1 || defMult > 1;
    return !hasEffect ? (
      <span className="text-xs opacity-50">-</span>
    ) : (
      <div className="flex items-center justify-center gap-1">{elements}</div>
    );
  };

  const primaryButtonClasses =
    "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer";
  const diceButtonBase =
    "min-w-[3rem] rounded-md border px-3 py-2 text-sm font-semibold shadow-sm cursor-pointer select-none";

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4 bg-slate-900 text-slate-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center">Kampf</h2>

      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex-1 rounded-lg bg-slate-800 px-3 py-2">
          <p className="font-semibold">Du</p>
          <p className="mt-1 text-xs">
            Lebenspunkte:{" "}
            <span className="font-mono font-bold text-green-400">
              {playerLife}
            </span>
          </p>
        </div>
        <div className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-right">
          <p className="font-semibold">Gegner</p>
          <p className="mt-1 text-xs">
            Lebenspunkte:{" "}
            <span className="font-mono font-bold text-red-400">
              {computerLife}
            </span>
          </p>
        </div>
      </div>

      {playerLife <= 0 || computerLife <= 0 ? (
        <div className="mt-4 space-y-3 text-center">
          <h3 className="text-xl font-bold">
            {playerLife <= 0 ? "Du hast verloren" : "Du hast gewonnen!"}
          </h3>
          <button
            className={primaryButtonClasses}
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Weiter
          </button>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {!rolled && (
            <div className="flex justify-center">
              <button
                className={primaryButtonClasses}
                onClick={handleRoll}
                type="button"
              >
                Würfeln
              </button>
            </div>
          )}

          {rolled ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  Deine Würfel{" "}
                  <span className="text-xs font-normal text-slate-300">
                    (klicke, um drei auszuwählen)
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {rolls.player.map((roll) => {
                    const isSelected = selectedIds.includes(roll.id);
                    const selectedClasses = isSelected
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-400 bg-slate-800 text-slate-100";

                    return (
                      <button
                        key={roll.id}
                        className={`${diceButtonBase} ${selectedClasses}`}
                        onClick={() => toggleSelect(roll.id)}
                        type="button"
                      >
                        {renderFaceIcons(roll.face)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Gegnerische Würfel:</p>
                <div className="flex gap-2 flex-wrap">
                  {rolls.enemy.map((roll) => (
                    <div
                      key={roll.id}
                      className="min-w-12 rounded-md border border-slate-500 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm text-center"
                    >
                      {renderFaceIcons(roll.face)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p>
                  Aktionen:{" "}
                  <span className="font-mono">
                    {selectedIds.reduce((sum, sid) => {
                      const roll = rolls.player.find((r) => r.id === sid);
                      return sum + (roll?.face.cost ?? 1);
                    }, 0)}
                  </span>{" "}
                  / {maxActions}
                </p>
                <button
                  className={primaryButtonClasses}
                  onClick={handleResolve}
                  type="button"
                  disabled={
                    selectedIds.reduce((sum, sid) => {
                      const roll = rolls.player.find((r) => r.id === sid);
                      return sum + (roll?.face.cost ?? 1);
                    }, 0) !== maxActions
                  }
                >
                  Runde berechnen
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Battle;
