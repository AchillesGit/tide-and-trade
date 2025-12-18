import { FaGift } from "react-icons/fa";

import type { FC } from "react";

interface ItemIconAndLabelProps {
  text: string;
  // eslint-disable-next-line react/require-default-props
  size?: number;
}

const GiftIconAndLabel: FC<ItemIconAndLabelProps> = ({ text, size = 30 }) => (
  <span className="flex items-center gap-2 font-semibold text-yellow-300">
    <FaGift color="#b93eb3ff" size={size} />
    {text}
  </span>
);

export default GiftIconAndLabel;
