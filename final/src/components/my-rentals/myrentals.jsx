import React, { useState, useEffect } from "react";
import axios from "axios";
import "./myrentals.css";

const MyRentals = () => {
  const [upcomingRentals, setUpcomingRentals] = useState([]);
  const [historyRentals, setHistoryRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [upcomingSortOrder, setUpcomingSortOrder] = useState("Top Reviews");
  const [historySortOrder, setHistorySortOrder] = useState("Top Reviews");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const [upcomingRes, historyRes] = await Promise.all([
          axios.get(`http://localhost:5000/reservations/upcoming/${user.id}`),
          axios.get(`http://localhost:5000/reservations/history/${user.id}`),
        ]);
        setUpcomingRentals(upcomingRes.data);
        setHistoryRentals(historyRes.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user.id]);

  const handleCancel = async (reservationId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/reservations/cancel/${reservationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Reservation canceled successfully!");
        setUpcomingRentals((prev) =>
          prev.filter((rental) => rental._id !== reservationId)
        ); // Remove canceled rental from the list
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
      alert("Failed to cancel reservation. Please try again.");
    }
  };

  return (
    <div className="rentals-container">
      {loading ? (
        <p>Loading rentals...</p>
      ) : (
        <>
          {/* Upcoming Rentals */}
          <div className="rentals-section">
            <div className="section-header">
              <h2 className="rental-head">My upcoming rentals</h2>
              <select
                value={upcomingSortOrder}
                onChange={(e) => setUpcomingSortOrder(e.target.value)}
                className="filter-dropdown-rental"
              >
                <option value="Sort">Sort</option>
                <option value="Top Reviews">Top Reviews</option>
                <option value="Most Recent">Most Recent</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
            {upcomingRentals.length > 0 ? (
              upcomingRentals.map((rental) => (
                <div className="rental-item" key={rental._id}>
                  <img
                    src={rental.product.img}
                    alt={rental.product.name}
                    className="rental-image"
                  />
                  <div className="rental-details">
                    <h3>{rental.product.name}</h3>
                    <div className="sub-rental-detail">
                      <p>
                        <strong>Client name:</strong> {rental.user.username}
                      </p>
                      <p>
                        <strong>Pickup date:</strong>{" "}
                        {new Date(rental.startDate).toDateString()}
                      </p>
                      <p>
                        <strong>Return date:</strong>{" "}
                        {new Date(rental.endDate).toDateString()}
                      </p>
                      <p>
                        <strong>Rental duration:</strong>{" "}
                        {Math.ceil(
                          (new Date(rental.endDate) -
                            new Date(rental.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                      <div className="rental-fee-container">
                        <h4>
                          <strong>Rental fee:</strong> Rs.{" "}
                          {rental.totalRentPrice}
                        </h4>
                        <button
                          className="cancel-button"
                          onClick={() => handleCancel(rental._id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming rentals found.</p>
            )}
          </div>

          {/* Purchased History */}
          <div className="rentals-section">
            <div className="section-header">
              <h2 className="rental-head">My purchased history</h2>
              <select
                value={historySortOrder}
                onChange={(e) => setHistorySortOrder(e.target.value)}
                className="filter-dropdown-rental"
              >
                <option value="Sort">Sort</option>
                <option value="Top Reviews">Top Reviews</option>
                <option value="Most Recent">Most Recent</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
            {historyRentals.length > 0 ? (
              historyRentals.map((rental) => (
                <div className="rental-item" key={rental._id}>
                  <img
                    src={rental.product.img}
                    alt={rental.product.name}
                    className="rental-image"
                  />
                  <div className="rental-details">
                    <h3>{rental.product.name}</h3>
                    <div className="sub-rental-detail">
                      <p>
                        <strong>Client name:</strong> {rental.user.username}
                      </p>
                      <p>
                        <strong>Pickup date:</strong>{" "}
                        {new Date(rental.startDate).toDateString()}
                      </p>
                      <p>
                        <strong>Return date:</strong>{" "}
                        {new Date(rental.endDate).toDateString()}
                      </p>
                      <p>
                        <strong>Rental duration:</strong>{" "}
                        {Math.ceil(
                          (new Date(rental.endDate) -
                            new Date(rental.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                      <h4>
                        <strong>Rental fee:</strong> Rs. {rental.totalRentPrice}
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No rental history found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRentals;
