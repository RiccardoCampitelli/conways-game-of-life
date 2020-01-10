import React, { useState } from "react";

import styled from "styled-components";
import Board from "./grid";

const Container = styled.div`
  display: flex;
  flex-direction: "column";
  align-content: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const BOARD_HEIGHT = 100;
const BOARD_WIDTH = 100;

const generateGrid = () => {
  const newGrid = Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0)
  );

  return newGrid;
};

const Conways = () => {
  const [grid, setGrid] = useState(generateGrid());

  return (
    <Container>
      <Board grid={grid}/>
    </Container>
  );
};

export default Conways;
