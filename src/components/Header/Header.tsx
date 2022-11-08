import { NavLink } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header__wrapper">
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/about">
        About
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/jacket">
        Jackets
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/accessories">
        Accessories
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/cart">
        Cart
      </NavLink>
    </header>
  );
};

export default Header;
