import React from 'react';
import styled from 'styled-components';

interface LoginProps {
  loginVisibility: boolean;
}

const Wrapper = styled.div<{ loginVisibility: any }>`
  display: ${(props) => (props.loginVisibility ? 'flex' : 'none')};
  width: 20%;
  position: absolute;
  background-color: gray;
  height: 100%;
  z-index: 2;
`;

export const Login: React.FC<LoginProps> = (loginVisibility: LoginProps) => {
  return <Wrapper loginVisibility={loginVisibility}>login</Wrapper>;
};
