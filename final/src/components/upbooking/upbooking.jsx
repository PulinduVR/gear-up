import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./upbooking.css";
import MyCalendarr from "../calander-for-upbooking/cal";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming auth token is stored
        const response = await axios.get(
          `http://localhost:5000/reservations/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handlePath = () => {
    navigate("/add-item");
  };

  return (
    <div className="booking-page">
      <h2 className="section-title-book">
        Upcoming Bookings <span className="highlight">*</span>
      </h2>
      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3 className="booking-title">{booking.product.name}</h3>
              <p>
                <strong>Client Name:</strong> {booking.user.username}
              </p>
              <p>
                <strong>Pickup Date:</strong>{" "}
                {new Date(booking.startDate).toDateString()}
              </p>
              <p>
                <strong>Return Date:</strong>{" "}
                {new Date(booking.endDate).toDateString()}
              </p>
              <p>
                <strong>Rental Duration:</strong> {booking.numberOfDays} days
              </p>
              <p>
                <strong>Rental Fee:</strong> Rs. {booking.totalRentPrice}
              </p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      <h2 className="section-title-book">My Calendar</h2>
      <div className="calendar-section">
        <MyCalendarr />
      </div>

      <h2 className="section-title-book">Your Items</h2>
      <div className="items-header">
        <button onClick={handlePath} className="add-item-button">
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
