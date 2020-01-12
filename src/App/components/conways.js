import React, { useState } from "react";

import styled from "styled-components";
import Grid from "./grid";

import produce from "immer";
import useInterval from "../hooks/useInterval";

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  width: 100vw;
`;

const Row = styled.div`
  padding-top: ${props => (props.pt ? `${props.pt}px` : undefined)};
  padding-bottom: ${props => (props.pb ? `${props.pb}px` : undefined)};
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

const Button = styled.button`
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 3px;
  height: 25px;
  border: 1px solid pink;
  background-color: pink;
  cursor: pointer;
  :focus {
    outline: 0;
  }
`;

const BOARD_HEIGHT = 50;
const BOARD_WIDTH = 50;

const LIFE_RATIO = 0.25;

const TICK_SPEED = 100;

const generateEmptyGrid = () =>
  Array.from({ length: BOARD_WIDTH }, () =>
    Array.from({ length: BOARD_HEIGHT }, () => 0)
  );

const generateRandomGrid = () =>
  Array.from({ length: BOARD_WIDTH }, () =>
    Array.from({ length: BOARD_HEIGHT }, () =>
      Math.random() < LIFE_RATIO ? 1 : 0
    )
  );

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

const areValidCoordinates = ([x, y], limit) => {
  const isMoreThanZero = x >= 0 && y >= 0;
  const isLessThanLimit = x <= limit && y <= limit;

  return isMoreThanZero && isLessThanLimit;
};

const countNeighbors = (grid, rowIndex, colIndex) => {
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
};

const Conways = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());

  const [running, setRunning] = useState(false);

  const tick = () => {
    setGrid(oldGrid => {
      const newGrid = produce(oldGrid, gridClone => {
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
      });

      return newGrid;
    });
  };

  useInterval(tick, running ? TICK_SPEED : null);

  const toggleRunning = () => {
    setRunning(running => !running);
  };

  const clearGrid = () => {
    setGrid(generateEmptyGrid());
  };

  const randomiseGrid = () => {
    setGrid(generateRandomGrid());
  };

  const flipCell = (rowIndex, colIndex) => {
    setGrid(oldGrid => {
      return produce(oldGrid, gridCopy => {
        gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] ? 0 : 1;
      });
    });
  };

  return (
    <Container>

      <Row pt={20}>
        lots of text
        lots of text
        lots of text
        lots of text
        lots of text
        lots of text
      </Row>

      <Row pt={20} pb={20}>
        <Button onClick={toggleRunning}>{running ? "Stop" : "Start"}</Button>
        <Button onClick={randomiseGrid}>Randomise</Button>
        <Button onClick={clearGrid}>Clear</Button>
      </Row>
      <Row pt={20} pb={20}>
        <Grid grid={grid} flipCell={flipCell} />
      </Row>
    </Container>
  );
};

export default Conways;
