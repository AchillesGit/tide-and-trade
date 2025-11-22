import { useNavigate } from "react-router-dom";

import type { FC } from "react";

const Map: FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="border p-2 cursor-pointer"
      onClick={async () => navigate("/shop")}
      type="button"
    >
      Shop
    </button>
  );
};

export default Map;
