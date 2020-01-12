import React, { useState } from "react";

import styled from "styled-components";

import Grid from "./grid";
import GameDescription from "./gameDescription";

import produce from "immer";
import useInterval from "../hooks/useInterval";

import { FaPlus, FaMinus } from "react-icons/fa";

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
  border-radius: 15px;
  padding: 10px 10px 10px 10px;
  font-weight: bold;
  font-size: 15px;
  height: 40px;
  border: 1px solid pink;
  background-color: ${props => (props.color ? props.color : "pink")};
  cursor: pointer;

  transition: transform 0.3s ease-in-out;

  :focus {
    outline: 0;
  }

  :hover {
    transform: translateY(-2px);
  }

  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 200px;
  height: 5px;
  margin-top: 5px;
  border-radius: 2px;
  margin-left: 5px;
  margin-right: 5px;
  background: #5c5c5c;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;

  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 5px;
    background: pink;
  }
`;

const PlusIcon = styled(FaPlus)`
  cursor: pointer;
`;

const MinusIcon = styled(FaMinus)`
  cursor: pointer;
`;
const BOARD_HEIGHT = 50;
const BOARD_WIDTH = 50;

const LIFE_RATIO = 0.25;

const TICK_SPEED = 250;
const MAX_TICK_SPEED = 500;

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
  const [tickSpeed, setTickSpeed] = useState(TICK_SPEED);
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

  useInterval(tick, running ? tickSpeed : null);

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

  const handleSpeedChange = event => {
    event.persist();
    setTickSpeed(event.target.value);
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
      <GameDescription />
      <Row pt={20} pb={20}>
        <Button color={running ? "papayawhip" : "pink"} onClick={toggleRunning}>
          {running ? "Stop" : "Start"}
        </Button>
        <Button onClick={randomiseGrid}>Randomise</Button>
        <Button onClick={clearGrid}>Clear</Button>
      </Row>
      <Row>Speed</Row>
      <Row pt={20} pb={20}>
        <MinusIcon />
        <Slider
          value={tickSpeed}
          type="range"
          min="1"
          max={MAX_TICK_SPEED}
          onChange={handleSpeedChange}
        />
        <PlusIcon />
      </Row>
      <Row pt={20} pb={20}>
        <Grid grid={grid} flipCell={flipCell} />
      </Row>
    </Container>
  );
};

export default Conways;
