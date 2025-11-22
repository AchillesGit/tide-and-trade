import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import Inventory from "./components/Inventory";
import Map from "./components/Map";
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

    document.addEventListener("contextmenu", onContext, true);
    return () => document.removeEventListener("contextmenu", onContext, true);
  }, [onRightClick]);

  return (
    <React.Fragment>
      <ResourcesBar />

      <Routes>
        <Route element={<Map />} path="/" />
        <Route
          path="/shop"
          element={
            <div className="flex justify-between">
              <Inventory />
              <Shop />
            </div>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
