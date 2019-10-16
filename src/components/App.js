import React from 'react';
import styled from 'styled-components/macro';

import { Wrapper } from './GlobalStyles';
import generatePassword from '../utils/generatePassword';
import SwitchToggle from './SwitchToggle';

const Main = styled.main`
  min-height: calc(100vh - 5.5rem - 2.125rem);
`;

function App() {
  return (
    <Main>
      <Wrapper>
        <h1>Password generator</h1>
        <p>
          Here is a random password: <code>{generatePassword()}</code>
        </p>
        <SwitchToggle
          label="Uppercase letters"
          name="uppercase"
          isChecked
          onToggle={console.log}
        />
      </Wrapper>
    </Main>
  );
}

export default App;
