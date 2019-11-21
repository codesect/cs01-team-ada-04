import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import SwitchToggle from './SwitchToggle';
import { Wrapper } from './GlobalStyles';

import calculatePasswordStrength from '../utils/calculatePasswordStrength';
import generatePassword from '../utils/generatePassword';
import useLocalStorage from '../hooks/useLocalStorage';
import Range from './Range';

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
    hasNumbers: true,
    hasSymbols: true,
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
      return ' ';
    }
  });
  const [strengthScore, setStrengthScore] = useState(
    calculatePasswordStrength(password),
  );

  const generateNewPassword = useCallback(() => {
    let newPassword = '';
    // TODO: Notify user that they must have at least one option ticked?

    if (hasLowercase || hasNumbers || hasSymbols || hasUppercase) {
      newPassword = generatePassword({
        hasLowercase,
        hasNumbers,
        hasSymbols,
        hasUppercase,
        length,
      });
    }

    setPassword(newPassword);

    return newPassword;
  }, [hasLowercase, hasNumbers, hasSymbols, hasUppercase, length]);

  useEffect(() => {
    const newPassword = generateNewPassword();

    setStrengthScore(calculatePasswordStrength(newPassword));
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
        <PasswordStrength score={strengthScore} />
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

          <Range
            id="length"
            min={4}
            max={100}
            value={length}
            onChange={e => setLength(parseInt(e.target.value))}
          />
        </Options>
      </Wrapper>
    </Main>
  );
}

export default App;
