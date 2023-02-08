import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Products from './pages/ProductsPage/Products';
import Cart from './pages/CartPage/cart';
import Catalog from './components/Catalog/Catalog';
import SingleProduct from './pages/SingleProductPage/SingleProduct';
import { History } from './pages/History/History';
import { Privat } from './hoc/Privat';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />}>
        <Route path="" element={<MainPage />} />
        <Route path="shop" element={<Catalog />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/cart"
          element={
            <Privat>
              <Cart />
            </Privat>
          }
        />
      </Route>
    </Routes>
  );
};
