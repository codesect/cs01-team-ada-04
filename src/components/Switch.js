import React from "react";

import styled from "styled-components";

const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;  
  > input {
    display: none;
  }
  
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ecebed;
  transition: 0.5s;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    background-color: #ecebed;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.6s ease, margin 0.3s ease;
    border-radius: 50%;
    left: 2px; 
    
  }
 
  
`;


const SliderInput = styled.input`
  &:checked + ${Slider} {
    background-color: white;
    border: 1px solid #8555c5;
    &:before {
      transform: translateX(30px);
      background-color: #8555c5;     
        } 
   }
&:hover + ${Slider}{ 
    &:before:focus{background:red}  }
`
export default class SwitchToggle extends React.Component {
  state = {
    toggleOn: false
  };
  onChangeHandler = () => {
    this.setState(prevState => ({
      toggleOn: !prevState.toggleOn
    }));
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <Container tabIndex="1">
          <SliderInput type="checkbox" />
          <Slider onClick={this.onChangeHandler} />
        </Container>
        <h2>
          {" "}
          the state of the toggle is{" "}
          {this.state.toggleOn === true ? "On" : "Off"}
        </h2>
      </div>
    );
  }
}
