import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Products from './pages/ProductsPage/Products';
import Cart from './pages/CartPage/cart';
import Catalog from './components/Catalog/Catalog';
import SingleProduct from './pages/SingleProductPage/SingleProduct';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/" element={<Products />}>
        <Route path="shop" element={<Catalog />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};
