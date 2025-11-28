import React from "react";

import { GiToken } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import FaceIcons from "./FaceIcons";
import useBattle from "../../hooks/useBattle";

const Battle: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleResolve,
    handleRoll,
    toggleSelect,
    playerLife,
    enemyLife,
    rolled,
    selectedIds,
    maxActions,
    rolls,
  } = useBattle();

  const usedActions = selectedIds.reduce((sum, sid) => {
    const roll = rolls.player.find((r) => r.id === sid);
    return sum + (roll?.face.cost ?? 1);
  }, 0);

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
              {enemyLife}
            </span>
          </p>
        </div>
      </div>

      {playerLife <= 0 || enemyLife <= 0 ? (
        <div className="mt-4 space-y-3 text-center">
          <h3 className="text-xl font-bold">
            {playerLife <= 0 ? "Du hast verloren" : "Du hast gewonnen!"}
          </h3>
          <button
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
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
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
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
                        className={`min-w-12 rounded-md border px-3 py-2 text-sm font-semibold shadow-sm cursor-pointer select-none ${selectedClasses}`}
                        onClick={() => toggleSelect(roll.id)}
                        type="button"
                      >
                        <FaceIcons
                          absDmg={roll.face.absDmg}
                          attack={roll.face.attack}
                          attackMultiplier={roll.face.attackMultiplier}
                          cost={roll.face.cost}
                          defense={roll.face.defense}
                          defenseMultiplier={roll.face.defenseMultiplier}
                          extraSelectNextRound={roll.face.extraSelectNextRound}
                        />
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
                      <FaceIcons
                        absDmg={roll.face.absDmg}
                        attack={roll.face.attack}
                        attackMultiplier={roll.face.attackMultiplier}
                        cost={roll.face.cost}
                        defense={roll.face.defense}
                        defenseMultiplier={roll.face.defenseMultiplier}
                        extraSelectNextRound={roll.face.extraSelectNextRound}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="flex items-center gap-2">
                  Aktionen:
                  <span className="flex items-center gap-1">
                    {Array.from({ length: maxActions }, (_, i) => (
                      <GiToken
                        key={i}
                        className={`w-3 h-3 ${
                          i < usedActions
                            ? "text-yellow-400"
                            : "text-yellow-400 opacity-25"
                        }`}
                      />
                    ))}
                  </span>
                </p>

                <button
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                  disabled={usedActions !== maxActions}
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
