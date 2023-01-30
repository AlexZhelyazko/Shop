import React, { useState } from 'react';

interface PaymentFormProps {}

const PaymentForm: React.FC<PaymentFormProps> = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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
    // perform payment
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cvc">CVC:</label>
        <input type="text" id="cvc" value={cvc} onChange={(e) => setCvc(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
