import "./cart.scss";
import { useState, useEffect } from "react";
import { EmptyCart } from "../../components/EmptyCart/EmptyCart";
import PaymentForm from "../../components/Payment/PaymentForm";
import { Modal } from "../../components/ModalWindow/Modal";
import { queryApi } from "../../redux/query";
import { useAppSelector } from "../../hooks/hook";
import { getCurrentUser } from "../../redux/selectors";
import { Spinner } from "../../components/Preloader/Spinner/Spinner";

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState<null | number>(null);
  const [count, setCount] = useState(0);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [updateCart, {}] = queryApi.useAddProductForAuthUserMutation();
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, isError, refetch } = queryApi.useGetUserQuery(
    currentUser.id
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      data.basket.item.length === 0
        ? setTotalPrice(0)
        : setTotalPrice(
            data.basket.item.reduce(
              (acc: any, num: any) =>
                acc +
                +num.price.slice(1, -2).replace(/[\s.,%]/g, "") * num.count,
              0
            )
          );
    }
  });

  const onAddItemClick = async (params: any[]) => {
    if (data) {
      let id = params[0];
      let price = params[1];
      let findItem = { ...data.basket.item.find((obj: any) => obj.id === id) };
      findItem.count++;
      const newList = data.basket.item.map((o: any) => {
        if (o.id === findItem.id) {
          return findItem;
        }
        return o;
      });
      await updateCart({ userId: currentUser.id, data: newList });
      refetch();
    }
  };

  const onMinusItemClick = async (params: any[]) => {
    if (data) {
      let id = params[0];
      let price = params[1];
      let newList = null;
      let findItem = { ...data.basket.item.find((obj: any) => obj.id === id) };
      if (findItem.count === 1) {
        const index = data.basket.item.findIndex((n: any) => n.id === id);
        if (index !== -1) {
          newList = [...data.basket.item];
          newList.splice(index, 1);
        }
      } else {
        findItem.count--;
        newList = data.basket.item.map((o: any) => {
          if (o.id === findItem.id) {
            return findItem;
          }
          return o;
        });
      }
      await updateCart({ userId: currentUser.id, data: newList });
      refetch();
    }
  };

  const onDeleteItemClick = async (params: any[]) => {
    if (data) {
      let id = params[0];
      let price = params[1];
      let count = params[2];
      let newList = null;
      const index = data.basket.item.findIndex((n: any) => n.id === id);
      if (index !== -1) {
        newList = [...data.basket.item];
        newList.splice(index, 1);
      }
      await updateCart({ userId: currentUser.id, data: newList });
      refetch();
    }
  };

  if (isError) {
    return <>Error</>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (data?.basket.item.length === 0 || data?.basket.item === undefined) {
    return <EmptyCart />;
  }
  return (
    <>
      <div className="cart__container">
        <h1
          style={{
            fontFamily: "initial",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          YOUR CART
        </h1>
        <div className="cart__items-wrapper">
          {data?.basket.item.map((el: any, index: any) => {
            return (
              <div key={el.title + index} className="cart__item">
                <img src={el.img} alt="" />
                <div className="cart__item-info">
                  <h2 className="cart__item-title">{el.title}</h2>
                  <div>
                    <div style={{ letterSpacing: "0.5px" }}>
                      Price: {el.price}
                    </div>
                    <div className="cart__item-info_size-color">
                      {el.size ? <span>{el.size}</span> : ""}
                      <span> | </span>
                      {el.color ? <span>{el.color}</span> : ""}
                    </div>
                  </div>
                  <div className="cart__item-buttons">
                    <div>
                      <button
                        className="countBtn"
                        onClick={() => onMinusItemClick([el.id, el.price])}
                      >
                        -
                      </button>
                      <span>{el.count}</span>
                      <button
                        className="countBtn"
                        onClick={() => onAddItemClick([el.id, el.price])}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="deleteBtn"
                      onClick={() =>
                        onDeleteItemClick([el.id, el.price, el.count])
                      }
                    >
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
          setVisible={setPaymentVisible}
        >
          <PaymentForm
            count={count}
            setCount={setCount}
            setVisible={setPaymentVisible}
            userData={data}
            totalPrice={totalPrice}
          />
        </Modal>
      ) : (
        ""
      )}
      <div className="cart__footer">
        Total: ${totalPrice}
        <button
          className="cart__footer-btn"
          onClick={() => setPaymentVisible(true)}
        >
          Continue
        </button>
      </div>
    </>
  );
}
