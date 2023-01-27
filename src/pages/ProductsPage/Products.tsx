import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Login/Login';
import { display } from '@mui/system';

const Products: React.FC = () => {
  const [loginVisibility, setLoginVisibility] = useState(true);

  return (
    <div className="container">
      <Header />
      <Login loginVisibility={loginVisibility} />
      <div style={{ opacity: '0.5' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
