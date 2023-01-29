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
        <h2>IDENTIFICATION</h2>
        <div className="auth__cancel-icons">
          <ImCancelCircle onClick={() => setLoginVisibility(false)} />
        </div>
      </div>
      <div className="auth__form-wrapper">
        <h4>Register</h4>
        <form className="auth__form" action="">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="" />
          </div>
          <div>
            <label htmlFor="login">Email</label>
            <input type="text" name="email" id="" />
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
          <button className="signBtn">Sign Up</button>
        </form>
      </div>
      <div className="auth__bottom" style={{ display: 'flex', alignItems: 'center' }}>
        <h4>I HAVE AN ACCOUNT!</h4>
        <button className="createAccount">Sign In</button>
      </div>
    </div>
  );
};
