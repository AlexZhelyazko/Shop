import './footer.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineHome, AiOutlineShop } from 'react-icons/ai';

const Footer = () => {
  return (
    <header className="header__wrapper">
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/about">
        <AiOutlineHome style={{ width: '25px', height: '25px' }} />
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/shop">
        <AiOutlineShop style={{ width: '25px', height: '25px' }} />
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to="/cart">
        <AiOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
      </NavLink>
    </header>
  );
};

export default Footer;
