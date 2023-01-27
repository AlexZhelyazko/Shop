import React from 'react';
import styled from 'styled-components';

interface LoginProps {
  loginVisibility: boolean;
}

const Wrapper = styled.div<{ loginVisibility: boolean }>`
  display: ${(props) => (props.loginVisibility ? flex : none)};
`;

export const Login: React.FC<LoginProps> = (loginVisibility) => {
  return <Wrapper loginVisibility={loginVisibility}>login</Wrapper>;
};
