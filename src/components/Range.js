import React from 'react';
import styled from 'styled-components/macro';

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  color: red;
`;
function Range({ id, min, max, value, step, onChange }) {
  return (
    <>
      <output htmlFor={id} id={`${id}-output`}>
        {value}
      </output>
      <label htmlFor="id">Length</label>
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
    </>
  );
}

export default Range;
