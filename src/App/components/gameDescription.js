import React from "react";

import styled from "styled-components";

const Row = styled.div`
  padding-top: ${props => (props.pt ? `${props.pt}px` : undefined)};
  padding-bottom: ${props => (props.pb ? `${props.pb}px` : undefined)};
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

const GameDescription = () => {
  return (
    <>
      <Row pt={20}>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.
      </Row>

      <Row pt={20}>
        These rules, which compare the behavior of the automaton to real life,
        can be condensed into the following:
      </Row>
      <Row pt={20}>
        <ol>
          <li>any live cell with two or three neighbors survives.</li>
          <li>Any dead cell with three live neighbors becomes a live cell.</li>
          <li>
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </li>
        </ol>
      </Row>
    </>
  );
};


export default GameDescription