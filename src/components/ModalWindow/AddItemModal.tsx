import React, { useState } from "react";
import { queryApi } from "../../redux/query";
import { nanoid } from "@reduxjs/toolkit";
import "./modal.scss";
import { useAppDispatch } from "../../hooks/hook";
import { fetchCatalogItems } from "../../redux/catalog/asyncActions";

interface IAddItemModal {
  setShowAddItemModal: (value: boolean) => void;
}

const AddItemModal: React.FC<IAddItemModal> = ({ setShowAddItemModal }) => {
  const dispatch = useAppDispatch();
  const [frontImage, setFrontImage] = useState(
    "https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_B_720x.jpg?v=1647872872"
  );
  const [backImage, setBackImage] = useState(
    "https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_A_720x.jpg?v=1647872872"
  );
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  const [addItem, {}] = queryApi.useAddNewItemInSectionMutation();

  const handleAddItem = async (e: any) => {
    e.preventDefault();
    let newItem = {
      id: nanoid(),
      category,
      frontImageUrl: frontImage,
      backImageUrl: backImage,
      title,
      price,
      color,
      description,
      size: sizes,
    };
    await addItem(newItem);
    dispatch(fetchCatalogItems());
    setShowAddItemModal(false);
  };

  const handleSizeChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setSizes([...sizes, value]);
    } else {
      const newSizes = sizes.filter((e) => e !== value);
      setSizes(newSizes);
    }
  };

  return (
    <div className="addItem-modal">
      <div>
        <label htmlFor="First Image">Front Image</label>
        <br />
        <input
          onChange={(e) => setFrontImage(e.target.value)}
          id="First Image"
          name="First Image"
          type="text"
          placeholder="First Image"
          defaultValue="https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_B_720x.jpg?v=1647872872"
        />
      </div>

      <div>
        <label htmlFor="Back Image">Back Image</label>
        <br />
        <input
          onChange={(e) => setBackImage(e.target.value)}
          id="Back Image"
          name="Back Image"
          type="text"
          placeholder="Back Image"
          defaultValue="https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_A_720x.jpg?v=1647872872"
        />
      </div>

      <input
        onChange={(e) => setCategory(e.target.value)}
        id="Category"
        name="Category"
        type="text"
        placeholder="Category"
      />

      <input
        onChange={(e) => setTitle(e.target.value)}
        id="Title"
        name="Title"
        type="text"
        placeholder="Title"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        id="Price"
        name="Price"
        type="text"
        placeholder="Price"
      />
      <input
        onChange={(e) => setColor(e.target.value)}
        id="Color"
        name="Color"
        type="text"
        placeholder="Color"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        id="Description"
        name="Description"
        type="text"
        placeholder="Description"
      />
      <div className="checkbox-wrapper">
        <div>Available Sizes:</div>
        <input
          onChange={handleSizeChange}
          value="S"
          type="checkbox"
          name="S"
          id="S"
        />
        <span>S</span>
        <input
          onChange={handleSizeChange}
          value="M"
          type="checkbox"
          name="M"
          id="M"
        />
        <span>M</span>
        <input
          onChange={handleSizeChange}
          value="L"
          type="checkbox"
          name="L"
          id="L"
        />
        <span>L</span>
        <input
          onChange={handleSizeChange}
          value="XL"
          type="checkbox"
          name="XL"
          id="XL"
        />
        <span>XL</span>
        <input
          onChange={handleSizeChange}
          value="XLL"
          type="checkbox"
          name="XLL"
          id="XLL"
        />
        <span>XLL</span>
      </div>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddItemModal;
