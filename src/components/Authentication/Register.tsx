import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import PhoneInput from 'react-phone-number-input';

interface RegisterProps {
  setLoginVisibility: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setRegisterVisibility: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Register: React.FC<RegisterProps> = ({ setLoginVisibility }) => {
  const [value, setValue] = useState();
  return (
    <div className="auth__wrapper">
      <div className="auth__top">
        <h2>Register</h2>
        <div className="auth__cancel-icons">
          <ImCancelCircle onClick={() => setLoginVisibility(false)} />
        </div>
      </div>
      <div className="auth__form-wrapper">
        <h4>I ALREADY HAVE AN ACCOUNT</h4>
        <form className="auth__form" action="">
          <div>
            <label htmlFor="login">Login</label>
            <input type="text" name="login" id="" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
          </div>
          <div>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="MX"
              value={value}
              onChange={(e) => setValue(value)}
            />
          </div>
          <button className="signBtn">Sign In</button>
        </form>
      </div>
      <div className="auth__bottom">
        <h4>I DON'T HAVE AN ACCOUNT</h4>
        <span>Enjoy added benefits and a richer experience by creating a personal account</span>
        <button className="createAccount">Create My Account</button>
      </div>
    </div>
  );
};
