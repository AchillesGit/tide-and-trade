import { useNavigate } from "react-router-dom";

import type { FC } from "react";

const Placeholder: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <p className="mb-4 text-lg">Not implemented yet</p>

      <button
        className="rounded bg-slate-600 px-3 py-1 text-white hover:bg-slate-700 cursor-pointer"
        onClick={async () => navigate("/")}
        type="button"
      >
        Continue
      </button>
    </div>
  );
};

export default Placeholder;
