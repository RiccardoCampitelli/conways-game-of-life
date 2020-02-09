import React, { useState, useCallback, useRef } from "react";

import Grid from "./grid";

import produce from "immer";
import useInterval from "#root/hooks/useInterval";

import {
  Slider,
  Section,
  Button,
  Row,
  StyledDiv
} from "#root/components/common/styledComponents";

import { useWorker } from "react-hooks-worker";

const BOARD_HEIGHT = 40;
const BOARD_WIDTH = 40;

const LIFE_RATIO = 0.2;

const TICK_SPEED = 850;
const MIN_TICK_SPEED = 250; //1200 - 1450
const MAX_TICK_SPEED = 1450; //-1200 - 1450
const TICK_SPEED_RANGE = MAX_TICK_SPEED - MIN_TICK_SPEED;

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

const createWorker = () => new Worker("../worker/conwayWorker.js");

//TODO: try https://github.com/react-component/slider for slider

const Simulator = ({ isSmallScreen }) => {
  const [grid, setGrid] = useState(generateRandomGrid());
  const [tickSpeedForSlider, setTickSpeedForSlider] = useState(TICK_SPEED);
  const [running, setRunning] = useState(false);

  const { result } = useWorker(createWorker, grid);

  const gridRef = useRef();
  gridRef.current = result;

  const setNewGrid = useCallback(() => {
    if (gridRef.current !== undefined) {
      setGrid(gridRef.current.grid);
    }
  }, []);

  const tickSpeed = Math.abs(tickSpeedForSlider - TICK_SPEED_RANGE);

  useInterval(setNewGrid, running ? tickSpeed : null);

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

  const handleSpeedChange = useCallback(event => {
    event.persist();
    setTickSpeedForSlider(event.target.value);
  }, []);

  const tickSpeedPercentage = Math.floor(
    ((tickSpeedForSlider - MIN_TICK_SPEED) / TICK_SPEED_RANGE) * 100
  );

  const flipCell = useCallback((rowIndex, colIndex) => {
    setGrid(oldGrid => {
      return produce(oldGrid, gridCopy => {
        gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] ? 0 : 1;
      });
    });
  }, []);

  return (
    <>
      <Row pt={15} pb={15} isSmallScreen={isSmallScreen}>
        <Section>
          <Button onClick={toggleRunning}>{running ? "Stop" : "Start"}</Button>
          <Button onClick={randomiseGrid}>Randomise</Button>
          <Button onClick={clearGrid}>Clear</Button>
        </Section>
        <Section>
          <StyledDiv>Speed {tickSpeedPercentage}%</StyledDiv>
          <Slider
            value={tickSpeedForSlider}
            type="range"
            step="50"
            min={MIN_TICK_SPEED}
            max={MAX_TICK_SPEED}
            onChange={handleSpeedChange}
          />
        </Section>
      </Row>
      <Row pt={20} pb={20}>
        <Grid grid={grid} flipCell={flipCell} />
      </Row>
    </>
  );
};

export default Simulator;
