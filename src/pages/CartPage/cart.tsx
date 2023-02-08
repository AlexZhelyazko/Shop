import './cart.scss';
import { useState, useEffect } from 'react';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';
import PaymentForm from '../../components/Payment/PaymentForm';
import { Modal } from '../../components/ModalWindow/Modal';
import { queryApi } from '../../redux/query';
import { Success } from '../../Icons/Success/Success';
import { Error } from '../../Icons/Error/Error';
import { useAppSelector } from '../../hooks/hook';
import { getCurrentUser } from '../../redux/selectors';
import { Spinner } from '../../components/Preloader/Spinner/Spinner';

//TODO first render
export default function Cart() {
  const [totalPrice, setTotalPrice] = useState<null | number>(null);
  const [count, setCount] = useState(0);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [updateCart, {}] = queryApi.useAddProductForAuthUserMutation();
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, refetch } = queryApi.useGetUserQuery(currentUser.id);
  console.log(data);
  // let basketItems = data[0].basket.item || ' ';
  useEffect(() => {
    if (data !== undefined) {
      data[0].basket.item.length === 0
        ? setTotalPrice(0)
        : setTotalPrice(
            data[0].basket.item.reduce(
              (acc: any, num: any) =>
                acc + +num.price.slice(1, -2).replace(/[\s.,%]/g, '') * num.count,
              0,
            ),
          );
    }
  });

  console.log(count);

  const onAddItemClick = async (params: any[]) => {
    let id = params[0];
    let price = params[1];
    let findItem = { ...data[0].basket.item.find((obj: any) => obj.id === id) };
    findItem.count++;
    const newList = data[0].basket.item.map((o: any) => {
      if (o.id === findItem.id) {
        return findItem;
      }
      return o;
    });
    await updateCart({ userId: currentUser.id, data: newList });
  };

  const onMinusItemClick = async (params: any[]) => {
    let id = params[0];
    let price = params[1];
    let newList = null;
    let findItem = { ...data[0].basket.item.find((obj: any) => obj.id === id) };
    if (findItem.count === 1) {
      const index = data[0].basket.item.findIndex((n: any) => n.id === id);
      if (index !== -1) {
        newList = [...data[0].basket.item];
        newList.splice(index, 1);
      }
    } else {
      findItem.count--;
      newList = data[0].basket.item.map((o: any) => {
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
    const index = data[0].basket.item.findIndex((n: any) => n.id === id);
    if (index !== -1) {
      newList = [...data[0].basket.item];
      newList.splice(index, 1);
    }
    await updateCart({ userId: currentUser.id, data: newList });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data[0]?.basket.item.length === 0 || data[0]?.basket.item === undefined) {
    return <EmptyCart />;
  }
  return (
    <>
      <div className="cart__container">
        <h1 style={{ fontFamily: 'initial', fontWeight: 'bold', fontSize: '35px' }}>YOUR CART</h1>
        <div className="cart__items-wrapper">
          {data[0]?.basket.item.map((el: any, index: any) => {
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
          <PaymentForm
            count={count}
            setCount={setCount}
            setVisible={setPaymentVisible}
            userData={data[0]}
          />
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
