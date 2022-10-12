import { NavLink } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header__wrapper">
      <div>About</div>
      <NavLink to="/man">Man</NavLink>
      <NavLink to="/woman">Woman</NavLink>
      <NavLink to="/children">Children</NavLink>
      <div>FORM</div>
      <div>Register</div>
      <NavLink to="/cart">Cart</NavLink>
    </header>
  );
};

export default Header;
