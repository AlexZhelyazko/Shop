import './App.scss';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from './pages/ProductsPage/Products';
import { Privat } from './hoc/Privat';

const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyCatalog = lazy(() => import('./components/Catalog/Catalog'));
const LazySingleProduct = lazy(() => import('./pages/SingleProductPage/SingleProduct'));
const LazyHistory = lazy(() => import('./pages/History/History'));
const LazyCart = lazy(() => import('./pages/CartPage/Cart'));

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />}>
        <Route path="" element={<LazyMainPage />} />
        <Route path="shop" element={<LazyCatalog />} />
        <Route path="/shop/:id" element={<LazySingleProduct />} />
        <Route path="history" element={<LazyHistory />} />
        <Route
          path="cart"
          element={
            <Privat>
              <LazyCart />
            </Privat>
          }
        />
      </Route>
    </Routes>
  );
};
