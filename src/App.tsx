import { Route, Routes } from 'react-router-dom';
import MainPage from './Layouts/MainPage/MainPage';
import './App.scss';
import Products from './Layouts/ProductsPage/Products';
import Cart from './Layouts/CartPage/cart';
import Catalog from './components/Catalog/Catalog';
import CatalogItem from './components/Catalog/CatalogItem/CatalogItem';

// export const App: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainPage/>}/>
//       <Route path='/m'
//     </Routes>
//   )
// }

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/" element={<Products />}>
        <Route path=":jacket" element={<Catalog />} />
        <Route path=":accessories" element={<Catalog />} />
        <Route path="/:section/:id" element={<CatalogItem />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      {/* <Route path="/man" element={<Products />} />
      <Route path="/woman" element={<Products />} />
      <Route path="/children" element={<Products />} />
  */}
    </Routes>
  );
};
