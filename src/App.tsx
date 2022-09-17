import { Route, Routes } from 'react-router-dom';
import MainPage from './Layouts/MainPage';
import './App.scss';
import Catalog from './components/Catalog/Catalog';

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/man' element={<Catalog/>}/>
        <Route path='/woman' element={<Catalog/>}/>
        <Route path='/children' element={<Catalog/>}/>
      </Routes>
    </div>
  );
};
