import { useGameStore } from "../store/gameStore";

import type { FC } from "react";

const Shop: FC = () => {
  const { shopItems, generateShopItems } = useGameStore();

  if (shopItems.length === 0) {
    generateShopItems(5);
  }

  return <div> TODO </div>;
};
export default Shop;
