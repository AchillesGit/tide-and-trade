import { useGameStore } from "../store/gameStore";

import type { FC } from "react";

const ResourcesBar: FC = () => {
  const { gold } = useGameStore();

  return <div className="flex gap-4">{gold} Gold</div>;
};
export default ResourcesBar;
