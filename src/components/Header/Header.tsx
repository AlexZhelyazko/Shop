import './header.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { AuthVisible } from '../../@types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface HeaderProps {
  setAuthVisible: (value: AuthVisible | ((prevVar: AuthVisible) => AuthVisible)) => void;
}

const Header: React.FC<HeaderProps> = ({ setAuthVisible }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const user = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <header className="header__wrapper">
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/">
        About
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/shop">
        Shop
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/cart">
        <AiOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
      </NavLink>
      {isAuth ? (
        <div className="header__user">
          <span className="header__user-name">name</span>
          <div className="header__user-avatar"></div>
        </div>
      ) : (
        <BiLogIn
          onClick={() => setAuthVisible(AuthVisible.login)}
          style={{ width: '25px', height: '25px', cursor: 'pointer' }}
        />
      )}
      {/* <div className="header__user">
        <span className="header__user-name">Name</span>
        <div className="header__user-avatar"></div>
      </div> */}
    </header>
  );
};

export default Header;
