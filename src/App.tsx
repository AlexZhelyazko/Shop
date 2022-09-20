import { Route, Routes } from 'react-router-dom';
import MainPage from './Layouts/MainPage/MainPage';
import './App.scss';
import Products from './Layouts/ProductsPage/Products';

export const App: React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/man' element={<Products/>}/>
        <Route path='/woman' element={<Products/>}/>
        <Route path='/children' element={<Products/>}/>
      </Routes>
  );
};
