import FaceIcons from "./battle/FaceIcons";

import type { FC } from "react";

import type { Dice } from "../types/battleTypes";

interface DiceOverviewProps {
  title: string;
  dices: Dice[];
}

const DiceOverview: FC<DiceOverviewProps> = ({ title, dices }) => {
  if (!dices || dices.length === 0) return null;

  return (
    <div className="mt-3 rounded-md bg-slate-900/80 p-3 text-xs">
      {title ? (
        <div className="mb-2 text-[10px] uppercase tracking-wide text-slate-400">
          {title}
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {dices.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className="flex flex-col gap-1">
            <div className="text-[11px] text-slate-300">
              {`Würfel ${idx + 1}`}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {item.faces?.map((face, faceIndex) => (
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
        ))}
      </div>
    </div>
  );
};

export default DiceOverview;
