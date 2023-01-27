import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Login/Login';

const Products: React.FC = () => {
  const [loginVisibility, setLoginVisibility] = useState(true);

  return (
    <div className="container">
      <Header loginVisibility={loginVisibility} setLoginVisibility={setLoginVisibility} />
      {loginVisibility ? <Login loginVisibility={loginVisibility} /> : ''}
      <div style={loginVisibility ? { opacity: '0.5' } : { opacity: '1' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
