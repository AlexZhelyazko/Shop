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
        height="300px"
        justifyContent="center"
        alignItems="center"
      >
        Modal
      </Modal>
    </div>
  );
};

// {
//   "id": "1647872872",
//   "category": "jacket",
//   "frontImageUrl": "https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_B_720x.jpg?v=1647872872",
//   "backImageUrl": "https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_A_720x.jpg?v=1647872872",
//   "title": "THIS IS NOT VAN GOGH DECONSTRUCTED DENIM JACKET",
//   "price": "$2600",
//   "color": "blue",
//   "description": "Every piece is hand-selected and re-imagined through various techniques to provide garments that are unique. All garments are up-cycled: signs of wear and imperfections will vary. If the size is not available, please contact us to arrange for a custom commissioned piece. Each piece is made to order, by hand. ",
//   "size": [
//     "M",
//     "S",
//     "L",
//     "XL"
//   ]
// },

export default Catalog;
