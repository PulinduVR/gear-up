import React, { useEffect, useState } from "react";
import "./checkout.css";
import VisaImage from "../../assets/visa.png";
import MasterCardImage from "../../assets/mastercard.png";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchPendingReservations = async () => {
      try {
        //const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user || !user.id) {
          console.error("User ID is missing!");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/reservations/pending?userId=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setReservations(data);
        console.log("Fetched Reservations:", data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchPendingReservations();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/reservations/confirm/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Reservation confirmed successfully!");
        navigate("/");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
      alert("Failed to confirm reservation. Please try again.");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1 className="ckeck-heading">
          Checkout <span>*</span>
        </h1>
        <br></br>
        <br></br>
        {/* Product Info Section */}
        <div className="product-info">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation._id} className="reservation-card">
                <img
                  src={reservation.product.img}
                  alt="Product"
                  className="product-image"
                />
                <div className="product-details">
                  <h2>{reservation.product.name}</h2>
                  <p>
                    Pickup date:{" "}
                    {new Date(reservation.startDate).toDateString()}
                  </p>
                  <p>
                    Return date: {new Date(reservation.endDate).toDateString()}
                  </p>
                  <p className="rental-fee">
                    Rental fee: <span>Rs. {reservation.totalRentPrice}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No pending reservations found.</p>
          )}
        </div>

        <br></br>
        <br></br>

        {/* Billing and Payment Section */}
        <div className="billing-payment">
          {/* Billing Details */}
          <div className="billing-details">
            <h2 className="ckeck-heading">
              Billing Details <span>*</span>
            </h2>
            <br></br>
            <form className="check-form">
              <div className="form-row">
                <label>
                  First Name <span>*</span>
                </label>
                <input type="text" placeholder="Enter first name" />
              </div>
              <div className="form-row">
                <label>
                  Last Name <span>*</span>
                </label>
                <input type="text" placeholder="Enter last name" />
              </div>
              <div className="form-row">
                <label>
                  Email <span>*</span>
                </label>
                <input type="text" placeholder="Enter email" />
              </div>
              <div className="form-row">
                <label>
                  Address <span>*</span>
                </label>
                <input type="text" placeholder="Enter address" />
              </div>
              <div className="form-row">
                <label>
                  City <span>*</span>
                </label>
                <input type="text" placeholder="Enter city" />
              </div>
              <div className="form-row">
                <label>
                  Postal Code <span>*</span>
                </label>
                <input type="text" placeholder="Enter zip code" />
              </div>
              <div className="form-row">
                <label>
                  Mobile No <span>*</span>
                </label>
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
              <h2>
                Total cost:{" "}
                <span>
                  Rs.{" "}
                  {reservations.reduce(
                    (sum, reservation) =>
                      sum + parseFloat(reservation.totalRentPrice || 0),
                    0
                  )}
                </span>
              </h2>
            </div>
            <br></br>
            <form>
              <div className="form-row payment-method">
                <label>
                  Select the payment method <span>*</span>
                </label>
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
                <label>
                  Card Number <span>*</span>
                </label>
                <input type="text" placeholder="XXXX - XXXX - XXXX - XXXX" />
              </div>
              <br></br>
              <div className="form-row">
                <label>
                  Expiry Details <span>*</span>
                </label>
                <div className="expiry-details">
                  <input type="text" placeholder="Year" />
                  <input type="text" placeholder="Month" />
                </div>
              </div>
              <br></br>
              <div className="form-row">
                <label>
                  CVV <span>*</span>
                </label>
                <input type="text" placeholder="CVV" />
              </div>
              <button
                type="submit"
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
