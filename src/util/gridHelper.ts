import type { Direction, Item } from "../types/inventoryTypes";

/**
 * Build a clean 2D occupancy grid from a list of items.
 *
 * @param items - Items to render onto the grid
 * @param inventoryGrid - Base grid shape (used only for dimensions)
 * @returns A new 2D array: 1 = occupied, 0 = empty
 */
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

/**
 * Rebuild the inventory grid with all items placed in their positions.
 *
 * @param items - Items to apply to the grid
 * @param inventoryGrid - Template grid used for dimensions
 * @returns Updated 2D occupancy grid
 */
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

/**
 * Validate whether an item can be placed at a specific grid position.
 *
 * @param newPosition - Top-left grid coordinates where the item would be placed
 * @param inventoryGrid - The current occupancy grid
 * @param grabbedItem - The item being checked for placement
 * @returns True if item fits inside bounds and doesn't overlap
 */
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

/**
 * Rotate a 2D matrix 90° left or right.
 *
 * @param matrix - Original matrix (item space)
 * @param direction - Rotation direction ("left" or "right")
 * @returns New rotated matrix
 */
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
