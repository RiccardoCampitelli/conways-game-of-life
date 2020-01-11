import React from "react";

import styled from "styled-components";

const Cell = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${props => (props.isAlive ? "lightblue" : "inherit")};

  border: 0.1px solid black;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(50, 10px);
  grid-template-rows: repeat(50, 10px);
  grid-row-gap: 0px;
  grid-column-gap: 0px;
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
          ></Cell>
        ));
      })}
    </GridContainer>
  );
};

export default Grid;
