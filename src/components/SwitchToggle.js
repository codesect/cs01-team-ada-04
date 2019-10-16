import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 8em;
  height: 4em;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: #fbfbfb;
  border-radius: 4em;
  padding: 4px;
  transition: all 0.4s ease;
  border: 2px solid #e8eae9;
  &:focus::after{
    box-sizing: initial;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),
    inset 0px 0px 0px 3px #9c9c9c;
  }
  &:active::after{
    box-sizing: initial;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),
    inset 0px 0px 0px 3px #9c9c9c;
  }
  &::after{
    left: 0;
  position: relative; 
  display: block;
  content: '';
  width: 50%;
  height: 100%;
  border-radius: 4em;
  background: red;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
  }
 
`

const Input = styled.input`
 outline: 0;
  width: 8em;
  height: 4em;
  position: absolute;
  cursor: pointer;
&:checked + ${Btn}::after{
left: 50%
}
`
class SwitchToggle extends React.Component{
    state = {
        toggleOn: false
    }

    handleToggle =()=>{
        this.setState(prevState=>({
            toggleOn :!prevState.toggleOn
            
        }))   
    }
    render(){
        return(
            <div>
                <h1>Hello from new toggle</h1>
                <p>the Current state is : {this.state.toggleOn === true ? 'On' : 'Off'}</p>
                <Input type='checkbox' />
                <Btn  onClick={this.handleToggle} />
            </div>
        )
    }
}
export default SwitchToggle