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
  z-index: 10;
  top: 0;
  left: 0;
  justify-content: flex-end;
  align-items: flex-start;
`;

const ModalWindow = styled.div`
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: white;
  padding: 15px 55px;
  z-index: 4;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media all and (max-width: 768px) {
    position: relative;
    width: 100%;
  }
`;

export const Modal: React.FC<ModalProps> = ({ loginVisibility, setLoginVisibility, children }) => {
  return (
    <Wrapper onClick={() => setLoginVisibility(false)} loginVisibility={loginVisibility}>
      <ModalWindow onClick={(e) => e.stopPropagation()}>{children}</ModalWindow>
    </Wrapper>
  );
};
