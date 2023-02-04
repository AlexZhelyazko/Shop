import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { authApi } from '../../redux/auth/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';

interface LoginProps {
  setLoginVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setRegisterVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Login: React.FC<LoginProps> = ({ setLoginVisible, setRegisterVisible }) => {
  const { data = [], isLoading } = authApi.useGetUsersQuery('');
  const [setProducts] = authApi.useAddProductForAuthUserMutation();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(data);
  console.log(isAuth);
  console.log(currentUser);
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
      // if (cartItems.length !== 0) {
      //   await setProducts({ userId: user.id, data: [...cartItems] });
      //   dispatch(clearCart());
      // }
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
