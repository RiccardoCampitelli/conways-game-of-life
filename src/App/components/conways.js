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
  background-color: ${props => (props.color ? props.color : "pink")};
  cursor: pointer;
  :focus {
    outline: 0;
  }
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
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
  const [grid, setGrid] = useState(generateRandomGrid());

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
    setRunning(false);
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
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.
      </Row>

      <Row pt={20}>
        These rules, which compare the behavior of the automaton to real life,
        can be condensed into the following:
      </Row>
      <Row pt={20}>
        <ol>
          <li>any live cell with two or three neighbors survives.</li>
          <li>Any dead cell with three live neighbors becomes a live cell.</li>
          <li>
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </li>
        </ol>
      </Row>

      <Row pt={20} pb={20}>
        <Button color={running ? "papayawhip" : "pink"} onClick={toggleRunning}>
          {running ? "Stop" : "Start"}
        </Button>
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
