import React from "react";
import Simulator from "./simulator";

import styled from "styled-components";

import GameDescription from "#root/components/gameDescription";

import useDimensions from "#root/hooks/useDimensions";

const Header = styled.h1`
  margin: 0;

  background-color: #c66;
  border-radius: 15px;
  width: 80%;
  height: 100px;
  line-height: 80px;
  font-size: 60px;
  text-align: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Pacifico", cursive;
  color: #f7e4ca;
  z-index: 5;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    145deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(255, 237, 208, 1) 0%,
    rgba(255, 178, 106, 1) 100%
  );
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const Conways = () => {
  const [ref, { width }] = useDimensions();
  const isSmallScreen = Math.floor(width) < 750;

  return (
    <Container ref={ref}>
      <HeaderWrapper>
        <Header>Conways game of life</Header>
      </HeaderWrapper>

      <GameDescription />
      <Simulator isSmallScreen={isSmallScreen} />
    </Container>
  );
};

export default Conways;
