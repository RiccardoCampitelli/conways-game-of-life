import React, { useState, useCallback, useRef } from "react";

import styled from "styled-components";

import Grid from "./grid";
import GameDescription from "#root/components/gameDescription";

import produce from "immer";
import useInterval from "#root/hooks/useInterval";

import {
  Slider,
  Section,
  Button,
  Row,
  StyledDiv
} from "#root/components/common/styledComponents";
import useDimensions from "../hooks/useDimensions";

import { useWorker } from "react-hooks-worker";

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BOARD_HEIGHT = 50;
const BOARD_WIDTH = 50;

const LIFE_RATIO = 0.2;

const TICK_SPEED = 500;
const MAX_TICK_SPEED = 750;

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
//TODO: add controls wrapper / container
//TODO: Move common components out of here.

const Conways = () => {
  const [grid, setGrid] = useState(generateRandomGrid());
  const [tickSpeed, setTickSpeed] = useState(TICK_SPEED);
  const [running, setRunning] = useState(false);

  const { result } = useWorker(createWorker, grid);
  const [ref, { width }] = useDimensions();

  const gridRef = useRef();
  gridRef.current = result;

  const setNewGrid = useCallback(() => {
    if (gridRef.current !== undefined) {
      setGrid(gridRef.current.grid);
    }
  }, []);

  const isSmallScreen = Math.floor(width) < 750;

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
    setTickSpeed(event.target.value);
  }, []);

  const flipCell = useCallback((rowIndex, colIndex) => {
    setGrid(oldGrid => {
      return produce(oldGrid, gridCopy => {
        gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] ? 0 : 1;
      });
    });
  }, []);

  return (
    <Container ref={ref}>
      <Header>Conways game of life</Header>

      <GameDescription />

      <Row pt={15} pb={15} isSmallScreen={isSmallScreen}>
        <Section>
          <Button onClick={toggleRunning}>{running ? "Stop" : "Start"}</Button>
          <Button onClick={randomiseGrid}>Randomise</Button>
          <Button onClick={clearGrid}>Clear</Button>
        </Section>
        <Section>
          <StyledDiv>Speed ({tickSpeed})ms</StyledDiv>
          <Slider
            value={tickSpeed}
            type="range"
            min="250"
            max={MAX_TICK_SPEED}
            onChange={handleSpeedChange}
          />
        </Section>
      </Row>
      <Row pt={20} pb={20}>
        <Grid grid={grid} flipCell={flipCell} />
      </Row>
    </Container>
  );
};

export default Conways;
