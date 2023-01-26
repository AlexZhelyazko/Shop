import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

const EmptyCartWrapper = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  font-family: 'Nunito';
`;

const ContinueLink = styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
  letter-spacing: 0.5px;
  font-size: 19px;
`;

export const EmptyCart = () => {
  return (
    <EmptyCartWrapper>
      <Header>Your Cart is Empty</Header>
      <ContinueLink>
        <NavLink to="/shop">Continue Shopping</NavLink>
      </ContinueLink>
    </EmptyCartWrapper>
  );
};
