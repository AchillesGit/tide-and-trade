import useInventoryStore from "../store/inventoryStore";
import { useState, useEffect } from "react";
import type { Degree } from "../types/inventoryTypes";

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

  const getTransformForDirection = (deg: Degree) => {
    switch (deg) {
      case 90:
        return "rotate(90deg) translateY(-100%)";
      case 180:
        return "rotate(180deg) translate(-100%, -100%)";
      case 270:
        return "rotate(270deg) translateX(-100%)";
      default:
        return `rotate(${deg}deg)`;
    }
  };

  return (
    <div className={`${grabbedItem ? "cursor-grabbing" : "cursor-default"}`}>
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
                className='border border-gray-300 w-[50px] h-[50px]'
                onClick={(e) => {
                  if (grabbedItem) {
                    const bounds = e.currentTarget.getBoundingClientRect();
                    const relativeX = e.clientX - bounds.left;
                    const relativeY = e.clientY - bounds.top;
                    releaseItem(
                      { row: rowIndex, col: colIndex },
                      relativeX,
                      relativeY
                    );
                  }
                }}
              >
                {item && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className='absolute cursor-grab'
                    style={{
                      transformOrigin: "top left",
                      transform: getTransformForDirection(item.direction),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      grabItem(item.id);
                    }}
                  />
                )}
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
