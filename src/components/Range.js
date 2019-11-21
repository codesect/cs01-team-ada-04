import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  output {
    background-color: ${({ theme }) => theme.input};
    margin: 10px;
    padding: 6px 10px;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.border};
  }
`;
const Input = styled.input`
  align-items: center;
  appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  width: 100%;

  &::-webkit-slider-thumb {
    height: 22px;
    width: 22px;
    border-radius: 50%;
    align-self: center;
    background-color: ${({ theme }) => theme.button};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
  }
  &::-moz-range-thumb {
    height: 22px;
    width: 22px;
    border-radius: 50%;
    align-self: center;
    background-color: ${({ theme }) => theme.button};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    border: 0;
  }
  &::-webkit-slider-runnable-track {
    background-color: ${({ theme }) => theme.borderToggle};
    height: 2px;
  }

  &::-moz-range-track {
    background-color: ${({ theme }) => theme.borderToggle};
  }
  &::-moz-range-progress {
    background-color: ${({ theme }) => theme.footerBackground};
  }
  &:focus {
    outline: thin dotted;
  }
  &:-moz-focus-outer {
    border: 0;
  }
`;
function Range({ id, min, max, value, onChange, step, label }) {
  return (
    <Container>
      <output htmlFor={id}>{value}</output>
      <Input
        aria-label={label}
        type="range"
        id={id}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        step={step}
      />
    </Container>
  );
}
Range.defaultProps = {
  step: 1,
};
Range.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Range;
