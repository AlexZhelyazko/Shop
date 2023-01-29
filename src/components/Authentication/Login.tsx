import './auth.scss';
import React from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { AuthVisible } from '../../@types/types';

interface LoginProps {
  setAuthVisible: (value: AuthVisible | ((prevVar: AuthVisible) => AuthVisible)) => void;
}

export const Login: React.FC<LoginProps> = ({ setAuthVisible }) => {
  return (
    <div className="auth__wrapper">
      <div className="auth__top">
        <h2>IDENTIFICATION</h2>
        <div className="auth__cancel-icons">
          <ImCancelCircle onClick={() => setAuthVisible(AuthVisible.disabled)} />
        </div>
      </div>
      <div className="auth__form-wrapper">
        <h4>I ALREADY HAVE AN ACCOUNT</h4>
        <form className="auth__form" action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
          </div>
          <button className="signBtn">Sign In</button>
        </form>
      </div>
      <div className="auth__bottom">
        <h4>I DON'T HAVE AN ACCOUNT</h4>
        <span>Enjoy added benefits and a richer experience by creating a personal account</span>
        <button onClick={() => setAuthVisible(AuthVisible.register)} className="createAccount">
          Create My Account
        </button>
      </div>
    </div>
  );
};
