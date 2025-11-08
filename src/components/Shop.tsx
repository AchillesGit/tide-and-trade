import useInventoryStore from "../store/inventoryStore";
import { useState, useEffect } from "react";
import useShopStore from "../store/shopStore";

export default function Shop() {
  const { itemRegistry, buyItem, sellItem, shopGrid } = useShopStore();
  const { grabbedItem } = useInventoryStore();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursorHandler = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", cursorHandler);

    return () => {
      window.removeEventListener("mousemove", cursorHandler);
    };
  }, []);

  return (
    <div className={`${grabbedItem ? "cursor-grabbing" : "cursor-default"}`}>
      <h2>Shop</h2>
      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${shopGrid[0].length}, 50px)`,
        }}
      >
        {shopGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const item = itemRegistry.find(
              (ir) =>
                ir.position.row === rowIndex && ir.position.col === colIndex
            );
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className='border border-gray-300 w-[50px] h-[50px]'
                onClick={() => {
                  if (grabbedItem) {
                    // releaseItem({ row: rowIndex, col: colIndex });
                  }
                }}
              >
                {item ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className='absolute cursor-grab'
                    style={{ rotate: `${item.direction}deg` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      buyItem(item.id);
                    }}
                  />
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
