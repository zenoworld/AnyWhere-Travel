import React, { useState } from "react";
import './Step3Payment.css';

function Step3Payment({ next, prev,formData, setFormData }) {
  const [form, setForm] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      cardname:form.nameOnCard,
      cardNumber:form.cardNumber,
      cardExpiry:form.expiry,
      cardCVC:form.cvv,
    })

    console.log(formData);
    
    next();
  };

  return (
    <div className="step-container">
      <h4>Payment</h4>

      <form onSubmit={handleNext} className="form-payment">

        <label htmlFor="nameOnCard">Name On Card</label>
        <input
          id="nameOnCard"
          name="nameOnCard"
          type="text"
          placeholder="Mr. Alexa"
          value={form.nameOnCard}
          onChange={handleChange}
          required
        />

        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={form.cardNumber}
          onChange={handleChange}
          required
          maxLength="19"
        />

        <div className="payment-row">
          <div className="payment-col">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              id="expiry"
              name="expiry"
              type="text"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              required
              maxLength="5"
            />
          </div>

          <div className="payment-col">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="password"
              placeholder="123"
              value={form.cvv}
              onChange={handleChange}
              required
              maxLength="3"
            />
          </div>
        </div>

        <div className="consent-checkbox">
          <input type="checkbox" id="checkBox" required/>
          <p>
            I agree to all the <b className="consent_margin">Terms</b> and <b className="consent_margin"> Privacy policy</b>
          </p>
        </div>


        <div className="form-nav-buttons">
          <button type="button" className="btn-secondary" onClick={prev}>Back</button>
          <button type="submit" className="btn-primary">Payment Now</button>
        </div>
      </form>
    </div>
  );
}

export default Step3Payment;
