import React from 'react';
import './upbooking.css';
import MyCalendarr from '../calander-for-upbooking/cal';
import Image2 from '../../assets/upbook2.jpg';
import Image1 from '../../assets/upbook1.jpg';
import Image3 from '../../assets/upbook3.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();

  const handlePath = () => {
    navigate('/add-item');
  };

  return (
    <div className="booking-page">
      <h2 className="section-title-book">Upcoming Booking <span className="highlight">*</span></h2>
<br></br>
      <div className="booking-list">
        <div className="booking-card">
          <h3 className="booking-title">Steinway & Sons Model D Concert Grand Piano</h3>
          <p><strong>Client Name:</strong> Franklin Tavarez</p>
          <p><strong>Pickup Date:</strong> 2024 Oct 7</p>
          <p><strong>Return Date:</strong> 2024 Oct 14</p>
          <p><strong>Rental Duration:</strong> 1 week</p>
          <p><strong>Rental Fee:</strong> Rs. 18,000</p>
        </div>

        <div className="booking-card">
          <h3 className="booking-title">Yamaha YAS-480 Intermediate Eb Alto Saxophone</h3>
          <p><strong>Client Name:</strong> Franklin Tavarez</p>
          <p><strong>Pickup Date:</strong> 2024 Oct 7</p>
          <p><strong>Return Date:</strong> 2024 Oct 14</p>
          <p><strong>Rental Duration:</strong> 1 week</p>
          <p><strong>Rental Fee:</strong> Rs. 18,000</p>
        </div>

        <div className="booking-card">
          <h3 className="booking-title">KRK Rokit 8 G4 Powered Professional Bi-Amped Studio Monitor</h3>
          <p><strong>Client Name:</strong> Franklin Tavarez</p>
          <p><strong>Pickup Date:</strong> 2024 Oct 7</p>
          <p><strong>Return Date:</strong> 2024 Oct 14</p>
          <p><strong>Rental Duration:</strong> 1 week</p>
          <p><strong>Rental Fee:</strong> Rs. 18,000</p>
        </div>
      </div>

      <h2 className="section-title-book">My Calendar</h2>
      <br></br>
      <div className="calendar-section">
        <MyCalendarr />
      </div>

      <h2 className="section-title-book">Your Items</h2>
      <div className="items-header">
        <span className="item-count">3 items listed</span>
        <button onClick={handlePath} className="add-item-button">Add New Item</button>
      </div>
      <div className="item-list">
        <div className="item-card">
        <Link to="/update">
          <img src={Image1} alt="Fog Machine" className="item-image" />
        </Link>
          <p className="item-name">Chauvet DJ Hurricane 1600 Fog Machine</p>
        </div>
        <div className="item-card">
          <img src={Image2} alt="Saxophone" className="item-image" />
          <p className="item-name">Yamaha YAS-480 Intermediate Eb Alto Saxophone</p>
        </div>
        <div className="item-card">
          <img src={Image3} alt="Studio Monitor" className="item-image" />
          <p className="item-name">KRK Rokit 8 G4 Powered Professional Bi-Amped Studio Monitor</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
