import useResourcesStore from "../store/resourcesStore";

import type { FC } from "react";

const ResourcesBar: FC = () => {
  const { gold } = useResourcesStore();

  return <div className="flex gap-4">{gold} Gold</div>;
};
export default ResourcesBar;
