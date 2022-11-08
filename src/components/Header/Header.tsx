import { NavLink } from 'react-router-dom';
import './header.scss';
import { AiOutlineShoppingCart } from 'react-icons/ai';

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
        <AiOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
      </NavLink>
    </header>
  );
};

export default Header;
