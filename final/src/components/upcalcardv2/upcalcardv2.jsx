import React from 'react';
import './upcalcardv2.css';
import drums from '../../assets/proimage/piono.jpg';

const Upcalcard = () => {
  return (
    <div className="upcalcardcontainer">
      <div className="upcal-container">
        <div className="imgsection">
          <img src={drums} alt="" className="drums-image" />
        </div>
        <div className="upcal-detailssection">
          <h2 className="img-title">Steinway & Sons Model D Concert Grand Piano</h2>
          <div className="renter-info">
            <p>Client name: <span>Franklin Tavarez</span></p>
            <p>Pickup date: <span>2024 Oct 7</span></p>
            <p>Return date: <span>2024 Oct 14</span></p>
            <p>Dates range: <span>1 week</span></p>
            <p>Rental fees : <span className="rental-fee">Rs. 18,000</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcalcard;
