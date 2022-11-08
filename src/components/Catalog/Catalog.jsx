import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCatalogItems } from '../../redux/catalog/asyncActions';
import { useAppDispatch } from '../../redux/store';
import { clearFilters } from '../../redux/catalog/slice';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';
import './catalog.scss';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state) => state.catalog.items);
  const filterItems = useSelector((state) => state.catalog.filterItem);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchCatalogItems(params));
    return () => {
      dispatch(clearFilters());
    };
  }, [location]);

  return (
    <div className="catalog__wrapper">
      <Sidebar location={location} items={items} />
      <Section items={items} filterItems={filterItems} />
    </div>
  );
};

export default Catalog;
