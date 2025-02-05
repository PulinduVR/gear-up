import React, { useState } from "react";
import "./offer-form.css";
import Image1 from '../../assets/proimage/drmus.jpg';
import Image2 from '../../assets/proimage/guitar.jpg';
import Image3 from '../../assets/proimage/piono.jpg';

const OfferForm = ({
  isVisible,
  onClose,
  onSubmit,
  prefilledData = null,
}) => {
  const [dailyPrice, setDailyPrice] = useState(prefilledData?.dailyPrice || "");
  const [weeklyPrice, setWeeklyPrice] = useState(prefilledData?.weeklyPrice || "");
  const [monthlyPrice, setMonthlyPrice] = useState(prefilledData?.monthlyPrice || "");
  const [pickupDate, setPickupDate] = useState(prefilledData?.pickupDate || "");
  const [handoverDate, setHandoverDate] = useState(prefilledData?.handoverDate || "");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = () => {
    if (prefilledData) {
      onClose(); // Close on Pay
    } else {
      onSubmit({
        dailyPrice,
        weeklyPrice,
        monthlyPrice,
        pickupDate,
        handoverDate,
        selectedOption,
      });
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="offer-form-overlay">
      <div className="offer-form-container">
        <h2>Custom Offer</h2>
        <div className="offer-form-content">
          <label>Click selected item</label>
          <div className="item-selection">
            <img src={Image1} alt="item1" />
            <img src={Image2} alt="item2" />
            <img src={Image3} alt="item3" />
          </div>
          <label>Add prices (Rs)</label>
          <div className="price-inputs">
            <div className="price-option">
              <input
                type="checkbox"
                checked={selectedOption === "daily"}
                onChange={() => setSelectedOption("daily")}
              />
              <span>Daily</span>
              <input
                type="number"
                placeholder="Daily Price"
                value={dailyPrice}
                onChange={(e) => setDailyPrice(e.target.value)}
                disabled={selectedOption !== "daily"}
              />
            </div>
            <div className="price-option">
              <input
                type="checkbox"
                checked={selectedOption === "weekly"}
                onChange={() => setSelectedOption("weekly")}
              />
              <span>Weekly</span>
              <input
                type="number"
                placeholder="Weekly Price"
                value={weeklyPrice}
                onChange={(e) => setWeeklyPrice(e.target.value)}
                disabled={selectedOption !== "weekly"}
              />
            </div>
            <div className="price-option">
              <input
                type="checkbox"
                checked={selectedOption === "monthly"}
                onChange={() => setSelectedOption("monthly")}
              />
              <span>Monthly</span>
              <input
                type="number"
                placeholder="Monthly Price"
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(e.target.value)}
                disabled={selectedOption !== "monthly"}
              />
            </div>
          </div>
          <label>Date</label>
          <div className="date-inputs">
            <input
              type="date"
              placeholder="PickUp Date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
            <input
              type="date"
              placeholder="HandOver Date"
              value={handoverDate}
              onChange={(e) => setHandoverDate(e.target.value)}
            />
             <button className="btn-offer" onClick={handleSubmit}>
            {prefilledData ? "Pay" : "Send"}
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
