import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const MeterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const PasswordMeter = styled.div`
  background-color: ${({ strength, theme }) => theme.password[`${strength}Bg`]};
  border-radius: 5px;
  height: 10px;
  margin: 0 auto;
  max-width: 400px;
  overflow: hidden;
  position: relative;
  width: 100%;

  &::after {
    background-color: ${({ strength, theme }) => theme.password[strength]};
    content: '';
    height: 100%;
    position: absolute;
    transform: ${({ score }) => `translateX(${score - 100}%)`};
    transition: transform ${({ theme }) => theme.transitionEase};
    width: 100%;
  }
`;

const PasswordMessage = styled.div`
  color: ${({ strength, theme }) => theme.password[strength]};
  text-align: center;
`;

function PasswordStrength({ score }) {
  let message;
  let strength;

  if (score < 20) {
    message = 'Really weak password';
    strength = 'weak';
  } else if (score < 40) {
    message = 'Weak password';
    strength = 'weak';
  } else if (score < 60) {
    message = 'Good password';
    strength = 'good';
  } else if (score < 80) {
    message = 'Strong password';
    strength = 'strong';
  } else {
    message = 'Very strong password';
    strength = 'strong';
  }

  return (
    <MeterWrapper>
      <PasswordMessage aria-live="polite" strength={strength}>
        {message}
      </PasswordMessage>
      <PasswordMeter score={score} strength={strength} />
    </MeterWrapper>
  );
}

PasswordStrength.propTypes = {
  score: PropTypes.number.isRequired,
};

export default PasswordStrength;
