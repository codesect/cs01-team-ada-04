import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

const progress = css`
  background-color: ${({ theme }) => theme.button};
  border-radius: 100rem;
  height: ${({ theme }) => theme.rangeTrackHeight};
`;

const thumb = css`
  appearance: none;
  background-color: ${({ theme }) => theme.button};
  border: 1px solid ${({ theme }) => theme.borderToggle};
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
  height: ${({ theme }) => theme.rangeThumbSize};
  width: ${({ theme }) => theme.rangeThumbSize};
`;

const track = css`
  background-color: ${({ theme }) => theme.borderToggle};
  border: 0;
  border-radius: 100rem;
  height: ${({ theme }) => theme.rangeTrackHeight};
  width: 100%;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Output = styled.output`
  background-color: ${({ theme }) => theme.input};
  font-family: ${({ theme }) => theme.fontFamilyMono};
  min-width: 3rem;
  padding: 0.5rem;
  text-align: center;
`;

const Input = styled.input`
  appearance: none;
  background-color: transparent;
  border: 0;
  height: 2.5rem;
  margin: 0;
  padding: 0 0.5rem;
  width: 12.5rem;

  &::-webkit-slider-runnable-track {
    ${track};
    background-image: ${({ theme }) =>
      `linear-gradient(${theme.borderActive}, ${theme.borderActive})`};
    background-position: 0;
    background-repeat: no-repeat;
    background-size: ${({ posX, theme }) =>
        `calc(${theme.rangeThumbSize} / 2 + ${posX} * (100% - ${theme.rangeThumbSize}))`}
      100%;
  }
  &::-moz-range-track {
    ${track};
  }
  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${progress};
  }
  &::-ms-fill-lower {
    ${progress};
  }

  &::-webkit-slider-thumb {
    ${thumb};
    transform: ${({ theme }) =>
      `translateY(calc(-50% + ${theme.rangeTrackHeight} / 2))`};
  }
  &::-moz-range-thumb {
    ${thumb};
  }
  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }
`;

function Range({ id, label, max, min, onChange, step, value, ...props }) {
  const [posX, setPosX] = useState((value - min) / (max - min));

  useEffect(() => {
    setPosX((value - min) / (max - min));
  }, [max, min, value]);

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <Container>
        <Output htmlFor={id}>{value}</Output>
        <Input
          type="range"
          id={id}
          aria-valuemin={min}
          aria-valuenow={value}
          aria-valuemax={max}
          min={min}
          max={max}
          onChange={e => onChange(parseInt(e.target.value))}
          posX={posX}
          step={step}
          value={value}
          {...props}
        />
      </Container>
    </>
  );
}

Range.defaultProps = {
  step: 1,
};

Range.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
};

export default Range;
