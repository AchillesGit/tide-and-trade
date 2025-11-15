import { useEffect, useState } from "react";

import { useGameStore } from "../store/gameStore";

import type { FC } from "react";

import type { Degree } from "../types/inventoryTypes";

/**
 * Inventory UI component showing the grid, items, and drag/rotate interactions.
 * Handles:
 * - Displaying the player's inventory grid
 * - Clicking items to pick them up
 * - Clicking empty cells to place items
 * - Rotating items via mouse wheel
 * - Rendering dragged item under cursor
 */
const Inventory: FC = () => {
  const {
    inventoryItems,
    inventoryGrid,
    onClickInventoryItem,
    grabbedItem,
    rotateItem,
    onClickInventoryCell,
  } = useGameStore();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    /**
     * Tracks the cursor position and handles mouse wheel item rotation.
     *
     * @param e - Mouse move / wheel event
     */
    const cursorHandler = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    /**
     * Rotates the grabbed item when scrolling the mouse wheel.
     *
     * @param e - Wheel event
     */
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
  }, [rotateItem]);

  /**
   * Returns the CSS transform string for a given rotation angle.
   *
   * @param deg - Direction angle in degrees
   * @returns CSS transform string for proper rotation origin alignment
   */
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
    <div className={grabbedItem ? "cursor-grabbing" : "cursor-default"}>
      <h2>Inventory</h2>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${inventoryGrid[0].length}, 50px)`,
        }}
      >
        {inventoryGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const item = inventoryItems.find(
              (ir) =>
                ir.position.row === rowIndex && ir.position.col === colIndex,
            );
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-300 w-[50px] h-[50px]"
                onClick={(e) => {
                  if (grabbedItem) {
                    const bounds = e.currentTarget.getBoundingClientRect();
                    const relativeX = e.clientX - bounds.left;
                    const relativeY = e.clientY - bounds.top;
                    onClickInventoryCell(
                      { row: rowIndex, col: colIndex },
                      relativeX,
                      relativeY,
                    );
                  }
                }}
              >
                {item ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <img
                    alt={item.name}
                    className="absolute cursor-grab"
                    src={item.image}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickInventoryItem(item);
                    }}
                    style={{
                      transformOrigin: "top left",
                      transform: getTransformForDirection(item.direction),
                    }}
                  />
                ) : null}
              </div>
            );
          }),
        )}
      </div>

      {grabbedItem ? (
        <img
          alt={grabbedItem.name}
          className="pointer-events-none fixed opacity-80 transform -translate-x-1/2 -translate-y-1/2"
          src={grabbedItem.image}
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            rotate: `${grabbedItem.direction}deg`,
          }}
        />
      ) : null}
    </div>
  );
};

export default Inventory;
