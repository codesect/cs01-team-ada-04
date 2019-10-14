import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Wrapper } from './GlobalStyles';
import generatePassword from '../utils/generatePassword';

const Main = styled.main`
  min-height: calc(100vh - 5.5rem - 2.125rem);
`;

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

const PasswordInput = styled.input.attrs({ readOnly: true, type: 'text' })`
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

function App() {
  const [length, setLength] = useState(20);
  const [password, setPassword] = useState(generatePassword({ length }));

  const generateNewPassword = () => setPassword(generatePassword({ length }));

  return (
    <Main>
      <Wrapper>
        <h1>Password generator</h1>
        <InputWrapper>
          <PasswordInput value={password} />
        </InputWrapper>
        <button onClick={generateNewPassword}>New Password</button>
      </Wrapper>
    </Main>
  );
}

export default App;
