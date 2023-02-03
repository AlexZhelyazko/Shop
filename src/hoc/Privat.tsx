import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface PrivatProps {
  children: ReactElement;
}

export const Privat = ({ children }: PrivatProps) => {
  const auth = useSelector((state: RootState) => state.auth.isAuth);

  if (auth === false) {
    return <Navigate to="/" />;
  }
  return children;
};
