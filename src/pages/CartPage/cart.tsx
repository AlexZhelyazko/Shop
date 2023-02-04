import './cart.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteItemfromCart, addItem, minusItem, setCartItems } from '../../redux/cart/cartSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';
import PaymentForm from '../../components/Payment/PaymentForm';
import { Success } from '../../Icons/Success/Success';
import { Error } from '../../Icons/Error/Error';
import { Modal } from '../../components/ModalWindow/Modal';
import { authApi } from '../../redux/auth/asyncActions';

export default function Cart() {
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [updateCart, {}] = authApi.useAddProductForAuthUserMutation();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { data, isLoading } = authApi.useGetUserQuery(currentUser.id);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const dispatch = useAppDispatch();

  // let findItem = state.cartItems.find(obj => obj.id === action.payload.id)
  // state.totalPrice += +action.payload.price.slice(1, -2).replace(/[\s.,%]/g, '')
  // findItem!.count++
  const onAddItemClick = async (params: any[]) => {
    let id = params[0];
    let price = params[1];
    let findItem = { ...data[0].basket.find((obj: any) => obj.id === id) };
    findItem.count++;
    const newList = data[0].basket.map((o: any) => {
      if (o.id === findItem.id) {
        return findItem;
      }
      return o;
    });
    await updateCart({ userId: currentUser.id, data: newList });
  };

  // let findItem = state.cartItems.find(obj => obj.id === action.payload.id)
  //           state.totalPrice -= +action.payload.price.slice(1, -2).replace(/[\s.,%]/g, '')
  //           if (findItem!.count === 1) {
  //               state.cartItems = state.cartItems.filter((el) => el.id !== action.payload.id)
  //           } else {
  //               findItem!.count--
  //           }
  const onMinusItemClick = async (params: any[]) => {
    let id = params[0];
    let price = params[1];
    let newList = null;
    let findItem = { ...data[0].basket.find((obj: any) => obj.id === id) };
    if (findItem.count === 1) {
      const index = data[0].basket.findIndex((n: any) => n.id === id);
      if (index !== -1) {
        newList = [...data[0].basket];
        newList.splice(index, 1);
      }
    } else {
      findItem.count--;
      newList = data[0].basket.map((o: any) => {
        if (o.id === findItem.id) {
          return findItem;
        }
        return o;
      });
    }
    await updateCart({ userId: currentUser.id, data: newList });
  };

  const onDeleteItemClick = async (params: any[]) => {
    let id = params[0];
    let price = params[1];
    let count = params[2];
    let newList = null;
    const index = data[0].basket.findIndex((n: any) => n.id === id);
    if (index !== -1) {
      newList = [...data[0].basket];
      newList.splice(index, 1);
    }
    //price = +price.slice(1, -2).replace(/[\s.,%]/g, '') * count;
    await updateCart({ userId: currentUser.id, data: newList });
  };

  if (data[0]?.basket.length === 0) {
    return <EmptyCart />;
  }
  return (
    <>
      <div className="cart__container">
        <h1 style={{ fontFamily: 'initial', fontWeight: 'bold', fontSize: '35px' }}>YOUR CART</h1>
        <div className="cart__items-wrapper">
          {data[0]?.basket.map((el: any, index: any) => {
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
        <Modal
          width="50%"
          height="60%"
          justifyContent="center"
          alignItems="center"
          visible={paymentVisible}
          setVisible={setPaymentVisible}>
          <PaymentForm />
        </Modal>
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
