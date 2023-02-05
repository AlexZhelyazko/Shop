import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import PhoneInput from 'react-phone-number-input';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';
import { queryApi } from '../../redux/query';

interface RegisterProps {
  setRegisterVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setLoginVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Register: React.FC<RegisterProps> = ({ setRegisterVisible, setLoginVisible }) => {
  const { data = [], isLoading } = queryApi.useGetUsersQuery('');

  const [value, setValue] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addUser, {}] = queryApi.useAddUserMutation();
  const dispatch = useDispatch();
  const haveAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegisterVisible(false);
    setLoginVisible(true);
  };
  const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setIsAuth(true));
    await addUser({
      email: email,
      password: password,
      name: firstName + lastName,
      role: 'user',
      avatar: 'default',
    });
    // dispatch(setCurrentUser(firstName));
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
        <form className="auth__form" action="">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="firstName"
              id=""
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="lastName"
              id=""
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id=""
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id=""
            />
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
          <button className="signBtn" onClick={(e) => signUp(e)}>
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
