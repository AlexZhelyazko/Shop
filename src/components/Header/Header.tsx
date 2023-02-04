import './header.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { HeaderUser } from '../HeaderUserBlock/HeaderUser';

interface HeaderProps {
  setLoginVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Header: React.FC<HeaderProps> = ({ setLoginVisible }) => {
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
      {isAuth ? (
        <>
          <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/cart">
            <AiOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
          </NavLink>
          <HeaderUser />
        </>
      ) : (
        <BiLogIn
          onClick={() => setLoginVisible(true)}
          style={{ width: '25px', height: '25px', cursor: 'pointer' }}
        />
      )}
    </header>
  );
};

export default Header;
