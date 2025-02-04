import React from "react";
import "./checkout.css";
import Image from "../../assets/upbook2.jpg";
import VisaImage from "../../assets/visa.png";
import MasterCardImage from "../../assets/mastercard.png";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout-container">
      <h1 className="ckeck-heading">Checkout <span>*</span></h1>
      <br></br>
      <br></br>
        {/* Product Info Section */}
        <div className="product-info">
          <img
            src={Image} /* Replace with actual product image path */
            alt="Product"
            className="product-image"
          />
          <div className="product-details">
            <h2>Steinway & Sons Model D Concert Grand Piano</h2>
            <p>Pickup date: 2024 Oct 7</p>
            <p>Return date: 2024 Oct 14</p>
            <p className="rental-fee">Rental fee: <span>Rs. 12,000</span></p>
          </div>
        </div>

        <br></br>
        <br></br>

        {/* Billing and Payment Section */}
        <div className="billing-payment">
          {/* Billing Details */}
          <div className="billing-details">
            <h2 className="ckeck-heading">Billing Details <span>*</span></h2>
            <br></br>
            <form className="check-form">
              <div className="form-row">
                <label>First Name <span>*</span></label>
                <input type="text" placeholder="Enter first name" />
              </div>
              <div className="form-row">
                <label>Last Name <span>*</span></label>
                <input type="text" placeholder="Enter last name" />
              </div>
              <div className="form-row">
                <label>Email <span>*</span></label>
                <input type="text" placeholder="Enter email" />
              </div>
              <div className="form-row">
                <label>Address <span>*</span></label>
                <input type="text" placeholder="Enter address" />
              </div>
              <div className="form-row">
                <label>City <span>*</span></label>
                <input type="text" placeholder="Enter city" />
              </div>
              <div className="form-row">
                <label>Postal Code <span>*</span></label>
                <input type="text" placeholder="Enter zip code" />
              </div>
              <div className="form-row">
                <label>Mobile No <span>*</span></label>
                <input type="text" placeholder="Enter mobile number" />
              </div>
              <div className="form-row checkbox">
                <input type="checkbox" />
                <label>Agree to all the terms, Return policy</label>
              </div>
            </form>
          </div>

          {/* Payment Details */}
          <div className="payment-details">
            <div className="pay-cost">
            <h2>Total cost: <span>Rs. 12,000</span></h2>
            </div>
            <br></br>
            <form>
              <div className="form-row payment-method">
                <label>Select the payment method <span>*</span></label>
                <div className="payment-options">
  <label>
    <input type="radio" name="payment" />
    <img src={VisaImage} alt="Visa" />
  </label>
  <label>
    <input type="radio" name="payment" />
    <img src={MasterCardImage} alt="MasterCard" />
  </label>
</div>
<br></br>

              </div>
              <div className="form-row">
                <label>Card Number <span>*</span></label>
                <input type="text" placeholder="XXXX - XXXX - XXXX - XXXX" />
              </div>
              <br></br>
              <div className="form-row">
                <label>Expiry Details <span>*</span></label>
                <div className="expiry-details">
                  <input type="text" placeholder="Year" />
                  <input type="text" placeholder="Month" />
                </div>
              </div>
              <br></br>
              <div className="form-row">
                <label>CVV <span>*</span></label>
                <input type="text" placeholder="CVV" />
              </div>
              <button type="submit" className="checkout-btn">Checkout</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
