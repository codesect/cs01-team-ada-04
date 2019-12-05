import React, { useState } from 'react';
import Alert from '@reach/alert';
import styled, { css, keyframes } from 'styled-components/macro';

const slideIn = keyframes`
  from {
    opacity: 0.75;
    transform: translateY(30%);
  }

  to {
    opacity: 1;
    transform: translateY(0),
  }
`;

const animation = css`
  animation: ${slideIn} ${({ theme }) => theme.transitionEaseOut};
`;

const StyledAlert = styled(Alert)`
  ${({ last }) => last && animation};
  background-color: ${({ theme }) => theme.toastBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  bottom: 0;
  box-shadow: ${({ theme }) => theme.boxShadowSmall};
  color: ${({ theme }) => theme.toastText};
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  text-align: center;
`;

const ToastWrapper = styled.div`
  bottom: 2.5rem;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  left: 1rem;
  max-width: 10rem;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

function Toast() {
  const [messages, setMessages] = useState([]);

  function addToast(toast) {
    setMessages(prevMessages => [...prevMessages, toast]);

    window.setTimeout(() => {
      setMessages(prevMessages => prevMessages.slice(1));
    }, 3000);
  }

  function Toaster(props) {
    return (
      <ToastWrapper {...props}>
        {messages.map((message, index) => (
          <StyledAlert key={index} last={messages.length - 1 === index}>
            {message}
          </StyledAlert>
        ))}
      </ToastWrapper>
    );
  }

  return [Toaster, addToast];
}

export default Toast;
