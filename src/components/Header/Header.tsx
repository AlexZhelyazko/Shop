import './header.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';

const Header: React.FC = () => {
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
      <BiLogIn style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
    </header>
  );
};

export default Header;
