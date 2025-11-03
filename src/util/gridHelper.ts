import useInventoryStore from "../store/inventoryStore";
import type { Direction } from "../types/inventoryTypes";

export function getInventoryAsTwoDArray(): number[][] {
  const inventory = useInventoryStore.getState().itemRegistry;
  const rows = useInventoryStore.getState().inventoryGrid.length;
  const cols = useInventoryStore.getState().inventoryGrid[0].length;

  const grid: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  inventory.forEach(({ item, position }) => {
    item.space.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === 1) {
          const gridRow = position.row + rIdx;
          const gridCol = position.col + cIdx;
          if (gridRow < rows && gridCol < cols) {
            grid[gridRow][gridCol] = 1;
          }
        }
      });
    });
  });

  return grid;
}

export function isPositionValid(newPosition: {
  row: number;
  col: number;
}): boolean {
  const inventoryGrid = getInventoryAsTwoDArray();
  const space = useInventoryStore.getState().grabbedItem?.item.space;
  if (!space) return false;

  for (let rIdx = 0; rIdx < space.length; rIdx++) {
    for (let cIdx = 0; cIdx < space[rIdx].length; cIdx++) {
      if (space[rIdx][cIdx] === 1) {
        const gridRow = newPosition.row + rIdx;
        const gridCol = newPosition.col + cIdx;
        if (
          gridRow < 0 ||
          gridCol < 0 ||
          gridRow >= inventoryGrid.length ||
          gridCol >= inventoryGrid[0].length ||
          inventoryGrid[gridRow][gridCol] === 1
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function rotateMatrix(
  matrix: number[][],
  direction: Direction
): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  );
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (direction === "right") {
        rotated[c][rows - 1 - r] = matrix[r][c];
      } else {
        rotated[cols - 1 - c][r] = matrix[r][c];
      }
    }
  }
  return rotated;
}
