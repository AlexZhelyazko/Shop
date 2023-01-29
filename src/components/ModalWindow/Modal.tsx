import React from 'react';
import styled from 'styled-components';
import { AuthVisible } from '../../@types/types';

interface ModalProps {
  authVisible: string;
  children?: React.ReactNode;
  setAuthVisible: (value: AuthVisible | ((prevVar: AuthVisible) => AuthVisible)) => void;
}

const Wrapper = styled.div<{ authVisible: any }>`
  display: ${(props) => (props.authVisible !== AuthVisible.disabled ? 'flex' : 'none')};
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
  padding: 10px 55px;
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

export const Modal: React.FC<ModalProps> = ({ authVisible, setAuthVisible, children }) => {
  return (
    <Wrapper onClick={() => setAuthVisible(AuthVisible.disabled)} authVisible={authVisible}>
      <ModalWindow onClick={(e) => e.stopPropagation()}>{children}</ModalWindow>
    </Wrapper>
  );
};
