import ItemInfo from "./ItemInfo";
import StatsSumInfo from "./StatsSumInfo";
import useInventory from "../hooks/useInventory";
import { useGameStore } from "../store/gameStore";
import { resolveItem } from "../util/itemHelper";

import type { FC } from "react";

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
    hoveredItem,
    grabbedItem,
    setHoveredItem,
  } = useGameStore();

  const { clickCell, clickItem, cursorPos, getTransformForDirection } =
    useInventory();

  return (
    <div
      className={`h-screen ${grabbedItem ? "cursor-grabbing" : "cursor-default"}`}
    >
      <h2>Inventory</h2>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${inventoryGrid[0].length}, 50px)`,
        }}
      >
        {inventoryGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => (
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
                  clickCell(
                    { row: rowIndex, col: colIndex },
                    relativeX,
                    relativeY,
                  );
                }
              }}
            >
              {(() => {
                const item = inventoryItems.find(
                  (ir) =>
                    ir.position.row === rowIndex &&
                    ir.position.col === colIndex,
                );

                if (!item) return null;

                const resolvedItem = resolveItem(item);

                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <img
                    alt={resolvedItem.name}
                    className="absolute cursor-grab"
                    onMouseEnter={() => setHoveredItem(resolvedItem)}
                    onMouseLeave={() => setHoveredItem(null)}
                    src={resolvedItem.image}
                    onClick={(e) => {
                      setHoveredItem(null);
                      e.stopPropagation();
                      clickItem(resolvedItem);
                    }}
                    style={{
                      transformOrigin: "top left",
                      transform: getTransformForDirection(item.direction),
                    }}
                  />
                );
              })()}
            </div>
          )),
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

      <div className="flex gap-2 mt-10">
        <StatsSumInfo />
        {hoveredItem ? <ItemInfo /> : null}
      </div>
    </div>
  );
};

export default Inventory;
