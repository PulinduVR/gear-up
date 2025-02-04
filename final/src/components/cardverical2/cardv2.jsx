import React from 'react';
import './cardv2.css';
import pianopic from '../../assets/proimage/piono.jpg';
import amped from '../../assets/proimage/amped.jpg';
import orgon from '../../assets/proimage/orgon.jpg';


const cardData = [
  {
    image: pianopic,
    title: "Steinway & Sons Model D Concert Grand Piano",
    location: "(Colombo)",
    pricing: {
      daily: "Rs. 3,000",
      weekly: "Rs. 15,000",
      monthly: "Rs. 60,000",
    },
  },
  {
    image: amped,
    title: "KRK Rokit 8 G4 Powered Professional Bi-Amped Studio",
    location: "(Colombo)",
    pricing: {
      daily: "Rs. 5,000",
      weekly: "Rs. 16,000",
      monthly: "Rs. 16,000",
    },
  },
  {
    image: orgon,
    title: "Yamaha p-125 88-key Graded Hammer Standard(GSH)",
    location: "(Colombo)",
    pricing: {
      daily: "Rs. 5,000",
      weekly: "Rs. 16,000",
      monthly: "Rs. 16,000",
    },
  },
];

const Cardv2 = () => {
  return (
    <div className="full-cont">
      {cardData.map((card, index) => (
        <div className="fullcard" key={index}>
          <div className="image-section">
            <img src={card.image} alt={card.title} className="pianopic" />
          </div>
          <div className="title-location">
            <p className="title">{card.title}</p>
            <p className="location">{card.location}</p>
          </div>
          <div className="pricing-section">
            <div className="price-box">
              <p>Daily</p>
              <h3>{card.pricing.daily}</h3>
            </div>
            <div className="price-box">
              <p>Weekly</p>
              <h3>{card.pricing.weekly}</h3>
            </div>
            <div className="price-box">
              <p>Monthly</p>
              <h3>{card.pricing.monthly}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cardv2;
