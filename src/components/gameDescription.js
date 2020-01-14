import React, { useState } from "react";

import styled from "styled-components";

import Expand from "react-expand-animated";

import { Row, StyledDiv } from "#root/components/common/styledComponents";

const InfoSpan = styled.span`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;


const transitions = ["height", "opacity"];

const GameDescription = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(open => !open);
  };

  return (
    <>
      <Row>
        <StyledDiv onClick={handleClick} width={50}>
          <InfoSpan>Info +</InfoSpan>
        </StyledDiv>
      </Row>
      <Expand open={open} transitions={transitions} duration={200}>
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
            <li>
              Any dead cell with three live neighbors becomes a live cell.
            </li>
            <li>
              All other live cells die in the next generation. Similarly, all
              other dead cells stay dead.
            </li>
          </ol>
        </Row>
      </Expand>
    </>
  );
};

export default GameDescription;
