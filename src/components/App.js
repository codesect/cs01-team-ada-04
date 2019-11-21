import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import PasswordInput from './PasswordInput';
import SwitchToggle from './SwitchToggle';
import { Wrapper } from './GlobalStyles';
import generatePassword from '../utils/generatePassword';
import useLocalStorage from '../hooks/useLocalStorage';

const Main = styled.main`
  min-height: calc(100vh - 5.5rem - 2.125rem);
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: max-content;

  & > * {
    margin-bottom: 0.5rem;
    width: auto;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;
  line-height: 1;
  margin: 2rem 0 1rem;
  text-align: center;
`;

function App() {
  const [settings, setSettings] = useLocalStorage('settings', {
    hasLowercase: true,
    hasNumbers: false,
    hasSymbols: false,
    hasUppercase: true,
    length: 24,
  });
  const [hasNumbers, setHasNumbers] = useState(settings.hasNumbers);
  const [hasSymbols, setHasSymbols] = useState(settings.hasSymbols);
  const [hasLowercase, setHasLowercase] = useState(settings.hasLowercase);
  const [hasUppercase, setHasUppercase] = useState(settings.hasUppercase);
  const [length, setLength] = useState(settings.length);
  const [password, setPassword] = useState(() => {
    try {
      return generatePassword({
        hasLowercase,
        hasNumbers,
        hasSymbols,
        hasUppercase,
        length,
      });
    } catch (e) {
      return '';
    }
  });

  const generateNewPassword = useCallback(() => {
    if (hasLowercase || hasNumbers || hasSymbols || hasUppercase) {
      setPassword(
        generatePassword({
          hasLowercase,
          hasNumbers,
          hasSymbols,
          hasUppercase,
          length,
        }),
      );
    } else {
      // TODO: Notify user that they must have at least one option ticked?
      setPassword('');
    }
  }, [hasLowercase, hasNumbers, hasSymbols, hasUppercase, length]);

  useEffect(() => {
    generateNewPassword();
    setSettings({
      hasLowercase,
      hasNumbers,
      hasSymbols,
      hasUppercase,
      length,
    });
    // eslint-disable-next-line
  }, [
    generateNewPassword,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    hasUppercase,
    length,
  ]);

  return (
    <Main>
      <Wrapper>
        <h1>Password generator</h1>
        <PasswordInput generate={generateNewPassword} value={password} />
        <SubTitle>Customise Your Password</SubTitle>
        <Options>
          <SwitchToggle
            label="Lowercase letters"
            name="lowercase"
            isChecked={hasLowercase}
            onToggle={setHasLowercase}
          />
          <SwitchToggle
            label="Uppercase letters"
            name="uppercase"
            isChecked={hasUppercase}
            onToggle={setHasUppercase}
          />
          <SwitchToggle
            label="Numbers"
            name="numbers"
            isChecked={hasNumbers}
            onToggle={setHasNumbers}
          />
          <SwitchToggle
            label="Symbols"
            name="symbols"
            isChecked={hasSymbols}
            onToggle={setHasSymbols}
          />
          <label>
            <input
              type="number"
              min="4"
              max="99"
              value={length}
              onChange={e => setLength(+e.target.value)}
            />
            Length
          </label>
        </Options>
      </Wrapper>
    </Main>
  );
}

export default App;
