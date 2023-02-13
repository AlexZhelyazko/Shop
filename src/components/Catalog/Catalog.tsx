import './catalog.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCatalogItems } from '../../redux/catalog/asyncActions';
import { clearFilters } from '../../redux/catalog/catalogSlice';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';

const Catalog = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.catalog.items);

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
      <Section items={items} />
    </div>
  );
};

export default Catalog;
