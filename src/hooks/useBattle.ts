import { useState } from "react";

import ENEMIES from "../blueprints/enemies";
import { useGameStore } from "../store/gameStore";
import { createDie, rollAll, sortRollResults } from "../util/battleHelper";
import { resolveItem } from "../util/itemHelper";

import type { DiceState, RollsState } from "../types/battleTypes";

/**
 * Shape of the object returned by {@link useBattle}.
 */
interface UseBattleReturn {
  /** Whether a roll has been made and is awaiting resolution. */
  rolled: boolean;
  /** The current rolled faces for both player and enemy. */
  rolls: RollsState;
  /** IDs of the player's dice currently selected for this round. */
  selectedIds: string[];
  /** Maximum total action cost the player can spend this round. */
  maxActions: number;
  /** Enemy's remaining life points. */
  enemyLife: number;
  /** Enemy's name. */
  enemyName: string;
  /** Resolves the current roll selection and applies damage/defense. */
  handleResolve: () => void;
  /** Toggles selection of a die by id, respecting action cost limits. */
  toggleSelect: (id: string) => void;
  /** Rolls dice for both player and enemy for a new round. */
  handleRoll: () => void;
}

/** Default maximum action points per round. */
const DEFAULT_MAX_ACTIONS = 3;

/**
 * React hook encapsulating battle state and logic.
 *
 * Manages life totals, dice rolls, selected dice, and action point limits.
 * Intended to be used by a battle UI component to drive the gameplay loop.
 * @returns Battle state and handlers to control rolling and resolving actions.
 */
const useBattle = (): UseBattleReturn => {
  const { inventoryItems, currentHp, getCurrentLevel, removeCurrentHP } =
    useGameStore();

  /** Get random enemy based on current level */
  const {
    enemyDice,
    startingEnemyLife,
    name: enemyName,
  } = ENEMIES.filter((e) => e.level === getCurrentLevel()).sort(
    () => Math.random() - 0.5,
  )[0];

  const [enemyLife, setEnemyLife] = useState(startingEnemyLife);

  const [rolls, setRolls] = useState<RollsState>({ player: [], enemy: [] });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rolled, setRolled] = useState(false);
  const [maxActions, setMaxActions] = useState<number>(DEFAULT_MAX_ACTIONS);

  /**
   * Initial dice pool configuration for player and enemy.
   * Player dice are built from inventory items; enemy dice are
   * generated based on the level parameter above.
   */
  const dices: DiceState = {
    player: inventoryItems.map((i) => {
      const resolved = resolveItem(i);
      return createDie(resolved.dice);
    }),
    enemy: enemyDice,
  };

  /**
   * Rolls all dice for player and enemy if the battle is still ongoing.
   * Resets selection for the new turn.
   */
  const handleRoll = () => {
    if (currentHp <= 0 || enemyLife <= 0) return;

    const playerRolls = sortRollResults(rollAll(dices.player));
    const enemyRolls = sortRollResults(rollAll(dices.enemy));

    setRolls({
      player: playerRolls,
      enemy: enemyRolls,
    });

    setSelectedIds([]);
    setRolled(true);
  };

  /**
   * Toggles selection of a specific player die by id.
   * Selection is prevented if adding the die would exceed the max action cost.
   *
   * @param id - The id of the die to toggle.
   */
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

  /**
   * Resolves the current turn:
   * - Computes player and enemy attack/defense based on selected and rolled faces.
   * - Applies damage to both sides.
   * - Updates next round's action limit with any extra selection bonuses.
   *
   * Resolution only happens if a roll has been made in the current turn.
   */
  const handleResolve = () => {
    if (!rolled) return;

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

    const damageToEnemy =
      Math.max(totalPlayerAttack - enemyDefense, 0) + playerAbsDamage;
    const damageToPlayer = Math.max(enemyAttack - totalPlayerDefense, 0);

    removeCurrentHP(damageToPlayer);
    setEnemyLife(Math.max(enemyLife - damageToEnemy, 0));

    setMaxActions(DEFAULT_MAX_ACTIONS + extraSelectSum);
    setRolled(false);
  };

  return {
    rolled,
    rolls,
    enemyName,
    selectedIds,
    enemyLife,
    maxActions,
    handleResolve,
    toggleSelect,
    handleRoll,
  };
};

export default useBattle;
