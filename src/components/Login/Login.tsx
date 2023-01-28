import React from 'react';
import styled from 'styled-components';

interface LoginProps {
  loginVisibility: boolean;
}

const Wrapper = styled.div<{ loginVisibility: any }>`
  display: ${(props) => (props.loginVisibility ? 'flex' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
`;

const LoginForm = styled.div`
  position: absolute;
  width: 30%;
  height: 20%;
  background-color: white;
  z-index: 4;
  opacity: 1;
`;

export const Login: React.FC<LoginProps> = (loginVisibility: LoginProps) => {
  return (
    <Wrapper loginVisibility={loginVisibility}>
      <LoginForm />
    </Wrapper>
  );
};
