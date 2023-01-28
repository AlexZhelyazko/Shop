import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Login/Login';

const Products: React.FC = () => {
  const [loginVisibility, setLoginVisibility] = useState(false);

  return (
    <div className="container">
      <Header loginVisibility={loginVisibility} setLoginVisibility={setLoginVisibility} />
      {loginVisibility ? <Login loginVisibility={loginVisibility} /> : ''}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
