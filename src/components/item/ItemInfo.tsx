import { useGameStore } from "../../store/gameStore";
import FaceIcons from "../battle/FaceIcons";

import type { FC } from "react";

const ItemInfo: FC = () => {
  const { hoveredItem } = useGameStore();

  if (!hoveredItem) return null;

  const dice = hoveredItem.dice ?? [];

  return (
    <div className="mt-2 rounded-md bg-slate-900/80 p-2 text-xs">
      <div className="mb-1 text-[10px] uppercase tracking-wide text-slate-400">
        Würfelseiten
      </div>

      <div className="grid grid-cols-3 gap-2">
        {dice.map((face, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="flex h-10 items-center justify-center rounded border border-slate-700 bg-slate-800/60"
          >
            <FaceIcons {...face} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemInfo;
