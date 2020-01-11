import React, { useState } from "react";

import styled from "styled-components";
import Grid from "./grid";

import produce from "immer";

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
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

const Conways = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());

  const clearGrid = () => {
    setGrid(generateEmptyGrid());
  };

  const randomiseGrid = () => {
    setGrid(generateRandomGrid());
  };

  const mutateCell = (rowIndex, colIndex) => {
    setGrid(oldGrid => {
      return produce(oldGrid, gridCopy => {
        gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] ? 0 : 1;
      });
    });
  };

  return (
    <Container>
      <Row pt={50} pb={50}>
        <Button>Start</Button>
        <Button>Stop</Button>
        <Button onClick={randomiseGrid}>Randomise</Button>
        <Button onClick={clearGrid}>Clear</Button>
      </Row>
      <Row>
        <Grid grid={grid} mutateCell={mutateCell} />
      </Row>
    </Container>
  );
};

export default Conways;
