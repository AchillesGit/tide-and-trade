import { useGameStore } from "../store/gameStore";
import { resolveItem } from "../util/itemHelper";
import FaceIcons from "./battle/FaceIcons";

import type { FC } from "react";

const StatsSumInfo: FC = () => {
  const { inventoryItems } = useGameStore();

  if (!inventoryItems || inventoryItems.length === 0) return null;

  return (
    <div className="mt-3 rounded-md bg-slate-900/80 p-3 text-xs">
      <div className="mb-2 text-[10px] uppercase tracking-wide text-slate-400">
        Übersicht – Alle Würfel aller Items
      </div>

      <div className="flex flex-col gap-4">
        {inventoryItems.map((item, idx) => {
          const resolvedItem = resolveItem(item);

          return (
            <div key={item.instanceId} className="flex flex-col gap-1">
              <div className="text-[11px] text-slate-300">
                {item.blueprintId ?? `Item ${idx + 1}`}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {resolvedItem.dice?.map((face, faceIndex) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={faceIndex}
                    className="flex h-10 items-center justify-center rounded border border-slate-700 bg-slate-800/60"
                  >
                    <FaceIcons {...face} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSumInfo;
