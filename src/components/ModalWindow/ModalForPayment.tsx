import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  setVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Wrapper = styled.div<{ visible: any }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div`
  position: absolute;
  width: 50%;
  height: 60%;
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

export const ModalForPayment: React.FC<ModalProps> = ({ visible, setVisible, children }) => {
  return (
    <Wrapper onClick={() => setVisible(false)} visible={visible}>
      <ModalWindow onClick={(e) => e.stopPropagation()}>{children}</ModalWindow>
    </Wrapper>
  );
};
