import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCatalogItems } from '../../redux/catalog/asyncActions';
import { RootState, useAppDispatch } from '../../redux/store';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';
import './catalog.scss';

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.catalog.items);
  const filterItems = useSelector((state: RootState) => state.catalog.filterItem);
  useEffect(() => {
    dispatch(fetchCatalogItems());
  }, []);

  return (
    <div className="catalog__wrapper">
      <Sidebar items={items} />
      <Section items={items} filterItems={filterItems} />
    </div>
  );
};

export default Catalog;
