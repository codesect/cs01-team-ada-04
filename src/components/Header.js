import React from 'react';
import styled from 'styled-components/macro';

import { Wrapper } from './GlobalStyles';
import LogoImg from '../logo.svg';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.headerBackground};
  box-shadow: ${({ theme }) => theme.boxShadowHeader};
`;

const Logo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpointS}) {
    justify-content: flex-start;
  }
`;

const LogoText = styled.div`
  margin-left: 1rem;
`;

const TagLine = styled.div`
  line-height: 1.25;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.logoText};
  font-size: 2rem;
  letter-spacing: -0.125rem;
  line-height: 1;
`;

function Header() {
  return (
    <StyledHeader>
      <Wrapper>
        <Logo>
          <img src={LogoImg} alt="" />
          <LogoText>
            <Title>
              <strong>Strong</strong>Pass
            </Title>
            <TagLine>Password Generator</TagLine>
          </LogoText>
        </Logo>
      </Wrapper>
    </StyledHeader>
  );
}

export default Header;
