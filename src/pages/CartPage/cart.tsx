import './cart.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteItemfromCart, addItem, minusItem } from '../../redux/cart/cartSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';
import { ModalForPayment } from '../../components/ModalWindow/ModalForPayment';
import PaymentForm from '../../components/Payment/PaymentForm';
import { Success } from '../../Icons/Success/Success';
import { Error } from '../../Icons/Error/Error';

export default function Cart() {
  const [paymentVisible, setPaymentVisible] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useAppDispatch();

  const onAddItemClick = (params: any[]) => {
    let id = params[0];
    let price = params[1];
    dispatch(addItem({ id, price }));
  };

  const onMinusItemClick = (params: any[]) => {
    let id = params[0];
    let price = params[1];
    dispatch(minusItem({ id, price }));
  };

  const onDeleteItemClick = (params: any[]) => {
    let id = params[0];
    let price = params[1];
    let count = params[2];
    price = +price.slice(1, -2).replace(/[\s.,%]/g, '') * count;
    dispatch(deleteItemfromCart({ id, price }));
  };

  if (cartItems.length === 0) {
    return <Error />;
  }
  return (
    <>
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
                    <div style={{ letterSpacing: '0.5px' }}>Price: {el.price}</div>
                    <div className="cart__item-info_size-color">
                      {el.size ? <span>{el.size}</span> : ''}
                      <span> | </span>
                      {el.color ? <span>{el.color}</span> : ''}
                    </div>
                  </div>
                  <div className="cart__item-buttons">
                    <div>
                      <button
                        className="countBtn"
                        onClick={() => onMinusItemClick([el.id, el.price])}>
                        -
                      </button>
                      <span>{el.count}</span>
                      <button
                        className="countBtn"
                        onClick={() => onAddItemClick([el.id, el.price])}>
                        +
                      </button>
                    </div>
                    <button
                      className="deleteBtn"
                      onClick={() => onDeleteItemClick([el.id, el.price, el.count])}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {paymentVisible ? (
        <ModalForPayment visible={paymentVisible} setVisible={setPaymentVisible}>
          <PaymentForm />
        </ModalForPayment>
      ) : (
        ''
      )}
      <div className="cart__footer">
        Total: ${totalPrice}
        <button onClick={() => setPaymentVisible(true)}>Continue</button>
      </div>
    </>
  );
}
