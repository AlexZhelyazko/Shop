import '../../App.scss';
import { useState, Suspense } from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Login } from '../../components/Authentication/Login';
import { Modal } from '../../components/ModalWindow/Modal';
import { Register } from '../../components/Authentication/Register';
import { Spinner } from '../../components/Preloader/Spinner/Spinner';

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
      <Suspense fallback={<Spinner />}>
        <div style={{ height: '90%' }}>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default Products;
