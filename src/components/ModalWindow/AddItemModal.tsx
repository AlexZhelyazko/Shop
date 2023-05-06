import React from "react";

const AddItemModal = () => {
  return (
    <div>
      <label htmlFor="First Image">Front Image</label>
      <input
        id="First Image"
        name="First Image"
        type="text"
        placeholder="First Image"
        defaultValue="https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_B_720x.jpg?v=1647872872"
      />
      <label htmlFor="First Image">Back Image</label>
      <input
        id="Back Image"
        name="Back Image"
        type="text"
        placeholder="Back Image"
        defaultValue="https://cdn.shopify.com/s/files/1/0053/7994/8647/products/CDIOR_JKT_2_A_720x.jpg?v=1647872872"
      />
      <input id="Title" name="Title" type="text" placeholder="Title" />
      <input id="Price" name="Price" type="text" placeholder="Price" />
      <input id="Color" name="Color" type="text" placeholder="Title" />
      <input
        id="Description"
        name="Description"
        type="text"
        placeholder="Title"
      />
      <div>
        <input type="checkbox" name="S" id="S" />
        <span>S</span>
        <input type="checkbox" name="M" id="M" />
        <span>M</span>
        <input type="checkbox" name="L" id="L" />
        <span>L</span>
        <input type="checkbox" name="XL" id="XL" />
        <span>XL</span>
        <input type="checkbox" name="XLL" id="XLL" />
        <span>XLL</span>
      </div>
    </div>
  );
};

export default AddItemModal;

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
