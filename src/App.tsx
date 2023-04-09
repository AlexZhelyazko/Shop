import './App.scss';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from './pages/Outlet/Outlet';
import { Privat, PrivatAdmin, PrivatUser } from './hoc/Privat';
import { Users } from './components/Users/Users';

const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyCatalog = lazy(() => import('./pages/Catalog/Catalog'));
const LazySingleProduct = lazy(() => import('./pages/SingleProductPage/SingleProduct'));
const LazyHistory = lazy(() => import('./pages/History/History'));
const LazyCart = lazy(() => import('./pages/CartPage/Cart'));
const LazyOrders = lazy(() => import('./pages/Orders/Orders'));

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />}>
        <Route path="" element={<LazyMainPage />} />
        <Route path="shop" element={<LazyCatalog />} />
        <Route path="/shop/:id" element={<LazySingleProduct />} />
        <Route
          path="history"
          element={
            <PrivatUser>
              <LazyHistory />
            </PrivatUser>
          }
        />
        <Route
          path="cart"
          element={
            <Privat>
              <LazyCart />
            </Privat>
          }
        />
        <Route
          path="users"
          element={
            <PrivatAdmin>
              <Users />
            </PrivatAdmin>
          }
        />
        <Route
          path="orders"
          element={
            <PrivatAdmin>
              <LazyOrders />
            </PrivatAdmin>
          }
        />
      </Route>
    </Routes>
  );
};
