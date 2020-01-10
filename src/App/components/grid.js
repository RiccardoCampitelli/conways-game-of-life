import React from "react";

import styled from "styled-components";

const Cell = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${props => (props.isAlive ? "lightblue" : "inherit")};
 
    border: 1px solid black;
`;

const GridContainer = styled.div`

    display: grid;
    grid-template-columns: repeat(100, 10px);
    grid-row-gap: 0px;
    grid-column-gap: 0px;

`;

const Board = ({ grid }) => {
  console.log(grid);

  return (
    <GridContainer>
      {grid.map((column, columnIndex) => {
        return column.map((row, rowIndex) => (
          <Cell key={`${columnIndex}-${rowIndex}`} isAlive={false} />
        ));
      })}
    </GridContainer>
  );
};

export default Board;
