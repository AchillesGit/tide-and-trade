import { GiClover } from "react-icons/gi";

import { formatPercent } from "../../util/formatHelper";

import type { FC } from "react";

interface LuckAmountProps {
  value: number;
  // eslint-disable-next-line react/require-default-props
  size?: number;
}

const LuckAmount: FC<LuckAmountProps> = ({ value, size = 30 }) => (
  <span className="flex items-center gap-2 font-semibold text-yellow-300">
    <GiClover color="#25be65ff" size={size} />
    {formatPercent(value)}
  </span>
);

export default LuckAmount;
