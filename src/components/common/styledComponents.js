import styled from "styled-components";

const Row = styled.div`
  padding-top: ${props => (props.pt ? `${props.pt}px` : undefined)};
  padding-bottom: ${props => (props.pb ? `${props.pb}px` : undefined)};
  display: flex;
  flex-direction: ${props => (props.isSmallScreen ? "column" : "row")};
  align-content: center;
  justify-content: space-evenly;
  max-width: 70%;
`;

const Button = styled.button`
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
  padding: 10px 10px 10px 10px;
  font-weight: bold;
  font-size: 15px;
  height: 40px;
  border: 1px solid ${props => (props.color ? props.color : "#c66")};
  color: #f7e4ca;
  background-color: ${props => (props.color ? props.color : "#c66")};
  cursor: pointer;
  letter-spacing: 1px;

  transition: all 0.2s ease-in-out;

  :focus {
    outline: 0;
  }

  :hover {
    transform: scale(1.05);
  }

  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 200px;
  height: 5px;
  margin-top: 20px;
  border-radius: 2px;
  margin-left: 5px;
  margin-right: 5px;
  background: #5c5c5c;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;

  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 5px;
    background: #c66;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: ${props => (props.ml ? props.ml : undefined)};
  margin-right: ${props => (props.mr ? props.mr : undefined)};
`;

const StyledDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
  padding: 10px 10px 10px 10px;
  font-weight: bold;
  font-size: 15px;
  height: 20px;
  width: ${props => props.width ? `${props.width}px` : undefined };
  background-color: #c66;
  color: #f7e4ca;
  cursor: default;
`;

export { Row, Section, Button, Slider, StyledDiv };
