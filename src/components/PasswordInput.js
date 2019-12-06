import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import useToast from './Toast';
import { VisuallyHidden } from './GlobalStyles';

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;

  &::after {
    background-image: ${({ theme }) =>
      `linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.input})`};
    content: '';
    height: 4rem;
    pointer-events: none;
    position: absolute;
    right: 1rem;
    top: 1px;
    width: 4ch;
  }

  @media (min-width: ${({ theme }) => theme.breakpointS}) {
    background-color: ${({ theme }) => theme.input};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    flex-wrap: nowrap;
    padding-right: 1rem;

    &::after {
      height: 4.75rem;
      right: ${({ buttonsWidth }) => `${buttonsWidth + 32}px`};
      top: 0;
    }
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
    border: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
    flex: 1;
    font-size: 2.5rem;
  }

  &:focus {
    box-shadow: 0 0 0 1px ${props => props.theme.borderActive};
    outline-offset: 1px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpointS}) {
    margin-top: 0;
    width: auto;
  }
`;

const RegenerateButton = styled.button`
  border-radius: 50%;
  display: flex;
  padding: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpointS}) {
    margin-right: 1rem;
  }

  path:first-child,
  path:last-child {
    transition: transform ${({ theme }) => theme.transitionEase};
  }

  &:focus,
  &:hover {
    path:first-child {
      transform: translate(-0.25rem, 0.25rem);
    }

    path:last-child {
      transform: translate(0.25rem, -0.25rem);
    }
  }
`;

function PasswordInput({ generate, value }) {
  const buttonsRef = useRef();
  const inputRef = useRef();
  const [buttonsWidth, setButtonsWidth] = useState(null);
  const [Toaster, addToast] = useToast();

  useLayoutEffect(() => {
    const updateButtonsWidth = () =>
      setButtonsWidth(buttonsRef.current.clientWidth);

    window.addEventListener('resize', updateButtonsWidth);
    updateButtonsWidth();

    return () => window.removeEventListener('resize', updateButtonsWidth);
  }, []);

  const copyToClipboard = () => {
    try {
      inputRef.current.select();
      document.execCommand('copy');
      inputRef.current.blur();
      document.getSelection().removeAllRanges();

      addToast('Password is copied to clipboard');
    } catch (e) {
      addToast(
        'Copy to clipboard failed. Your password is already selected, ready to copy.',
      );
      // TODO: check if user is on phone, Mac, or PC?
      // so we can show them the correct instructions
      // navigator.platform.indexOf('Mac') > -1
      // function hasTouch() {
      //   try {
      //     document.createEvent('TouchEvent');
      //     return true;
      //   } catch (e) {
      //     return false;
      //   }
      // }
    }
  };

  return (
    <>
      <InputWrapper buttonsWidth={buttonsWidth}>
        <StyledInput
          aria-label="Generated password"
          ref={inputRef}
          value={value}
        />
        <Buttons ref={buttonsRef}>
          <RegenerateButton onClick={generate}>
            <svg
              width="32"
              height="32"
              viewBox="-5 -5 36 36"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.2 22.2L19.8 22.2C20.6 22.2 21.3 22.9 21.3 23.73C21.3 24.5 20.6 25.25 19.8 25.25L11.65 25.25C10.8 25.25 10.2 24.5 10.2 23.73L10.2 15.4C10.2 14.58 10.8 13.9 11.65 13.9C12.47 13.9 13.1 14.58 13.1 15.4L13.1 20.08L22.82 10.2C23.4 9.6 24.34 9.6 24.9 10.2C25.5 10.777 25.5 11.7 24.9 12.3L15.2 22.2Z" />
              <path d="M11 3.8H6.43C5.6 3.8 4.95 3.16 4.95 2.33C4.95 1.5 5.6 0.82 6.43 0.82H14.57C15.4 0.82 16.05 1.5 16.05 2.33V10.65C16.05 11.48 15.4 12.16 14.57 12.16C13.75 12.16 13.09 11.48 13.09 10.65V5.98L3.4 15.87C2.83 16.46 1.89 16.46 1.31 15.87C0.73 15.28 0.73 14.32 1.31 13.7326L11 3.8Z" />
            </svg>
            <VisuallyHidden>Generate a new password</VisuallyHidden>
          </RegenerateButton>
          <button
            type="button"
            aria-label="Copy password to clipboard"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </Buttons>
      </InputWrapper>
      <Toaster />
    </>
  );
}

PasswordInput.propTypes = {
  generate: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PasswordInput;
