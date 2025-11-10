import { useGameStore } from "../store/gameStore";

import type { FC } from "react";

const Shop: FC = () => {
  const { shopItems, shopGrid, grabbedItem, onClickShopItem } = useGameStore();

  return (
    <div className={grabbedItem ? "cursor-grabbing" : "cursor-default"}>
      <h2>Shop</h2>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${shopGrid[0].length}, 50px)`,
        }}
      >
        {shopGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const item = shopItems.find(
              (ir) =>
                ir.position.row === rowIndex && ir.position.col === colIndex,
            );
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-300 w-[50px] h-[50px]"
              >
                {item ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <img
                    alt={item.name}
                    className="absolute cursor-grab"
                    src={item.image}
                    style={{ rotate: `${item.direction}deg` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickShopItem(item);
                    }}
                  />
                ) : null}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Shop;
