import React from "react";

import styled from "styled-components";

import { Button, Row, Slider } from "#root/components/common/styledComponents";

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: ${props => (props.ml ? props.ml : undefined)};
  margin-right: ${props => (props.mr ? props.mr : undefined)};
`;

const SliderWrapper = styled.div`

margin-top: auto;
margin-bottom: auto;

`;

const Controls = () => {
  return (
    <>
      <Row pt={15} pb={15}>
        <Section mr="100px">
          <Button onClick={() => {}}>Start</Button>
          <Button onClick={() => {}}>Randomise</Button>
          <Button onClick={() => {}}>Clear</Button>
        </Section>
        <SliderWrapper>
          Speed 
          <Slider
            value={250}
            type="range"
            min="1"
            max={500}
            onChange={() => {}}
          />
          
        </SliderWrapper>
      </Row>
    </>
  );
};

export default Controls;
