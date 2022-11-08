import { NavLink } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header__wrapper">
      <div>About</div>
      <NavLink to="/jacket">Jackets</NavLink>
      <NavLink to="/accessories">Accessories</NavLink>
      <div>FORM</div>
      <div>Register</div>
      <NavLink to="/cart">Cart</NavLink>
    </header>
  );
};

export default Header;
