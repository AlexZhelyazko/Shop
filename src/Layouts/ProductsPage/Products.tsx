import Catalog from '../../components/Catalog/Catalog';
import Header from '../../components/Header/Header';
import '../../App.scss';
import { Outlet } from 'react-router-dom';

const Products: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Products;
