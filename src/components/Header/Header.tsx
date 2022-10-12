import { NavLink } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header__wrapper">
      <div>About</div>
      <div>Man</div>
      <div>Woman</div>
      <div>Children</div>
      <div>FORM</div>
      <div>Register</div>
      <NavLink to="/cart">Cart</NavLink>
    </header>
  );
};

export default Header;
