import React, { useState } from "react";

import styled from "styled-components";

import Expand from "react-expand-animated";

import { Row, StyledDiv } from "#root/components/common/styledComponents";

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d4d3d3;
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;
  -webkit-box-shadow: 2px 9px 11px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 2px 9px 11px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 2px 9px 11px 0px rgba(0, 0, 0, 0.09);
`;

const InfoSpan = styled.span`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  font-family: "Cambay", sans-serif;
`;

const Paragraph = styled.p`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  font-family: "Cambay", sans-serif;
`;

const Li = styled.li`
  list-style-type: none;
  text-align: center;
  font-family: "Cambay", sans-serif;
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
          <InfoSpan>Info {open ? "-" : "+"}</InfoSpan>
        </StyledDiv>
      </Row>

      <Expand open={open} transitions={transitions} duration={400}>
        <DescriptionWrapper>
          <Paragraph>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970.
          </Paragraph>

          <Paragraph>
            These rules, which compare the behavior of the automaton to real
            life, can be condensed into the following:
          </Paragraph>

          <ol>
            <Li>any live cell with two or three neighbors survives.</Li>
            <Li>
              Any dead cell with three live neighbors becomes a live cell.
            </Li>
            <Li>
              All other live cells die in the next generation. Similarly, all
              other dead cells stay dead.
            </Li>
          </ol>
        </DescriptionWrapper>
      </Expand>
    </>
  );
};

export default GameDescription;
