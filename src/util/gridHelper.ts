import type { Direction, Item } from "../types/inventoryTypes";

export function getInventoryAsTwoDArray(
  items: Item[],
  inventoryGrid: number[][],
): number[][] {
  const rows = inventoryGrid.length;
  const cols = inventoryGrid[0].length;

  const grid: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0),
  );

  items.forEach((item) => {
    item.space.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === 1) {
          const gridRow = item.position.row + rIdx;
          const gridCol = item.position.col + cIdx;
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
  items: Item[],
  inventoryGrid: number[][],
): number[][] {
  const updatedGrid = inventoryGrid.map((row) => [...row].map(() => 0));
  items.forEach((item) => {
    item.space.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === 1) {
          const gridRow = item.position.row + rIdx;
          const gridCol = item.position.col + cIdx;
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
  grabbedItem: Item,
): boolean {
  const { space } = grabbedItem;

  for (let rIdx = 0; rIdx < space.length; rIdx += 1) {
    for (let cIdx = 0; cIdx < space[rIdx].length; cIdx += 1) {
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
  direction: Direction,
): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0),
  );
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (direction === "right") {
        rotated[c][rows - 1 - r] = matrix[r][c];
      } else {
        rotated[cols - 1 - c][r] = matrix[r][c];
      }
    }
  }
  return rotated;
}
