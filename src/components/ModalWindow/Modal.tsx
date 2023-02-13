import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  setVisible: (value: any | boolean) => void;
  justifyContent: string;
  alignItems: string;
  width: string;
  height: string;
}

const Wrapper = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  visible: boolean;
}>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

const ModalWindow = styled.div<{ width?: string; height?: string; alignItems?: string }>`
  position: absolute;
  width: ${(props) => props.width || '25%'};
  height: ${(props) => props.height || '100%'};
  background-color: white;
  padding: 10px 55px;
  z-index: 4;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: ${(props) => props.alignItems};
  @media all and (max-width: 768px) {
    position: relative;
    width: 100%;
  }
`;

export const Modal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  children,
  width,
  height,
  justifyContent,
  alignItems,
}) => {
  return (
    <Wrapper
      justifyContent={justifyContent}
      alignItems={alignItems}
      onClick={() => setVisible(false)}
      visible={visible}>
      <ModalWindow
        alignItems={alignItems}
        height={height}
        width={width}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWindow>
    </Wrapper>
  );
};
