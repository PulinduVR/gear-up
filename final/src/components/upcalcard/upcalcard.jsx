import React from 'react';
import './upcalcard.css';
import drums from '../../assets/proimage/drmus.jpg';

const Upcalcard = () => {
  return (
    <div className="upcalcardcontainer">
      <div className="upcal-container">
        <div className="imgsection">
          <img src={drums} alt="" className="drums-image" />
        </div>
        <div className="upcal-detailssection">
          <h2 className="img-title">Meinl Percussion Professional Series Handcrafted Bongo Drums</h2>
          <div className="renter-info">
            <p>Client name: <span>Franklin Tavarez</span></p>
            <p>Pickup date: <span>2024 Oct 7</span></p>
            <p>Return date: <span>2024 Oct 14</span></p>
            <p>Dates range: <span>1 week</span></p>
            <p>Rental fees : <span className="rental-fee">Rs. 18,000</span></p>
          </div>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Upcalcard;
