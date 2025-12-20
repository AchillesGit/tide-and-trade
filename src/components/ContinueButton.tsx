import { useNavigate } from "react-router-dom";

import type { FC } from "react";

interface ContinueButtonProps {
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}

const ContinueButton: FC<ContinueButtonProps> = ({ disabled = false }) => {
  const navigate = useNavigate();

  return (
    <button
      disabled={disabled}
      onClick={async () => navigate("/")}
      type="button"
      className="
      rounded
      bg-slate-600
      px-3 py-1
      text-white
      hover:bg-slate-700
      disabled:opacity-50
      disabled:cursor-not-allowed
      transition-colors
      cursor-pointer
    "
    >
      Continue to Map
    </button>
  );
};

export default ContinueButton;
