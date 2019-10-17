import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;

  &::after {
    background-image: ${({ theme }) =>
      `linear-gradient(to right, transparent, ${theme.input})`};
    content: '';
    height: calc(100% - 2px);
    position: absolute;
    right: 1rem;
    width: 4ch;
  }
`;

const StyledInput = styled.input.attrs({
  name: 'generatedPassword',
  readOnly: true,
  type: 'text',
})`
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
    monospace;
  font-size: 2rem;
  position: relative;
  text-align: center;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpointS}) {
    font-size: 2.5rem;
  }

  &:focus {
    box-shadow: 0 0 0 1px ${props => props.theme.borderActive};
  }
`;

function PasswordInput({ value }) {
  return (
    <InputWrapper>
      <StyledInput value={value} />
    </InputWrapper>
  );
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
};

export default PasswordInput;
