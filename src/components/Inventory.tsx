import useInventoryStore from "../store/inventoryStore";
import { useState, useEffect } from "react";

export default function Inventory() {
  const {
    itemRegistry,
    inventoryGrid,
    grabItem,
    releaseItem,
    grabbedItem,
    rotateItem,
  } = useInventoryStore();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursorHandler = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    const wheelHandler = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        rotateItem("left");
      } else {
        rotateItem("right");
      }
    };

    window.addEventListener("mousemove", cursorHandler);
    window.addEventListener("wheel", wheelHandler);

    return () => {
      window.removeEventListener("mousemove", cursorHandler);
      window.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${inventoryGrid[0].length}, 50px)`,
        }}
      >
        {inventoryGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const item = itemRegistry.find(
              (ir) =>
                ir.position.row === rowIndex && ir.position.col === colIndex
            )?.item;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className='border border-gray-300 w-[50px] h-[50px] flex items-center justify-center'
                onClick={() => {
                  if (grabbedItem) {
                    releaseItem({ row: rowIndex, col: colIndex });
                  }
                }}
              >
                {item ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className='absolute cursor-pointer'
                    style={{ rotate: `${item.direction}deg` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      grabItem(item.id);
                    }}
                  />
                ) : null}
              </div>
            );
          })
        )}
      </div>

      {grabbedItem && (
        <img
          src={grabbedItem.item.image}
          alt={grabbedItem.item.name}
          className='pointer-events-none fixed opacity-80 transform -translate-x-1/2 -translate-y-1/2'
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            rotate: `${grabbedItem.item.direction}deg`,
          }}
        />
      )}
    </div>
  );
}
