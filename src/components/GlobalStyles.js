import styled, { createGlobalStyle } from 'styled-components/macro';

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 0.5rem 1rem;
`;

export default createGlobalStyle`
  * {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: Nunito, -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
  }

  strong {
    font-weight: 600;
  }

  button, input {
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding: 0.5rem 1rem;
  }

  button {
    background-color: ${({ theme }) => theme.button};
    color: ${({ theme }) => theme.buttonText};
    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transitionEase}
  }

  input {
    background-color: ${({ theme }) => theme.input};
    transition: border-color ${({ theme }) => theme.transitionEase}
  }

  button:focus,
  button:hover {
    background-color: ${({ theme }) => theme.buttonActive};
  }

  input:focus,
  input:hover {
    border-color: ${({ theme }) => theme.borderActive};
  }

  button:focus,
  input:focus {
    outline: thin dotted;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  svg {
    fill: currentColor;
  }
`;
