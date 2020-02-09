import React from "react";

import styled from "styled-components";

const CELL_SIZE = "13px";

const Cell = styled.div`
  height: ${CELL_SIZE};
  width: ${CELL_SIZE};
  background-color: ${props => (props.isAlive ? "#c66" : "#f7e4ca")};
  cursor: pointer;
  outline: 1px solid #797878;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 520px;
  height: 520px;

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
