import { useState } from "react";

import {
  ATTACK_DIE_FACES,
  DAMAGE_DIE_FACES,
  DEFENSE_DIE_FACES,
  ENEMY_DIE_FACES,
  EXTRA_SELECT_DIE_FACES,
  HYBRID_DIE_FACES,
  MULTIPLY_ATTACK_DIE_FACES,
  MULTIPLY_DEFENSE_DIE_FACES,
} from "../blueprints/diceBlueprints";
import { createDie, rollAll } from "../util/battleHelper";

import type { DiceState, RollsState } from "../types/battleTypes";

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

interface UseBattleReturn {
  rolled: boolean;
  rolls: RollsState;
  selectedIds: string[];
  maxActions: number;
  playerLife: number;
  computerLife: number;
  handleResolve: () => void;
  toggleSelect: (id: string) => void;
  handleRoll: () => void;
}

const DEFAULT_MAX_ACTIONS = 3;

const useBattle = (): UseBattleReturn => {
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

  return {
    rolled,
    rolls,
    selectedIds,
    playerLife,
    computerLife,
    maxActions,
    handleResolve,
    toggleSelect,
    handleRoll,
  };
};
export default useBattle;
