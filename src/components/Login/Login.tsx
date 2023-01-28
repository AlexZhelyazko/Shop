import './login.scss';
import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

export const Login: React.FC = () => {
  return (
    <div className="login__wrapper">
      <div className="login__top">
        <h2>IDENTIFICATION</h2>
        <div className="login__cancel-icons">
          <ImCancelCircle />
        </div>
      </div>
      <div className="login__form-wrapper">
        <h4>I ALREADY HAVE AN ACCOUNT</h4>
        <form className="login__form" action="">
          <div>
            <label htmlFor="login">Login</label>
            <input type="text" name="login" id="" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
          </div>
          <button className="signIn">Sign In</button>
        </form>
      </div>
      <div className="login__bottom">
        <h4>I DON'T HAVE AN ACCOUNT</h4>
        <span>Enjoy added benefits and a richer experience by creating a personal account</span>
        <button className="createAccount">Create My Account</button>
      </div>
    </div>
  );
};
