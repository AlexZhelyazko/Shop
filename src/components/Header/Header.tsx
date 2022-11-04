import { NavLink } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header__wrapper">
      <div>About</div>
      <NavLink to="/man">Jackets</NavLink>
      <NavLink to="/woman">Accessories</NavLink>
      <div>FORM</div>
      <div>Register</div>
      <NavLink to="/cart">Cart</NavLink>
    </header>
  );
};

export default Header;
