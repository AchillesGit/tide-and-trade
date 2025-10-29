import useInventoryStore from "../store/inventoryStore";

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
          const gridRow = position.row + rIdx - 2;
          const gridCol = position.col + cIdx - 2;
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
        const gridRow = newPosition.row + rIdx - 2;
        const gridCol = newPosition.col + cIdx - 2;
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
