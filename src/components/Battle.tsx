import React, { useState } from "react";

const ATTACK_DIE: number[] = [1, 1, 2, 0, 0, 0];
const DEFENSE_DIE: number[] = [1, 1, 2, 0, 0, 0];

interface DiceResult {
  type: "attack" | "defense";
  value: number;
}

function rollAttack(): DiceResult {
  const index = Math.floor(Math.random() * ATTACK_DIE.length);
  return { type: "attack", value: ATTACK_DIE[index] };
}

function rollDefense(): DiceResult {
  const index = Math.floor(Math.random() * DEFENSE_DIE.length);
  return { type: "defense", value: DEFENSE_DIE[index] };
}

const Battle: React.FC = () => {
  const [playerLife, setPlayerLife] = useState(10);
  const [computerLife, setComputerLife] = useState(10);

  const [playerDice, setPlayerDice] = useState<DiceResult[]>([]);
  const [computerDice, setComputerDice] = useState<DiceResult[]>([]);

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const [rolled, setRolled] = useState(false);

  const [roundResult, setRoundResult] = useState<string>("");

  const handleRoll = () => {
    if (playerLife <= 0 || computerLife <= 0) return;
    const newPlayerDice: DiceResult[] = [
      rollAttack(),
      rollAttack(),
      rollDefense(),
      rollDefense(),
    ];
    const newComputerDice: DiceResult[] = [
      rollAttack(),
      rollAttack(),
      rollDefense(),
      rollDefense(),
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
      if (result.type === "attack") {
        playerAttack += result.value;
      } else {
        playerDefense += result.value;
      }
    });

    let computerAttack = 0;
    let computerDefense = 0;
    computerDice.forEach((res) => {
      if (res.type === "attack") computerAttack += res.value;
      else computerDefense += res.value;
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

  const primaryButtonClasses =
    "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition cursor-pointer";
  const diceButtonBase =
    "min-w-[3rem] rounded-md border px-3 py-2 text-sm font-semibold shadow-sm cursor-pointer select-none";

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
            className={primaryButtonClasses}
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
                    return (
                      <button
                        key={idx}
                        className={`${diceButtonBase} ${selectedClasses}`}
                        onClick={() => toggleSelect(idx)}
                        type="button"
                      >
                        {res.type === "attack"
                          ? `A${res.value}`
                          : `V${res.value}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Gegnerische Würfel:</p>
                <div className="flex gap-2 flex-wrap">
                  {computerDice.map((res, idx) => (
                    <div
                      key={idx}
                      className="min-w-12 rounded-md border border-slate-500 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm text-center"
                    >
                      {res.type === "attack"
                        ? `A${res.value}`
                        : `V${res.value}`}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p>
                  Ausgewählt:
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
