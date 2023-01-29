import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Authentication/Login';
import { Modal } from '../../components/ModalWindow/Modal';
import { Register } from '../../components/Authentication/Register';

const Products: React.FC = () => {
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [registerVisiility, setRegisterVisibility] = useState(false);

  return (
    <div className="container">
      <Header loginVisibility={loginVisibility} setLoginVisibility={setLoginVisibility} />
      {loginVisibility ? (
        <Modal loginVisibility={loginVisibility} setLoginVisibility={setLoginVisibility}>
          {registerVisiility ? (
            <Register
              setRegisterVisibility={setRegisterVisibility}
              setLoginVisibility={setLoginVisibility}
            />
          ) : (
            <Login
              setRegisterVisibility={setRegisterVisibility}
              setLoginVisibility={setLoginVisibility}
            />
          )}
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
