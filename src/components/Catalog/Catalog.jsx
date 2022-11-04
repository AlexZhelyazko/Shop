import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCatalogItems } from '../../redux/catalog/asyncActions';
import { useAppDispatch } from '../../redux/store';
import { clearFilters } from '../../redux/catalog/slice';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';
import './catalog.scss';

const Catalog = () => {
  const [notFoundItems, setNotFoundItems] = useState(false);
  const dispatch = useAppDispatch();
  const items = useSelector((state) => state.catalog.items);
  const filterItems = useSelector((state) => state.catalog.filterItem);
  const location = useLocation();

  const func = (val) => {
    setNotFoundItems(val);
  };

  useEffect(() => {
    dispatch(fetchCatalogItems(location));
    return () => {
      dispatch(clearFilters());
    };
  }, [location]);

  return (
    <div className="catalog__wrapper">
      <Sidebar func={func} setNotFoundItems={setNotFoundItems} location={location} items={items} />
      <Section notFoundItems={notFoundItems} items={items} filterItems={filterItems} />
    </div>
  );
};

export default Catalog;
