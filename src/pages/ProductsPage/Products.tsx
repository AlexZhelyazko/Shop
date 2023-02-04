import '../../App.scss';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Authentication/Login';
import { Modal } from '../../components/ModalWindow/Modal';
import { Register } from '../../components/Authentication/Register';

const Products: React.FC = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  return (
    <div className="container">
      <Header setLoginVisible={setLoginVisible} />
      {!loginVisible && !registerVisible ? (
        ''
      ) : loginVisible && !registerVisible ? (
        <Modal
          width="25%"
          height="100%"
          justifyContent="flex-end"
          alignItems="flex-start"
          visible={loginVisible}
          setVisible={setLoginVisible}>
          <Login setRegisterVisible={setRegisterVisible} setLoginVisible={setLoginVisible} />
        </Modal>
      ) : (
        <Modal
          width="25%"
          height="100%"
          justifyContent="flex-end"
          alignItems="flex-start"
          visible={registerVisible}
          setVisible={setRegisterVisible}>
          <Register setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />
        </Modal>
      )}
      {/* {loginVisible && !registerVisible ? (
        <Modal visible={loginVisible} setVisible={setLoginVisible}>
          <Login setRegisterVisible={setRegisterVisible} setLoginVisible={setLoginVisible} />
        </Modal>
      ) : (
        <Modal visible={registerVisible} setVisible={setRegisterVisible}>
          <Register setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />
        </Modal>
      )} */}
      {/* {authVisible !== AuthVisible.disabled ? (
        <Modal authenticationVisible={authVisible} setVisible={setAuthVisible}>
          {authVisible === AuthVisible.register ? (
            <Register setAuthVisible={setAuthVisible} />
          ) : (
            <Login setAuthVisible={setAuthVisible} />
          )}
        </Modal>
      ) : (
        ''
      )} */}
      <div style={{ height: '90%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
