import React, { useState } from 'react';
import styled from 'styled-components/macro';

import PasswordInput from './PasswordInput';
import { Wrapper } from './GlobalStyles';
import generatePassword from '../utils/generatePassword';

const Main = styled.main`
  min-height: calc(100vh - 5.5rem - 2.125rem);
`;

function App() {
  const [length, setLength] = useState(20);
  const [password, setPassword] = useState(generatePassword({ length }));

  const generateNewPassword = () => setPassword(generatePassword({ length }));

  return (
    <Main>
      <Wrapper>
        <h1>Password generator</h1>
          <PasswordInput value={password} />
        <button onClick={generateNewPassword}>New Password</button>
      </Wrapper>
    </Main>
  );
}

export default App;
