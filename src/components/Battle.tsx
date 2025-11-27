import React, { useState } from "react";

import { GiBroadsword, GiCrossShield } from "react-icons/gi";

interface FaceEffects {
  attack?: number;
  defense?: number;
}

type Dice = FaceEffects[];
interface DiceState {
  player: Dice[];
  enemy: Dice[];
}

interface RollsState {
  player: FaceEffects[];
  enemy: FaceEffects[];
}

const ATTACK_DIE_FACES: Dice = [
  { attack: 1 },
  { attack: 1 },
  { attack: 2 },
  { attack: 1, defense: 1 },
  { attack: 1, defense: 1 },
  { attack: 0, defense: 0 },
];

const DEFENSE_DIE_FACES: Dice = [
  { defense: 1 },
  { defense: 1 },
  { defense: 2 },
  { attack: 1, defense: 1 },
  { attack: 1, defense: 1 },
  { attack: 0, defense: 0 },
];

function rollFace(faces: Dice): FaceEffects {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

function rollAll(diceList: Dice[]): FaceEffects[] {
  return diceList.map((die) => rollFace(die));
}

const Battle: React.FC = () => {
  const [playerLife, setPlayerLife] = useState(10);
  const [computerLife, setComputerLife] = useState(10);

  const [dices, setDices] = useState<DiceState>({
    player: [
      ATTACK_DIE_FACES,
      ATTACK_DIE_FACES,
      DEFENSE_DIE_FACES,
      DEFENSE_DIE_FACES,
    ],
    enemy: [
      ATTACK_DIE_FACES,
      ATTACK_DIE_FACES,
      DEFENSE_DIE_FACES,
      DEFENSE_DIE_FACES,
    ],
  });

  const [rolls, setRolls] = useState<RollsState>({
    player: [],
    enemy: [],
  });

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [rolled, setRolled] = useState(false);

  const primaryButtonClasses =
    "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition";
  const diceButtonBase =
    "min-w-[3rem] rounded-md border px-3 py-2 text-sm font-semibold shadow-sm cursor-pointer select-none";

  const handleRoll = () => {
    if (playerLife <= 0 || computerLife <= 0) return;

    const playerRolls = rollAll(dices.player);
    const enemyRolls = rollAll(dices.enemy);

    setRolls({
      player: playerRolls,
      enemy: enemyRolls,
    });
    setSelectedIndices([]);
    setRolled(true);
  };

  const toggleSelect = (index: number) => {
    if (!rolled) return;
    if (selectedIndices.includes(index)) {
      setSelectedIndices((prev) => prev.filter((i) => i !== index));
    } else if (selectedIndices.length < 3) {
      setSelectedIndices((prev) => [...prev, index]);
    }
  };

  const handleResolve = () => {
    if (!rolled || selectedIndices.length !== 3) return;
    if (rolls.player.length === 0 || rolls.enemy.length === 0) return;

    let playerAttack = 0;
    let playerDefense = 0;

    selectedIndices.forEach((idx) => {
      const face = rolls.player[idx];
      playerAttack += face.attack ?? 0;
      playerDefense += face.defense ?? 0;
    });

    let enemyAttack = 0;
    let enemyDefense = 0;

    rolls.enemy.forEach((face) => {
      enemyAttack += face.attack ?? 0;
      enemyDefense += face.defense ?? 0;
    });

    const damageToComputer = Math.max(playerAttack - enemyDefense, 0);
    const damageToPlayer = Math.max(enemyAttack - playerDefense, 0);

    const newPlayerLife = Math.max(playerLife - damageToPlayer, 0);
    const newComputerLife = Math.max(computerLife - damageToComputer, 0);
    setPlayerLife(newPlayerLife);
    setComputerLife(newComputerLife);

    setRolled(false);
  };

  const renderFaceIcons = (face: FaceEffects) => {
    const atk = face.attack ?? 0;
    const def = face.defense ?? 0;

    if (atk === 0 && def === 0) {
      return <span className="text-xs opacity-50">–</span>;
    }

    const atkIcons = Array.from({ length: atk }, (_, i) => (
      <GiBroadsword key={`a-${i}`} className="w-4 h-4" />
    ));
    const defIcons = Array.from({ length: def }, (_, i) => (
      <GiCrossShield key={`d-${i}`} className="w-4 h-4" />
    ));

    return (
      <div className="flex items-center justify-center gap-1">
        {atkIcons.length > 0 && (
          <span className="flex items-center gap-0.5 text-red-400">
            {atkIcons}
          </span>
        )}
        {defIcons.length > 0 && (
          <span className="flex items-center gap-0.5 text-blue-300">
            {defIcons}
          </span>
        )}
      </div>
    );
  };

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
              setPlayerLife(10);
              setComputerLife(10);
              setRolls({ player: [], enemy: [] });
              setSelectedIndices([]);
              setRolled(false);
            }}
          >
            Neu starten
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
                  {rolls.player.map((face, idx) => {
                    const isSelected = selectedIndices.includes(idx);
                    const selectedClasses = isSelected
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-400 bg-slate-800 text-slate-100";
                    return (
                      <button
                        key={idx}
                        className={`${diceButtonBase} ${selectedClasses}`}
                        onClick={() => toggleSelect(idx)}
                        type="button"
                      >
                        {renderFaceIcons(face)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Gegnerische Würfel:</p>
                <div className="flex gap-2 flex-wrap">
                  {rolls.enemy.map((face, idx) => (
                    <div
                      key={idx}
                      className="min-w-12 rounded-md border border-slate-500 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm text-center"
                    >
                      {renderFaceIcons(face)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p>
                  Ausgewählt:{" "}
                  <span className="font-mono">
                    {selectedIndices.length} / 3
                  </span>
                </p>
                <button
                  className={primaryButtonClasses}
                  disabled={selectedIndices.length !== 3}
                  onClick={handleResolve}
                  type="button"
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
