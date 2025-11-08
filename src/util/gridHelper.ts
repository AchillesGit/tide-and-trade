import type { Direction, ItemRegistry } from "../types/inventoryTypes";

export function getInventoryAsTwoDArray(
  itemRegistry: ItemRegistry[],
  inventoryGrid: number[][]
): number[][] {
  const rows = inventoryGrid.length;
  const cols = inventoryGrid[0].length;

  const grid: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  itemRegistry.forEach(({ item, position }) => {
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

export function fillInventoryGrid(
  itemRegistry: ItemRegistry[],
  inventoryGrid: number[][]
): number[][] {
  const updatedGrid = inventoryGrid.map((row) => [...row].map(() => 0));
  itemRegistry.forEach(({ item, position }) => {
    item.space.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === 1) {
          const gridRow = position.row + rIdx;
          const gridCol = position.col + cIdx;
          if (gridRow < updatedGrid.length && gridCol < updatedGrid[0].length) {
            updatedGrid[gridRow][gridCol] = 1;
          }
        }
      });
    });
  });
  return updatedGrid;
}

export function isPositionValid(
  newPosition: {
    row: number;
    col: number;
  },
  inventoryGrid: number[][],
  grabbedItem: ItemRegistry
): boolean {
  const space = grabbedItem.item.space;

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
