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
      <div className="cart__items-wrapper">
        {cartItems.map((el, index) => {
          return (
            <div key={el.title + index} className="cart__item">
              <img src={el.img} alt="" />
              <div className="cart__item-info">
                <h2 className="cart__item-title">{el.title}</h2>
                <div>
                  <div>Price:{el.price}</div>
                  <div className="cart__item-info_size-color">
                    <span>SIZE: {el.size} </span>
                    <span> | </span>
                    {el.color ? <span>{el.color}</span> : ''}
                  </div>
                </div>
                <div className="cart__item-buttons">
                  <div>
                    <button onClick={() => dispatch(addItem(el.title))}>add</button>
                    <button onClick={() => dispatch(minusItem(el.title))}>minus</button>
                  </div>
                  <button onClick={() => dispatch(deleteItemfromCart(el.title))}>delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart__footer">Total:</div>
    </div>
  );
}
//el.price.slice(0, -2).replace(/[\s.,%]/g, '')
