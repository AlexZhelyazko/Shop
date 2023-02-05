import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';
import { queryApi } from '../../redux/query';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { getCartItems, getCurrentUser, getIsAuth } from '../../redux/selectors';
import { isValidEmail } from '../../utils/validation';

interface LoginProps {
  setLoginVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setRegisterVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Login: React.FC<LoginProps> = ({ setLoginVisible, setRegisterVisible }) => {
  const { data = [], isLoading } = queryApi.useGetUsersQuery('');

  const cartItems = useAppSelector(getCartItems);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail(e.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    setEmail(e.target.value);
  };

  const registerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoginVisible(false);
    setRegisterVisible(true);
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    let user = data.find((item: any) => {
      return item.password === password && item.email === email;
    });
    if (user) {
      console.log(user);
      console.log({ ...cartItems });
      dispatch(setIsAuth(true));
      dispatch(setCurrentUser(user));
    } else {
      console.log('Error');
    }
  };
  return (
    <div className="auth__wrapper">
      <div className="auth__top">
        <h2>IDENTIFICATION</h2>
        <div className="auth__cancel-icons">
          <ImCancelCircle onClick={() => setLoginVisible(false)} />
        </div>
      </div>
      <div className="auth__form-wrapper">
        <h4>I ALREADY HAVE AN ACCOUNT</h4>
        <form className="auth__form" action="">
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={(e) => handleEmailChange(e)} type="text" name="email" />
            <div>{error && error}</div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
          </div>
          <button onClick={(e) => handleClick(e)} className="signBtn">
            Sign In
          </button>
        </form>
      </div>
      <div className="auth__bottom">
        <h4>I DON'T HAVE AN ACCOUNT</h4>
        <span>Enjoy added benefits and a richer experience by creating a personal account</span>
        <button onClick={(e) => registerClick(e)} className="createAccount">
          Create My Account
        </button>
      </div>
    </div>
  );
};
