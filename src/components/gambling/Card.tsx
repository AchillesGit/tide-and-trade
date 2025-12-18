import { WiStars } from "react-icons/wi";

import type { FC, ReactNode } from "react";

interface CardProps {
  revealed: boolean;
  dimmed: boolean;
  disabled: boolean;
  content: ReactNode;
  onClick: () => void;
}

const Card: FC<CardProps> = ({
  revealed,
  dimmed,
  disabled,
  content,
  onClick,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type="button"
    className={`
        relative h-28 w-24 rounded-xl border-2 text-sm font-semibold
        transition-transform duration-200
        flex items-center justify-center
        ${revealed ? "border-amber-400 bg-amber-900 shadow-lg" : "border-cyan-700 bg-cyan-800 hover:-translate-y-2 hover:scale-105"}
        ${dimmed ? "opacity-50" : ""}
      `}
  >
    {revealed ? content : <WiStars color="#fae954ff" size={50} />}
  </button>
);

export default Card;
