import React from "react";
import "./location.css"; // Import the CSS file

const Location = () => {
  return (
    <div className="search-bar">
      <div className="search-section">
        <label>Location</label>
        <div className="input-group">
          <span className="icon">📍</span>
          <input type="text" placeholder="All location" />
        </div>
      </div>

      <div className="search-section">
        <label>Item</label>
        <div className="input-group">
          <span className="icon">🔧</span>
          <input type="text" placeholder="Item name" />
        </div>
      </div>

      <div className="search-section">
        <label>Date</label>
        <div className="date-group">
          <input type="date" placeholder="Pickup date" />
          <span className="separator">|</span>
          <input type="date" placeholder="Handover date" />
        </div>
      </div>

      <button className="search-button">Search</button>
    </div>
  );
};

export default Location;
