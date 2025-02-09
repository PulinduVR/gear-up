import React, { useEffect, useState } from "react";
import "./checkout.css";
import VisaImage from "../../assets/visa.png";
import MasterCardImage from "../../assets/mastercard.png";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    mobileNo: "",
    paymentMethod: "",
    cardNumber: "",
    expiryYear: "",
    expiryMonth: "",
    cvv: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchPendingReservations = async () => {
      try {
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
  }, [user]);

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validate form data before proceeding
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
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
    }
  };

  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.firstName) errors.firstName = "First name is required.";
    if (!data.lastName) errors.lastName = "Last name is required.";
    if (!data.email || !emailRegex.test(data.email))
      errors.email = "Valid email is required.";
    if (!data.address) errors.address = "Address is required.";
    if (!data.city) errors.city = "City is required.";
    if (!data.postalCode) errors.postalCode = "Postal code is required.";
    if (!data.mobileNo || !phoneRegex.test(data.mobileNo))
      errors.mobileNo = "Valid mobile number is required.";
    if (!data.paymentMethod)
      errors.paymentMethod = "Payment method is required.";
    if (!data.cardNumber || data.cardNumber.length !== 19)
      errors.cardNumber =
        "Card number must be in the format XXXX - XXXX - XXXX - XXXX.";
    if (!data.expiryYear || !data.expiryMonth)
      errors.expiryDetails = "Expiry date is required.";
    if (!data.cvv || data.cvv.length !== 3)
      errors.cvv = "CVV must be 3 digits.";
    if (!data.agreeTerms)
      errors.agreeTerms = "You must agree to the terms and conditions.";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1 className="ckeck-heading">
          Checkout <span>*</span>
        </h1>
        <br />
        <br />
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

        <br />
        <br />

        {/* Billing and Payment Section */}
        <div className="billing-payment">
          {/* Billing Details */}
          <div className="billing-details">
            <h2 className="ckeck-heading">
              Billing Details <span>*</span>
            </h2>
            <br />
            <form className="check-form">
              <div className="form-row">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="form-row">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
              <div className="form-row">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-row">
                <label>
                  Address <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <span className="error">{errors.address}</span>
                )}
              </div>
              <div className="form-row">
                <label>
                  City <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-row">
                <label>
                  Postal Code <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter zip code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && (
                  <span className="error">{errors.postalCode}</span>
                )}
              </div>
              <div className="form-row">
                <label>
                  Mobile No <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
                {errors.mobileNo && (
                  <span className="error">{errors.mobileNo}</span>
                )}
              </div>
              <div className="form-row checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label>Agree to all the terms, Return policy</label>
                {errors.agreeTerms && (
                  <span className="error">{errors.agreeTerms}</span>
                )}
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
            <br />
            <form>
              <div className="form-row payment-method">
                <label>
                  Select the payment method <span>*</span>
                </label>
                <div className="payment-options">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="visa"
                      onChange={handleChange}
                    />
                    <img src={VisaImage} alt="Visa" />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mastercard"
                      onChange={handleChange}
                    />
                    <img src={MasterCardImage} alt="MasterCard" />
                  </label>
                </div>
                {errors.paymentMethod && (
                  <span className="error">{errors.paymentMethod}</span>
                )}
              </div>
              <div className="form-row">
                <label>
                  Card Number <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="XXXX - XXXX - XXXX - XXXX"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && (
                  <span className="error">{errors.cardNumber}</span>
                )}
              </div>
              <br />
              <div className="form-row">
                <label>
                  Expiry Details <span>*</span>
                </label>
                <div className="expiry-details">
                  <input
                    type="text"
                    placeholder="Year"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Month"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                  />
                </div>
                {errors.expiryDetails && (
                  <span className="error">{errors.expiryDetails}</span>
                )}
              </div>
              <br />
              <div className="form-row">
                <label>
                  CVV <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
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
