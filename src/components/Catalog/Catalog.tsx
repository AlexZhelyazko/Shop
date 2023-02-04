import './catalog.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCatalogItems } from '../../redux/catalog/asyncActions';
import { RootState, useAppDispatch } from '../../redux/store';
import { clearFilters } from '../../redux/catalog/catalogSlice';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';
import { IProduct } from '../../@types/types';

const Catalog = () => {
  const dispatch = useAppDispatch();

  const items: IProduct[] = useSelector((state: RootState) => state.catalog.items);
  const filterItems = useSelector((state: RootState) => state.catalog.filterItem);

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCatalogItems());
    return () => {
      dispatch(clearFilters());
    };
  }, [location]);

  return (
    <div className="catalog__wrapper">
      <Sidebar location={location.pathname} items={items} />
      <Section items={items} filterItems={filterItems} />
    </div>
  );
};

export default Catalog;
