import React, { useState } from "react";

import styled, { keyframes } from "styled-components";

import { Row, StyledDiv, Button } from "#root/components/common/styledComponents";

const enterAnimation = keyframes`
from { 
  opacity: 0;
  transform: translateY(-10px)
}

to { 
  opacity: 1;
  transform: translateY(0px)
}
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cc666675;
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;

  animation: ${enterAnimation} 300ms ease-in;

  -webkit-box-shadow: 2px 9px 11px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 2px 9px 11px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 2px 9px 11px 0px rgba(0, 0, 0, 0.09);
`;

const InfoSpan = styled.span`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  color: #f7e4ca;
  font-family: "Cambay", sans-serif;
`;

const Paragraph = styled.p`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  /* color: #f7e4ca; */
  font-family: "Cambay", sans-serif;
`;

const Li = styled.li`
  list-style-type: none;
  text-align: center;
  font-family: "Cambay", sans-serif;
`;

const GameDescription = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(open => !open);
  };

  return (
    <>
      <Row>
        <Button onClick={handleClick} width={50}>
          <InfoSpan>Info {open ? "-" : "+"}</InfoSpan>
        </Button>
      </Row>

      {open && (
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
      )}
    </>
  );
};

export default GameDescription;
