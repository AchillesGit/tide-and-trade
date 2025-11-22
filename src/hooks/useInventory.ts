import { useEffect, useState } from "react";

import { useGameStore } from "../store/gameStore";

import type {
  Degree,
  Item,
  ItemLevel,
  Position,
} from "../types/inventoryTypes";

interface UseInventoryReturn {
  /** Current absolute cursor position */
  cursorPos: { x: number; y: number };
  /**
   * When clicking a cell in the inventory grid:
   * attempt to place the grabbed item.
   *
   * @param targetCell - Target inventory cell position
   * @param relativeX - Pointer offset within the cell (0–50)
   * @param relativeY - Pointer offset within the cell (0–50)
   */
  clickCell: (
    targetCell: Position,
    relativeX: number,
    relativeY: number,
  ) => void;
  /**
   * When clicking an item: pick it up and remove it from inventory.
   *
   * @param item - Inventory item that was clicked
   */
  clickItem: (item: Item) => void;
  /**
   * Returns the CSS transform string for a given rotation angle.
   *
   * @param deg - Direction angle in degrees
   * @returns CSS transform string for proper rotation origin alignment
   */
  getTransformForDirection: (deg: Degree) => string;
}

const useInventory = (): UseInventoryReturn => {
  const {
    grabbedItem,
    storeItem,
    rotateItem,
    removeInventoryItem,
    addInventoryItem,
    setGrabbedItem,
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

  const clickItem = (clickedItem: Item) => {
    // No item grabbed → grab the clicked item
    if (!grabbedItem) {
      setGrabbedItem({ ...clickedItem });
      removeInventoryItem(clickedItem.instanceId);
      return;
    }

    // Clicking the same item again → do nothing (should not happen)
    if (grabbedItem.instanceId === clickedItem.instanceId) return;

    // Same blueprint, level and level under 5 → merge
    if (
      grabbedItem.blueprintId === clickedItem.blueprintId &&
      grabbedItem.level === clickedItem.level &&
      grabbedItem.level < 5
    ) {
      const newLevel = Math.min(clickedItem.level + 1, 5) as ItemLevel;

      const mergedItem: Item = {
        ...clickedItem,
        instanceId: crypto.randomUUID(),
        level: newLevel,
      };

      // Remove both items
      removeInventoryItem(grabbedItem.instanceId);
      removeInventoryItem(clickedItem.instanceId);

      // Insert merged item
      addInventoryItem(mergedItem);

      setGrabbedItem(null);
      return;
    }

    // Different blueprint → try SWAP
    const posGrabbed = grabbedItem.position;
    const posClicked = clickedItem.position;

    removeInventoryItem(grabbedItem.instanceId);
    removeInventoryItem(clickedItem.instanceId);

    let placementValid;

    const itemH = clickedItem.space.length;
    const itemW = clickedItem.space[0].length;
    const occupiedCells: Position[] = [];

    for (let r = 0; r < itemH; r += 1) {
      for (let c = 0; c < itemW; c += 1) {
        if (clickedItem.space[r][c] === 1) {
          occupiedCells.push({
            row: posClicked.row + r,
            col: posClicked.col + c,
          });
        }
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cell of occupiedCells) {
      placementValid = storeItem(grabbedItem, cell, 0, 0);
      if (placementValid) break;
    }

    if (!placementValid) {
      addInventoryItem(clickedItem);
    } else {
      setGrabbedItem({
        ...clickedItem,
        position: posGrabbed,
      });
    }
  };

  const clickCell = (
    targetCell: Position,
    relativeX: number,
    relativeY: number,
  ) => {
    if (!grabbedItem) return;

    const placementValid = storeItem(
      grabbedItem,
      targetCell,
      relativeX,
      relativeY,
    );

    if (placementValid) setGrabbedItem(null);
  };

  return {
    cursorPos,
    clickCell,
    clickItem,
    getTransformForDirection,
  };
};

export default useInventory;
