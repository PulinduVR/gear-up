import React, { useState } from "react";
import './myrentals.css';
import Image1 from '../../assets/proimage/drmus.jpg';
import Image2 from '../../assets/proimage/piono.jpg';
import Image3 from '../../assets/proimage/saxo.jpg';
import Image4 from '../../assets/proimage/pad.jpg';

const MyRentals = () => {
    const [upcomingSortOrder, setUpcomingSortOrder] = useState("Top Reviews");
    const [historySortOrder, setHistorySortOrder] = useState("Top Reviews");

    return (
        <div className="rentals-container">
            {/* Upcoming Rentals Section */}
            <div className="rentals-section">
                <div className="section-header">
                    <h2 className="rental-head">My upcoming rentals</h2>
                    <span>
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
                    </span>
                </div>
                <div className="rental-item">
                    <img
                        src={Image1}
                        alt="Meinl Percussion Professional Series Handcrafted Bongo Drums"
                        className="rental-image"
                    />
                    <div className="rental-details">
                        <h3>Meinl Percussion Professional Series Handcrafted Bongo Drums</h3>
                        <div className="sub-rental-detail">
                            <p><strong>Client name:</strong> Franklin Tavarez</p>
                            <p><strong>Pickup date:</strong> 2024 Oct 7</p>
                            <p><strong>Return date:</strong> 2024 Oct 14</p>
                            <p><strong>Rental dates:</strong> 1 week</p>
                            <div className="rental-fee-container">
                                <h4><strong>Rental fee:</strong> Rs. 18,000</h4>
                                <span><button className="cancel-button">Cancel</button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchased History Section */}
            <div className="rentals-section">
                <div className="section-header">
                    <h2 className="rental-head">My purchased history</h2>
                    <span>
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
                    </span>
                </div>
                <div className="rental-item">
                    <img
                        src={Image2}
                        alt="Steinway & Sons Model D Concert Grand Piano"
                        className="rental-image"
                    />
                    <div className="rental-details">
                        <h3>Steinway & Sons Model D Concert Grand Piano</h3>
                        <div className="sub-rental-detail">
                            <p><strong>Client name:</strong> Franklin Tavarez</p>
                            <p><strong>Pickup date:</strong> 2024 Oct 7</p>
                            <p><strong>Return date:</strong> 2024 Oct 14</p>
                            <p><strong>Rental dates:</strong> 1 week</p>
                            <h4><strong>Rental fee:</strong> Rs. 18,000</h4>
                        </div>
                    </div>
                </div>

                <div className="rental-item">
                    <img
                        src={Image3}
                        alt="Yamaha YAS-480 Intermediate Eb Alto Saxophone"
                        className="rental-image"
                    />
                    <div className="rental-details">
                        <h3>Yamaha YAS-480 Intermediate Eb Alto Saxophone</h3>
                        <div className="sub-rental-detail">
                            <p><strong>Client name:</strong> Franklin Tavarez</p>
                            <p><strong>Pickup date:</strong> 2024 Oct 7</p>
                            <p><strong>Return date:</strong> 2024 Oct 14</p>
                            <p><strong>Rental dates:</strong> 1 week</p>
                            <h4><strong>Rental fee:</strong> Rs. 24,000</h4>
                        </div>
                    </div>
                </div>

                <div className="rental-item">
                    <img
                        src={Image4}
                        alt="KRK Rokit G4 Powered Professional Bi-Amped Studio Monitor"
                        className="rental-image"
                    />
                    <div className="rental-details">
                        <h3>KRK Rokit G4 Powered Professional Bi-Amped Studio Monitor</h3>
                        <div className="sub-rental-detail">
                            <p><strong>Client name:</strong> Franklin Tavarez</p>
                            <p><strong>Pickup date:</strong> 2024 Oct 7</p>
                            <p><strong>Return date:</strong> 2024 Oct 14</p>
                            <p><strong>Rental dates:</strong> 1 week</p>
                            <h4><strong>Rental fee:</strong> Rs. 12,000</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRentals;
