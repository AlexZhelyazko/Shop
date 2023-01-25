import './cart.scss';
import { useSelector } from 'react-redux';
import { deleteItemfromCart, addItem, minusItem } from '../../redux/cart/cartSlice';
import { RootState, useAppDispatch } from '../../redux/store';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  if (cartItems.length === 0) {
    return <h1>Empty</h1>;
  }
  return (
    <div className="cart__container">
      <h1 style={{ fontFamily: 'initial', fontWeight: 'bold', fontSize: '35px' }}>YOUR CART</h1>
      {cartItems.map((el, index) => {
        return (
          <div key={el.title + index} className="cart__item">
            <img src={el.img} alt="" />
            <div className="cart__item-info">
              <h2>{el.title}</h2>
              <div>
                <h2>SIZE: {el.size}</h2>
                <h2>COUNT: {el.count}</h2>
              </div>
            </div>
            <button onClick={() => dispatch(deleteItemfromCart(el.title))}>delete</button>
            <button onClick={() => dispatch(addItem(el.title))}>add</button>
            <button onClick={() => dispatch(minusItem(el.title))}>minus</button>
          </div>
        );
      })}
    </div>
  );
}
