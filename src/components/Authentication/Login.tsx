import './auth.scss';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { AuthVisible } from '../../@types/types';
import { authApi } from '../../redux/auth/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';

interface LoginProps {
  setAuthVisible: (value: AuthVisible | ((prevVar: AuthVisible) => AuthVisible)) => void;
}

export const Login: React.FC<LoginProps> = ({ setAuthVisible }) => {
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
          <ImCancelCircle onClick={() => setAuthVisible(AuthVisible.disabled)} />
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
        <button onClick={() => setAuthVisible(AuthVisible.register)} className="createAccount">
          Create My Account
        </button>
      </div>
    </div>
  );
};
