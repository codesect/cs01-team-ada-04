import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    margin-right: 10px;
  }
  output {
    background: white;
    margin: 10px;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
  }
`;
const Input = styled.input`
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  &::-webkit-progress-bar {
    background-color: red;
  }
  &::-webkit-slider-thumb {
    height: 22px;
    width: 22px;
    border-radius: 50%;
    align-self: center;
    background: ${({ theme }) => theme.button};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
  }
  &::-moz-range-thumb {
    height: 22px;
    width: 22px;
    border-radius: 50%;
    align-self: center;
    background: ${({ theme }) => theme.button};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    border: none;
  }
  &::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.borderToggle};
    height: 2px;
  }

  &::-moz-range-track {
    background: ${({ theme }) => theme.borderToggle};
  }
  &::-moz-range-progress {
    background-color: ${({ theme }) => theme.footerBackground};
  }
  &:focus {
    outline: none;
  }
  &:-moz-focus-outer {
    border: 0;
  }
`;
function Range({ id, min, max, value, step, onChange }) {
  return (
    <Container>
      <output htmlFor={id} id={`${id}-output`}>
        {value}
      </output>
      <Input
        type="range"
        id={id}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        min={min}
        max={max}
        onChange={onChange}
        step={step}
        value={value}
      />
    </Container>
  );
}

export default Range;
