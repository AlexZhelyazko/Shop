import "./catalog.scss";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchCatalogItems } from "../../redux/catalog/asyncActions";
import { clearFilters } from "../../redux/catalog/catalogSlice";
import Section from "./Section/Section";
import Sidebar from "./Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getCurrentUser } from "../../redux/selectors";

const Catalog = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);
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
      {currentUser.role === "admin" && (
        <div className="catalog__add-btn">Add New Item</div>
      )}
    </div>
  );
};

export default Catalog;
