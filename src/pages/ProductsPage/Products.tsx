import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Login/Login';
import { Modal } from '../../components/ModalWindow/Modal';

const Products: React.FC = () => {
  const [loginVisibility, setLoginVisibility] = useState(false);

  return (
    <div className="container">
      <Header loginVisibility={loginVisibility} setLoginVisibility={setLoginVisibility} />
      {loginVisibility ? (
        <Modal loginVisibility={loginVisibility}>
          <Login />
        </Modal>
      ) : (
        ''
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
