import "./payment.scss";
import React, { useState } from "react";
import { IUser } from "../../@types/types";
import { queryApi } from "../../redux/query";

interface PaymentFormProps {
  userData?: IUser;
  setVisible: (value: any | boolean) => void;
  count: number;
  setCount: any;
  totalPrice: number | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  count,
  setCount,
  setVisible,
  userData,
  totalPrice,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [addItemsToHistory, { isLoading, isError }] =
    queryApi.useConfirmDiliveryBasketMutation();

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let valArray = val.split(" ").join("").split("");
    let valSpace = val.split("");

    if (valSpace[valSpace.length - 1] == " ") {
      var valSpaceN = valSpace.slice(0, -2);
      val = valSpaceN.join("");
      setCardNumber(val);
      return;
    }

    if (isNaN(+valArray.join(""))) return;
    if (valArray.length === 17) return;
    if (valArray.length % 4 === 0 && valArray.length <= 15) {
      setCardNumber(e.target.value + "  ");
    } else {
      setCardNumber(e.target.value);
    }
  };

  // const handleCardDate = (e: React.FormEvent<HTMLInputElement>) => {
  //   let textTemp = e.currentTarget.value;
  //   if (textTemp[0] !== "1" && textTemp[0] !== "0") {
  //     textTemp = "";
  //   }
  //   if (textTemp.length > 5) {
  //     return;
  //   }
  //   if (textTemp.length === 2) {
  //     if (
  //       parseInt(textTemp.substring(0, 2)) > 12 ||
  //       parseInt(textTemp.substring(0, 2)) == 0
  //     ) {
  //       textTemp = textTemp[0];
  //     } else if (textTemp.length === 2) {
  //       textTemp += "/";
  //     } else {
  //       textTemp = textTemp[0];
  //     }
  //   }
  //   setExpiryDate(textTemp);
  // };

  const handleCardDate = (e: React.FormEvent<HTMLInputElement>) => {
    const expdate = e.currentTarget.value;
    const expDateFormatter =
      expdate.replace(/\//g, "").substring(0, 2) +
      (expdate.length > 2 ? "/" : "") +
      expdate.replace(/\//g, "").substring(2, 4);

    setExpiryDate(expDateFormatter);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiryDate || !cvc || !name) {
      setError("All fields are required");
      return;
    }
    // if (!/^\d{16}$/.test(cardNumber)) {
    //   setError('Invalid data');
    //   return;
    // }
    // if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    //   setError('Invalid data');
    //   return;
    // }
    if (!/^\d{3}$/.test(cvc)) {
      setError("Invalid data");
      return;
    }
    let date = new Date().toUTCString();
    let userHistory = JSON.parse(JSON.stringify(userData?.history));
    userHistory[date] = {
      ...userData?.basket,
      totalPrice,
      status: "Order Confirmed",
    };
    await addItemsToHistory({
      userId: userData!.id,
      item: [],
      history: userHistory,
    }).unwrap();
    setVisible(false);
    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label className="payment__label" htmlFor="cardNumber">
          Card Number:
        </label>
        <input
          className="payment__input"
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => handleCardNumber(e)}
        />
      </div>
      <div>
        <label className="payment__label" htmlFor="expiryDate">
          Expiry Date:
        </label>
        <input
          className="payment__input"
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => handleCardDate(e)}
        />
      </div>
      <div>
        <label className="payment__label" htmlFor="cvc">
          CVC:
        </label>
        <input
          className="payment__input"
          type="text"
          id="cvc"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
      <div>
        <label className="payment__label" htmlFor="name">
          Name:
        </label>
        <input
          className="payment__input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        className="payment__btn"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
