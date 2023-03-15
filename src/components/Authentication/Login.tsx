import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';
import { queryApi } from '../../redux/query';
import { useAppDispatch } from '../../hooks/hook';
import { emailValidation, isFieldEmptyValidation } from '../../utils/validation';

interface LoginProps {
  setLoginVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setRegisterVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Login: React.FC<LoginProps> = ({ setLoginVisible, setRegisterVisible }) => {
  const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const registerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    field === 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let validEmail = emailValidation(email, setEmailError);
    let validPassword = isFieldEmptyValidation(password, setPasswordError);
    if (validEmail && validPassword) {
      let user = data.find((item: any) => {
        return item.password === password && item.email === email;
      });
      if (user) {
        dispatch(setIsAuth(true));
        dispatch(setCurrentUser(user));
      } else {
        setError('No Such User!');
      }
    }
  };

  if (isError) {
    console.warn('Error');
  }

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
        <form className="auth__form">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => handleChange(e, 'email')}
              type="text"
              name="email"
            />
            <div className="auth__form-validation_error">{emailError && emailError}</div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => handleChange(e, 'password')}
              type="password"
              name="password"
            />
            <div className="auth__form-validation_error">{passwordError && passwordError}</div>
          </div>
          <div className="auth__form-validation_error">{error && error}</div>
          <button
            disabled={isLoading}
            type="submit"
            onClick={(e) => handleClick(e)}
            className="signBtn">
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
