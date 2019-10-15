import React, { useState } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

// hiding it visually while keeping it accessible
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const Label = styled.label`
  align-items: center;
  display: flex;
  min-height: 2rem;
  padding-left: 3.5rem;
  position: relative;
  user-select: none;

  &::before {
    background-color: #fff;
    border: 1px solid
      ${({ checked, theme }) => (checked ? theme.button : '#ece9f1')};
    border-radius: 100rem;
    box-shadow: ${({ theme }) => theme.boxShadowSmall};
    content: '';
    display: block;
    height: 1.75rem;
    left: 0;
    position: absolute;
    top: 0.125rem;
    transition: border-color ${({ theme }) => theme.transitionEase};
    width: 3rem;
  }

  &::after {
    background-color: ${({ checked, theme }) =>
      checked ? theme.button : '#ece9f1'};
    border-radius: 50%;
    content: '';
    height: 1.5rem;
    left: 0.125rem;
    position: absolute;
    top: 0.25rem;
    transform: translateX(${props => (props.checked ? '1.25rem' : 0)});
    transition: background-color ${({ theme }) => theme.transitionEase},
      transform ${({ theme }) => theme.transitionEase};
    width: 1.5rem;
  }
`;

function Toggle({ className, isChecked, label, name, onToggle }) {
  const [checked, setChecked] = useState(isChecked);

  const toggleChecked = e => {
    setChecked(e.target.checked);
    onToggle(e.target.checked);
  };

  return (
    <Label className={className} checked={checked}>
      <Checkbox name={name} checked={checked} onChange={toggleChecked} />
      {label}
    </Label>
  );
}

Toggle.defaultProps = {
  isChecked: false,
  onToggle: f => f,
};

Toggle.propTypes = {
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onToggle: PropTypes.func,
};

export default Toggle;
