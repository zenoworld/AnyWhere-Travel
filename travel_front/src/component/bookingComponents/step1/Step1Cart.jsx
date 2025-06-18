import React from "react";
import './Step1Cart.css';

function Step1Cart({ next, data }) {
  return (
    <div className="step-container">
      <h4 className="">Tour Cart</h4>
      <p>Review your selected tour and confirm your order details below.</p>

      <div className="cart-item">
        <img
          src={data.photo}
          className="cart-image"
        />
        <div className="cart-details">
          <h3>{data.title}</h3>
          {/* <p>Duration: 3 days, 2 nights</p> */}
          <p>Price per person: $ {data.pricePerDay}</p>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={next}>
        Next - Your Details
      </button>
    </div>
  );
}

export default Step1Cart;
