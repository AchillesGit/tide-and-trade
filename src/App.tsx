import React from "react";

import Inventory from "./components/Inventory";
import ResourcesBar from "./components/ResourcesBar";
import Shop from "./components/Shop";

import type { FC } from "react";

const App: FC = () => (
  <React.Fragment>
    <ResourcesBar />
    <div className="flex gap-4">
      <Inventory />
      <Shop />
    </div>
  </React.Fragment>
);

export default App;
