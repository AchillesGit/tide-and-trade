import { useNavigate } from "react-router-dom";

import StatsSumInfo from "./StatsSumInfo";
import useInventory from "../hooks/useInventory";
import { useGameStore } from "../store/gameStore";
import { getItemAtCell } from "../util/gridHelper";
import { resolveItem } from "../util/itemHelper";
import ItemInfo from "./item/ItemInfo";

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
  const navigate = useNavigate();

  const { clickCell, clickItem, cursorPos, getTransformForDirection } =
    useInventory();

  return (
    <div className={grabbedItem ? "cursor-grabbing" : "cursor-default"}>
      <button
        className="border p-2 cursor-pointer"
        onClick={async () => navigate("/")}
        type="button"
      >
        Map
      </button>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${inventoryGrid[0].length}, 50px)`,
        }}
      >
        {inventoryGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell === null) {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${rowIndex}-${colIndex}`}
                  className="w-[50px] h-[50px]"
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
                      <img
                        alt={resolvedItem.name}
                        className="absolute pointer-events-none"
                        src={resolvedItem.image}
                        style={{
                          transformOrigin: "top left",
                          transform: getTransformForDirection(item.direction),
                        }}
                      />
                    );
                  })()}
                </div>
              );
            }

            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-300 w-[50px] h-[50px]"
                onMouseLeave={() => setHoveredItem(null)}
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
                  } else {
                    const itemAtCell = getItemAtCell(
                      { row: rowIndex, col: colIndex },
                      inventoryItems,
                    );

                    if (!itemAtCell) return;

                    const resolvedItem = resolveItem(itemAtCell);
                    if (resolvedItem) clickItem(resolvedItem);
                  }
                }}
                onMouseEnter={() => {
                  const itemAtCell = getItemAtCell(
                    { row: rowIndex, col: colIndex },
                    inventoryItems,
                  );

                  if (!itemAtCell) return;

                  const resolvedItem = resolveItem(itemAtCell);
                  if (resolvedItem) setHoveredItem(resolvedItem);
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
                    <img
                      alt={resolvedItem.name}
                      className="absolute pointer-events-none"
                      src={resolvedItem.image}
                      style={{
                        transformOrigin: "top left",
                        transform: getTransformForDirection(item.direction),
                      }}
                    />
                  );
                })()}
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

      <div className="flex gap-2 mt-10">
        <StatsSumInfo />
        {hoveredItem ? <ItemInfo /> : null}
      </div>
    </div>
  );
};

export default Inventory;
