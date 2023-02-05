import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { setIsAuth, setCurrentUser } from '../../redux/auth/authSlice';
import { queryApi } from '../../redux/query';
import { useAppDispatch } from '../../hooks/hook';
import { emailValidation, isFieldEmptyValidation } from '../../utils/validation';
import { nanoid } from '@reduxjs/toolkit';

interface RegisterProps {
  setRegisterVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setLoginVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Register: React.FC<RegisterProps> = ({ setRegisterVisible, setLoginVisible }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [fullNameError, setFulltNameError] = useState<null | string>(null);

  const dispatch = useAppDispatch();

  const [addUser, { isError }] = queryApi.useAddUserMutation();

  const haveAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegisterVisible(false);
    setLoginVisible(true);
  };

  const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let validEmail = emailValidation(email, setEmailError);
    let validPassword = isFieldEmptyValidation(password, setPasswordError);
    let validFulltName = isFieldEmptyValidation(fullName, setFulltNameError);
    if (validEmail && validPassword && validFulltName) {
      let newUser = {
        id: nanoid(),
        email,
        password,
        name: fullName,
        role: 'user',
        avatar: avatar || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
        basket: [],
        history: [],
      };
      await addUser(newUser);
      console.log(isError);
      if (isError) {
        console.log('Error');
      } else {
        dispatch(setIsAuth(true));
        dispatch(setCurrentUser(newUser));
      }
    }
  };

  return (
    <div className="auth__wrapper">
      <div className="auth__top">
        <h2>IDENTIFICATION</h2>
        <div className="auth__cancel-icons">
          <ImCancelCircle onClick={() => setRegisterVisible(false)} />
        </div>
      </div>
      <div className="auth__form-wrapper">
        <h4>Register</h4>
        <form className="auth__form">
          <div>
            <label htmlFor="firstName">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              name="fulltName"
            />
            <div className="auth__form-validation_error">{fullNameError && fullNameError}</div>
          </div>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input
              placeholder="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              type="text"
              name="avatar"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
            />
            <div className="auth__form-validation_error">{emailError && emailError}</div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
            <div className="auth__form-validation_error">{passwordError && passwordError}</div>
          </div>
          <button type="submit" className="signBtn" onClick={(e) => signUp(e)}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="auth__bottom" style={{ display: 'flex', alignItems: 'center' }}>
        <h4>I HAVE AN ACCOUNT!</h4>
        <button className="createAccount" onClick={(e) => haveAccountClick(e)}>
          Sign In
        </button>
      </div>
    </div>
  );
};
