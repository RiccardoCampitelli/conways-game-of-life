import { exposeWorker } from "react-hooks-worker";

const options = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];
const BOARD_WIDTH = 50;



exposeWorker(calculateNewGrid);

function createGridClone(grid) {
  let newGrid = []

  for (let index = 0; index < grid.length; index++) {
   newGrid[index] = [...grid[index]];
  }

  return newGrid;
}

function calculateNewGrid(grid) {
  const gridClone = createGridClone(grid);
  grid.forEach((row, rowIndex) =>
    row.forEach((_, colIndex) => {
      const neighborCount = countNeighbors(grid, rowIndex, colIndex);

      if (grid[rowIndex][colIndex] === 1) {
        const shouldLive = neighborCount === 2 || neighborCount === 3;

        if (!shouldLive) gridClone[rowIndex][colIndex] = 0;
      } else {
        const shouldLive = neighborCount === 3;

        if (shouldLive) gridClone[rowIndex][colIndex] = 1;
      }
    })
  );

  return {grid : gridClone};
}


function areValidCoordinates([x, y], limit) {
  const isMoreThanZero = x >= 0 && y >= 0;
  const isLessThanLimit = x <= limit && y <= limit;

  return isMoreThanZero && isLessThanLimit;
}

function countNeighbors(grid, rowIndex, colIndex) {
  let neighborCount = 0;

  options.forEach(([x, y]) => {
    const coordinatesToCheck = [rowIndex + x, colIndex + y];
    if (areValidCoordinates(coordinatesToCheck, BOARD_WIDTH - 1)) {
      const [xToCheck, yToCheck] = coordinatesToCheck;

      neighborCount = grid[xToCheck][yToCheck]
        ? neighborCount + 1
        : neighborCount;
    }
  });

  return neighborCount;
}
