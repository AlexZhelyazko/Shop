import "./catalog.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchCatalogItems } from "../../redux/catalog/asyncActions";
import { clearFilters } from "../../redux/catalog/catalogSlice";
import Section from "./Section/Section";
import Sidebar from "./Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getCurrentUser } from "../../redux/selectors";
import { Modal } from "../../components/ModalWindow/Modal";
import AddItemModal from "../../components/ModalWindow/AddItemModal";

const Catalog = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);
  const items = useAppSelector((state) => state.catalog.items);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const location = useLocation();

  const onAddItemClick = () => {
    setShowAddItemModal(true);
  };

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
        <div onClick={onAddItemClick} className="catalog__add-btn">
          Add New Item
        </div>
      )}
      <Modal
        visible={showAddItemModal}
        setVisible={setShowAddItemModal}
        width="300px"
        height="435px"
        justifyContent="center"
        alignItems="center"
      >
        <AddItemModal setShowAddItemModal={setShowAddItemModal} />
      </Modal>
    </div>
  );
};

export default Catalog;
