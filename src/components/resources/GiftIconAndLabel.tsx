import { FaGift } from "react-icons/fa";

import type { FC } from "react";

interface ItemIconAndLabelProps {
  text: string;
  // eslint-disable-next-line react/require-default-props
  size?: number;
}

const GiftIconAndLabel: FC<ItemIconAndLabelProps> = ({ text, size = 30 }) => (
  <span className="flex flex-col items-center gap-1 font-semibold text-yellow-300 text-center">
    <FaGift color="#b93eb3ff" size={size} />
    <span className="text-xs leading-tight">{text}</span>
  </span>
);

export default GiftIconAndLabel;
