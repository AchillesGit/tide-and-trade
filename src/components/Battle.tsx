import React, { useState } from "react";

import { GiBroadsword, GiCrossShield } from "react-icons/gi";

interface FaceEffects {
  attack?: number;
  defense?: number;
}

const ATTACK_DIE_FACES: FaceEffects[] = [
  { attack: 1 },
  { attack: 1 },
  { attack: 2 },
  { attack: 0, defense: 0 },
  { attack: 0, defense: 0 },
  { attack: 0, defense: 0 },
];

const DEFENSE_DIE_FACES: FaceEffects[] = [
  { defense: 1 },
  { defense: 1 },
  { defense: 2 },
  { attack: 0, defense: 0 },
  { attack: 0, defense: 0 },
  { attack: 0, defense: 0 },
];

function rollFace(faces: FaceEffects[]): FaceEffects {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

const Battle: React.FC = () => {
  const [playerLife, setPlayerLife] = useState(10);
  const [computerLife, setComputerLife] = useState(10);

  const [playerDice, setPlayerDice] = useState<FaceEffects[]>([]);
  const [computerDice, setComputerDice] = useState<FaceEffects[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [rolled, setRolled] = useState(false);
  const [roundResult, setRoundResult] = useState<string>("");

  const handleRoll = () => {
    if (playerLife <= 0 || computerLife <= 0) return;
    const newPlayerDice: FaceEffects[] = [
      rollFace(ATTACK_DIE_FACES),
      rollFace(ATTACK_DIE_FACES),
      rollFace(DEFENSE_DIE_FACES),
      rollFace(DEFENSE_DIE_FACES),
    ];
    const newComputerDice: FaceEffects[] = [
      rollFace(ATTACK_DIE_FACES),
      rollFace(ATTACK_DIE_FACES),
      rollFace(DEFENSE_DIE_FACES),
      rollFace(DEFENSE_DIE_FACES),
    ];
    setPlayerDice(newPlayerDice);
    setComputerDice(newComputerDice);
    setSelectedIndices([]);
    setRoundResult("");
    setRolled(true);
  };

  const toggleSelect = (index: number) => {
    if (!rolled) return;
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else if (selectedIndices.length < 3) {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleResolve = () => {
    if (!rolled || selectedIndices.length !== 3) return;
    let playerAttack = 0;
    let playerDefense = 0;
    selectedIndices.forEach((idx) => {
      const result = playerDice[idx];
      playerAttack += result.attack ?? 0;
      playerDefense += result.defense ?? 0;
    });
    let computerAttack = 0;
    let computerDefense = 0;
    computerDice.forEach((res) => {
      computerAttack += res.attack ?? 0;
      computerDefense += res.defense ?? 0;
    });
    const damageToComputer = Math.max(playerAttack - computerDefense, 0);
    const damageToPlayer = Math.max(computerAttack - playerDefense, 0);
    const newPlayerLife = Math.max(playerLife - damageToPlayer, 0);
    const newComputerLife = Math.max(computerLife - damageToComputer, 0);
    setPlayerLife(newPlayerLife);
    setComputerLife(newComputerLife);
    let summary = `Du hast ${playerAttack} Angriff und ${playerDefense} Verteidigung gewürfelt. `;
    summary += `Der Gegner hat ${computerAttack} Angriff und ${computerDefense} Verteidigung gewürfelt. `;
    if (damageToComputer > 0) {
      summary += `Du fügst dem Gegner ${damageToComputer} Schaden zu. `;
    } else {
      summary += `Du konntest keinen Schaden verursachen. `;
    }
    if (damageToPlayer > 0) {
      summary += `Der Gegner fügt dir ${damageToPlayer} Schaden zu.`;
    } else {
      summary += `Der Gegner verursacht keinen Schaden.`;
    }
    setRoundResult(summary);
    setRolled(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4 bg-slate-900 text-slate-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center">Kampf</h2>
      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex-1 rounded-lg bg-slate-800 px-3 py-2">
          <p className="font-semibold">Du</p>
          <p className="mt-1 text-xs">
            Lebenspunkte:
            <span className="font-mono font-bold text-green-400">
              {playerLife}
            </span>
          </p>
        </div>
        <div className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-right">
          <p className="font-semibold">Gegner</p>
          <p className="mt-1 text-xs">
            Lebenspunkte:
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
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition cursor-pointer"
            type="button"
            onClick={() => {
              setPlayerLife(10);
              setComputerLife(10);
              setPlayerDice([]);
              setComputerDice([]);
              setSelectedIndices([]);
              setRoundResult("");
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
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition cursor-pointer"
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
                  Deine Würfel
                  <span className="text-xs font-normal text-slate-300">
                    (klicke, um drei auszuwählen)
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {playerDice.map((res, idx) => {
                    const isSelected = selectedIndices.includes(idx);
                    const selectedClasses = isSelected
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-400 bg-slate-800 text-slate-100";
                    const total = (res.attack ?? 0) + (res.defense ?? 0);
                    return (
                      <button
                        key={idx}
                        className={`min-w-12 rounded-md border px-3 py-2 text-sm font-semibold shadow-sm cursor-pointer select-none ${selectedClasses}`}
                        onClick={() => toggleSelect(idx)}
                        type="button"
                      >
                        {Array.from({ length: res.attack ?? 0 }).map((_, i) => (
                          <GiBroadsword
                            key={`a-${idx}-${i}`}
                            className="inline-block mx-0.5"
                          />
                        ))}
                        {Array.from({ length: res.defense ?? 0 }).map(
                          (_, i) => (
                            <GiCrossShield
                              key={`d-${idx}-${i}`}
                              className="inline-block mx-0.5"
                            />
                          ),
                        )}
                        {total === 0 && (
                          <span className="text-slate-500">-</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Gegnerische Würfel:</p>
                <div className="flex gap-2 flex-wrap">
                  {computerDice.map((res, idx) => {
                    const total = (res.attack ?? 0) + (res.defense ?? 0);
                    return (
                      <div
                        key={idx}
                        className="min-w-12 rounded-md border border-slate-500 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm text-center"
                      >
                        {Array.from({ length: res.attack ?? 0 }).map((_, i) => (
                          <GiBroadsword
                            key={`ca-${idx}-${i}`}
                            className="inline-block mx-0.5"
                          />
                        ))}
                        {Array.from({ length: res.defense ?? 0 }).map(
                          (_, i) => (
                            <GiCrossShield
                              key={`cd-${idx}-${i}`}
                              className="inline-block mx-0.5"
                            />
                          ),
                        )}
                        {total === 0 && (
                          <span className="text-slate-500">-</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>
                  Ausgewählt:
                  <span className="font-mono">
                    {" "}
                    {selectedIndices.length} / 3
                  </span>
                </p>
                <button
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedIndices.length !== 3}
                  onClick={handleResolve}
                  type="button"
                >
                  Runde berechnen
                </button>
              </div>
            </div>
          ) : null}
          {roundResult ? (
            <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-slate-800/80 px-4 py-3 text-sm">
              <p className="font-semibold mb-1">Rundenresultat</p>
              <p>{roundResult}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Battle;
