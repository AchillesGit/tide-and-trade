import React, { useEffect, useRef, useState } from "react";

import {
  GiCrossedSwords,
  GiDiceFire,
  GiDodging,
  GiHeartBottle,
  GiHydraShot,
  GiMineExplosion,
  GiPirateCannon,
  GiShieldReflect,
  GiShoonerSailboat,
} from "react-icons/gi";

import type { Ship } from "../types/inventoryTypes";

interface Log {
  id: string;
  log: string;
}

const Battle: React.FC = () => {
  const initialShips: Ship[] = [
    {
      name: "Fregatte",
      currentHp: 800,
      maxHp: 800,
      firepower: 45,
      attackSpeed: 1.6,
      criticalChance: 0.15,
      criticalDamage: 1.5,
      armor: 8,
      evasionChance: 0.08,
      gold: 0,
    },
    {
      name: "Zerstörer",
      currentHp: 1000,
      maxHp: 1000,
      firepower: 55,
      attackSpeed: 1.4,
      criticalChance: 0.1,
      criticalDamage: 1.8,
      armor: 12,
      evasionChance: 0.05,
      gold: 0,
    },
  ];

  const [ships, setShips] = useState<Ship[]>(initialShips);
  const shipsRef = useRef<Ship[]>(initialShips);

  const [log, setLog] = useState<Log[]>([]);
  const logRef = useRef<Log[]>([]);

  const battleFinishedRef = useRef<boolean>(false);

  const scheduleAttack = (attackerIndex: number, defenderIndex: number) => {
    const attacker = shipsRef.current[attackerIndex];
    const interval = Math.max(1000 / (attacker.attackSpeed || 1), 10);
    setTimeout(() => {
      if (battleFinishedRef.current) return;

      const currentAttacker = shipsRef.current[attackerIndex];
      const currentDefender = shipsRef.current[defenderIndex];

      if (!currentAttacker || !currentDefender) return;

      let message = ``;

      const evaded = Math.random() < currentDefender.evasionChance;
      if (evaded) {
        message = `${currentAttacker.name} attackiert ${currentDefender.name}, doch ${currentDefender.name} weicht aus!`;
      } else {
        const baseDamage = currentAttacker.firepower;

        const isCrit = Math.random() < currentAttacker.criticalChance;
        const damageWithCrit = isCrit
          ? baseDamage * currentAttacker.criticalDamage
          : baseDamage;

        const damageAfterArmor = Math.max(
          0,
          damageWithCrit - currentDefender.armor,
        );

        const damageDealt = Math.round(damageAfterArmor * 10) / 10;

        const newShips = shipsRef.current.map((s, idx) => {
          if (idx !== defenderIndex) return s;
          const newHp = Math.max(0, s.currentHp - damageDealt);
          return { ...s, currentHp: newHp };
        });
        shipsRef.current = newShips;
        setShips(newShips);

        message = `${currentAttacker.name} trifft ${currentDefender.name} `;
        if (isCrit) {
          message += `(Kritischer Treffer) `;
        }
        message += `für ${damageDealt.toFixed(1)} Schaden. `;
        message += `${currentDefender.name} hat noch ${newShips[defenderIndex].currentHp.toFixed(1)} HP.`;

        if (newShips[defenderIndex].currentHp <= 0) {
          message += ` ${currentDefender.name} wurde zerstört!`;
          battleFinishedRef.current = true;
        }
      }

      const newLog: Log = {
        id: crypto.randomUUID(),
        log: message,
      };

      const updatedLog = [...logRef.current, newLog];
      logRef.current = updatedLog;
      setLog(updatedLog);

      if (!battleFinishedRef.current) {
        scheduleAttack(attackerIndex, defenderIndex);
      }
    }, interval);
  };

  useEffect(() => {
    shipsRef.current = initialShips;
    logRef.current = [];
    battleFinishedRef.current = false;
    setShips(initialShips);
    setLog([]);

    scheduleAttack(0, 1);
    scheduleAttack(1, 0);

    return () => {
      battleFinishedRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHealthBar = (ship: Ship) => {
    const hpPercent = (ship.currentHp / ship.maxHp) * 100;
    const barColorClass =
      // eslint-disable-next-line no-nested-ternary
      hpPercent > 50
        ? "bg-green-500"
        : hpPercent > 20
          ? "bg-orange-500"
          : "bg-red-500";
    return (
      <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-200 ease-linear ${barColorClass}`}
          style={{ width: `${hpPercent}%` }}
        />
      </div>
    );
  };

  const renderShipStats = (ship: Ship) => (
    <table className="w-full border-collapse mb-2 text-sm">
      <tbody className="[&>tr]:mb-3 [&>tr]:flex [&>tr]:justify-between">
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiHeartBottle size={24} />
            HP
          </th>

          <td>
            {ship.currentHp.toFixed(1)} / {ship.maxHp.toFixed(1)}
          </td>
        </tr>
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiPirateCannon size={24} />
            Feuerkraft
          </th>

          <td>{ship.firepower}</td>
        </tr>
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiHydraShot size={24} />
            Angriffsgeschwindigkeit
          </th>
          <td>{ship.attackSpeed}</td>
        </tr>
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiDiceFire size={24} />
            Kritische Chance
          </th>

          <td>{(ship.criticalChance * 100).toFixed(1)}%</td>
        </tr>
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiMineExplosion size={24} />
            Kritischer Schaden
          </th>

          <td>{ship.criticalDamage.toFixed(2)}x</td>
        </tr>
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiShieldReflect size={24} />
            Rüstung
          </th>

          <td>{ship.armor}</td>
        </tr>
        <tr>
          <th className="text-left pr-2 font-medium flex items-center gap-3">
            <GiDodging size={24} />
            Ausweichchance
          </th>

          <td>{(ship.evasionChance * 100).toFixed(1)}%</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col gap-4 mx-30">
      <div className="flex gap-4">
        {ships.map((ship) => (
          <div
            key={ship.name}
            className="flex-1 p-3 border border-gray-300 rounded"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <GiShoonerSailboat size={33} />
              {ship.name}
            </h3>
            {renderHealthBar(ship)}
            <div className="mt-2">{renderShipStats(ship)}</div>
          </div>
        ))}
      </div>

      <div className="p-3 border border-gray-300 rounded h-52 overflow-y-auto bg-gray-50">
        <h4 className="font-semibold mb-2">Kampflog</h4>
        <ul className="list-none p-0 m-0 space-y-1 text-sm">
          {log.map((entry) => (
            <li key={entry.id} className="flex items-start gap-2">
              <GiCrossedSwords />
              {entry.log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Battle;
