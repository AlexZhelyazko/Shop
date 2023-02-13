import './payment.scss';
import React, { useState } from 'react';
import { IUser } from '../../@types/types';
import { queryApi } from '../../redux/query';

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
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [addItemsToHistory, { isLoading, isError }] = queryApi.useConfirmDiliveryBasketMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiryDate || !cvc || !name) {
      setError('All fields are required');
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Invalid card number');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError('Invalid expiry date');
      return;
    }
    if (!/^\d{3}$/.test(cvc)) {
      setError('Invalid CVC');
      return;
    }
    let date = new Date().toUTCString();
    let userHistory = JSON.parse(JSON.stringify(userData?.history));
    userHistory[date] = { ...userData?.basket, totalPrice };
    await addItemsToHistory({
      userId: userData?.id,
      item: [],
      history: userHistory,
    }).unwrap();
    setVisible(false);
    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label className="payment__label" htmlFor="cardNumber">
          Card Number:
        </label>
        <input
          className="payment__input"
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
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
          onChange={(e) => setExpiryDate(e.target.value)}
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
      <button className="payment__btn" onClick={(e) => handleSubmit(e)} type="submit">
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
