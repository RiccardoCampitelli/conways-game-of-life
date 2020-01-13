import React, { useState, useCallback } from "react";

import styled from "styled-components";

import Grid from "./grid";
import GameDescription from "#root/components/gameDescription";

import produce from "immer";
import useInterval from "#root/hooks/useInterval";

import { FaPlus, FaMinus } from "react-icons/fa";
import Controls from "#root/components/controls";
import {
  Slider,
  Section,
  Button
} from "#root/components/common/styledComponents";

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

const PlusIcon = styled(FaPlus)`
  cursor: pointer;
`;

const MinusIcon = styled(FaMinus)`
  cursor: pointer;
`;

const Header = styled.h1`
  margin: 0;

  background-color: #c66;
  border-radius: 15px;
  width: 80%;
  height: 100px;
  line-height: 80px;
  font-size: 60px;
  text-align: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Pacifico", cursive;
  color: #f5f5f5;
  z-index: 5;
`;

const SliderWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
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

//TODO: try https://github.com/react-component/slider for slider

//TODO: Move common components out of here.
const Conways = () => {
  const [grid, setGrid] = useState(generateRandomGrid());
  const [tickSpeed, setTickSpeed] = useState(TICK_SPEED);
  const [running, setRunning] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const tick = useCallback(() => {
    setGrid(oldGrid => {
      const newGrid = produce(oldGrid, gridClone => {
        gridClone.forEach((row, rowIndex) =>
          row.forEach((_, colIndex) => {
            const neighborCount = countNeighbors(oldGrid, rowIndex, colIndex);
           
            if (gridClone[rowIndex][colIndex] === 1) {
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
    setGenerationCount(count => count + 1);
  }, []);

  // const speed = MAX_TICK_SPEED - tickSpeed;

  useInterval(tick, running ? tickSpeed : null);

  const toggleRunning = () => {
    setRunning(running => !running);
  };

  const clearGrid = () => {
    setRunning(false);
    setGrid(generateEmptyGrid());
    setGenerationCount(0);
  };

  const randomiseGrid = () => {
    setGrid(generateRandomGrid());
    setGenerationCount(0);
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
      <Row>
        <Header>Conways game of life</Header>
      </Row>
      <GameDescription />
      <Row pt={15} pb={15}>
        <Section mr="100px">
          <Button onClick={toggleRunning}>{running ? "Stop" : "Start"}</Button>
          <Button onClick={randomiseGrid}>Randomise</Button>
          <Button onClick={clearGrid}>Clear</Button>
        </Section>
        <SliderWrapper>
          Speed ({tickSpeed})ms
          <Slider
            value={tickSpeed}
            type="range"
            min="1"
            max={MAX_TICK_SPEED}
            onChange={handleSpeedChange}
          />
        </SliderWrapper>
      </Row>
      {/* <Controls
        toggleRunning={toggleRunning}
        randomiseGrid={randomiseGrid}
        clearGrid={clearGrid}
      /> */}
      <Row>Generation #{generationCount}</Row>
      <Row pt={20} pb={20}>
        <Grid grid={grid} flipCell={flipCell} />
      </Row>
    </Container>
  );
};

export default Conways;
