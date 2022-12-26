import { useSelector } from 'react-redux';
import { deleteItemfromCart, addItem, minusItem } from '../../redux/cart/cartSlice';
import { useAppDispatch } from '../../redux/store';
import './cart.scss';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const dispatch = useAppDispatch();
  return (
    <div className="cart__container">
      {cartItems.length === 0 ? (
        <h1>Empty</h1>
      ) : (
        cartItems.map((el) => {
          return (
            <div className="cart__item">
              <h1>Your Cart</h1>
              <img src={el.img} alt="" srcset="" />
              <h2>{el.title}</h2>
              <h2>Size: {el.selectValue}</h2>
              <h2>Count: {el.count}</h2>
              <button onClick={() => dispatch(deleteItemfromCart(el.title))}>delete</button>
              <button onClick={() => dispatch(addItem(el.title))}>add</button>
              <button onClick={() => dispatch(minusItem(el.title))}>minus</button>
            </div>
          );
        })
      )}
    </div>
  );
}
