import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Authentication/Login';
import { Modal } from '../../components/ModalWindow/Modal';
import { Register } from '../../components/Authentication/Register';
import { AuthVisible } from '../../@types/types';

const Products: React.FC = () => {
  const [authVisible, setAuthVisible] = useState<AuthVisible>(AuthVisible.disabled);

  return (
    <div className="container">
      <Header setAuthVisible={setAuthVisible} />
      {authVisible !== AuthVisible.disabled ? (
        <Modal visible={authVisible} setVisible={setAuthVisible}>
          {authVisible === AuthVisible.register ? (
            <Register setAuthVisible={setAuthVisible} />
          ) : (
            <Login setAuthVisible={setAuthVisible} />
          )}
        </Modal>
      ) : (
        ''
      )}
      <div style={{ height: '90%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
