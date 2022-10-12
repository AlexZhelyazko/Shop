import React from 'react';
import { useSelector } from 'react-redux';
import { deleteItemfromCart } from '../../redux/cart/cartSlice';
import { useAppDispatch } from '../../redux/store';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  return (
    <div>
      {cartItems.length === 0 ? (
        <h1>Empty</h1>
      ) : (
        cartItems.map((el) => {
          return (
            <div>
              <h2>{el.title}</h2>
              <button onClick={() => dispatch(deleteItemfromCart(el.title))}>delete</button>
            </div>
          );
        })
      )}
    </div>
  );
}
