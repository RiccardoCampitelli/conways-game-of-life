import React from "react";

import styled from "styled-components";

const CELL_SIZE = "12px";

const Cell = styled.div`
  height: ${CELL_SIZE};
  width: ${CELL_SIZE};
  background-color: ${props => (props.isAlive ? "#c66" : "inherit")};
  cursor: pointer;

  border: 0.1px solid black;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(50, auto);
  grid-template-rows: repeat(50, auto);
  grid-row-gap: 0px;
  grid-column-gap: 0px;

  overflow: auto;

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.48);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.48);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.48);
`;

const Grid = ({ grid, flipCell }) => {
  return (
    <GridContainer>
      {grid.map((row, rowIndex) => {
        return row.map((column, columnIndex) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            isAlive={grid[rowIndex][columnIndex] ? true : false}
            onClick={() => flipCell(rowIndex, columnIndex)}
          />
        ));
      })}
    </GridContainer>
  );
};

export default Grid;
