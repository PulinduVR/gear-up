import React from 'react';
import piano_Image from '../../assets/proimage/piono.jpg'; 
import './calcard.css';

const Calcard = () => {
  return (
    <div className="start">
        <div className='calcard'>
            <div className='image-selection'>
                <img src={piano_Image} alt="" className='piano-image'></img>
            </div>
            <div className="details-section">
                <h2 className="piano-title">Steinway & Sons Model D Concert Grand Piano</h2>
                <div className="client-info">

                    <p>Client name: <span>Franklin Tavarez</span></p>
                    <p>Pickup date: <span>2024 oct 7</span></p>
                    <p>Return date: <span>2024 oct 14</span></p>
                    <p>Dates range: <span>1 week</span></p>
                    <p>Rental fees : <span className="rental-fee">Rs. 18,000</span></p>
                </div>
                <button className="chat-btn">Chat with client</button>
            </div>
        </div> 
    </div>
  );
};

export default Calcard;
