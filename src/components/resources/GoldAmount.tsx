import { GiGoldBar } from "react-icons/gi";

import { formatNumber } from "../../util/formatHelper";

import type { FC } from "react";

interface GoldAmountProps {
  value: number;
  // eslint-disable-next-line react/require-default-props
  size?: number;
}

const GoldAmount: FC<GoldAmountProps> = ({ value, size = 30 }) => (
  <span className="flex items-center gap-2 font-semibold text-yellow-300">
    <GiGoldBar color="#f0d560ff" size={size} />
    {formatNumber(value)}
  </span>
);

export default GoldAmount;
