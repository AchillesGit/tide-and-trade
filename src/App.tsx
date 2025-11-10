import React, { useEffect } from "react";

import Inventory from "./components/Inventory";
import ResourcesBar from "./components/ResourcesBar";
import Shop from "./components/Shop";
import { useGameStore } from "./store/gameStore";

import type { FC } from "react";

const App: FC = () => {
  const { onRightClick } = useGameStore();

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      onRightClick();
    };
    document.addEventListener("contextmenu", onContext, { capture: true });
    return () =>
      document.removeEventListener("contextmenu", onContext, {
        capture: true,
      } as AddEventListenerOptions);
  }, [onRightClick]);

  return (
    <React.Fragment>
      <ResourcesBar />
      <div className="flex gap-4">
        <Inventory />
        <Shop />
      </div>
    </React.Fragment>
  );
};

export default App;
