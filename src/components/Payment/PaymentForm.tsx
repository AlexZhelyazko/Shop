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
  const [cardType, setCardType] = useState("far fa-credit-card");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [addItemsToHistory, { isLoading, isError }] =
    queryApi.useConfirmDiliveryBasketMutation();

  // const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let val = e.target.value;
  //   let valArray = val.split(" ").join("").split("");
  //   let valSpace = val.split("");

  //   if (valSpace[valSpace.length - 1] == " ") {
  //     var valSpaceN = valSpace.slice(0, -2);
  //     val = valSpaceN.join("");
  //     setCardNumber(val);
  //     return;
  //   }

  //   if (isNaN(+valArray.join(""))) return;
  //   if (valArray.length === 17) return;
  //   if (valArray.length % 4 === 0 && valArray.length <= 15) {
  //     setCardNumber(e.target.value + "  ");
  //   } else {
  //     setCardNumber(e.target.value);
  //   }
  // };

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    var matches = e.currentTarget.value.match(/(\d+)/);
    var cardno = "";
    console.log(matches);
    if (matches) {
      cardno = e.currentTarget.value.split(" - ").join("");
    }
    console.log(cardno);
    var cardtype1 = cardType;
    //var visa = /^(?:4[0-9]{16}(?:[0-9]{3})?)$/;
    var visa = /^(?:4[0-9]{2}?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{3})$/;
    var amexpRegEx = /^(?:3[47][0-9]{3})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{5})$/;
    console.log(visa.test(cardno));
    if (visa.test(cardno) === true) {
      //eg:4651970022334445
      cardtype1 = "far fa fa-3x fa-cc-visa  carddetail-cardtype";
    } else if (mastercardRegEx.test(cardno) === true) {
      cardtype1 = "far fa fa-3x fa-cc-mastercard carddetail-cardtype";
    } else if (amexpRegEx.test(cardno) === true) {
      cardtype1 = "far fa fa-3x fa-cc-amex carddetail-cardtype";
    } else if (discovRegEx.test(cardno) === true) {
      cardtype1 = "far fa fa-3x fa-cc-discover carddetail-cardtype";
    }
    setCardNumber(cardno);
    setCardType(cardtype1);
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

  const cc_format = (value: any) => {
    const v = value.replace(/[^0-9]/gi, "").substr(0, 16);

    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    return parts.length > 1 ? parts.join(" - ") : value;
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
          data-mask="0000 0000 0000 0000"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          id="cardNumber"
          value={cc_format(cardNumber)}
          onChange={(e) => handleCardNumber(e)}
        />
        <i className={cardType} id="cardtype"></i>
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
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
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
