import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  loginVisibility: boolean;
  children?: React.ReactNode;
  setLoginVisibility: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Wrapper = styled.div<{ loginVisibility: any }>`
  display: ${(props) => (props.loginVisibility ? 'flex' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div`
  position: absolute;
  width: 30%;
  height: 20%;
  background-color: white;
  z-index: 4;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal: React.FC<ModalProps> = ({ loginVisibility, setLoginVisibility, children }) => {
  return (
    <Wrapper onClick={() => setLoginVisibility(false)} loginVisibility={loginVisibility}>
      <ModalWindow onClick={(e) => e.stopPropagation()}>{children}</ModalWindow>
    </Wrapper>
  );
};
