import React from 'react';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div>
      {cartItems.map((el) => {
        return <h2>{el.title}</h2>;
      })}
    </div>
  );
}
