import React, { useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import './description.css';
import pianoimge from '../../assets/proimage/piono.jpg';  // Import the image
import amped from '../../assets/proimage/amped.jpg';
import saxo from '../../assets/proimage/saxo.jpg';
import light from '../../assets/proimage/light.jpg';
import { useNavigate } from 'react-router-dom';
import ImageShare from '../../assets/proimage/new-share.png' // Import heart icon image
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const Description = () => {
    // Extract title and category from route params
    const { title: pageTitle, category } = useParams(); // Rename `title` from params to `pageTitle`
    const navigate = useNavigate();
  
    // State variables
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState(""); // Renamed to avoid conflict
    const [comment, setComment] = useState("");
    const [showReviewCard, setShowReviewCard] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const calendarRef = useRef(null);
    const buttonRef = useRef(null);
  
    const ratings = [1, 2, 3, 4, 5];
  
    // Handlers
    const handleWriteReviewClick = () => setShowReviewCard(true);
    const handleStarClick = (value) => setRating(value);
    const handleStarHover = (value) => setHoverRating(value);
    const handleStarLeave = () => setHoverRating(0);
  
    const handleDoneClick = () => {
      if (!reviewTitle || !comment || rating === 0) {
        alert("Please fill out all fields and select a rating.");
        return;
      }
      alert("Thank you for your review!");
      setRating(0);
      setHoverRating(0);
      setReviewTitle("");
      setComment("");
      setShowReviewCard(false);
    };
    const toggleCalendar = () => {
      setIsCalendarVisible(!isCalendarVisible);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log('Selected Date:', date);
    };
  
    const handleLoadMoreClick = () => navigate("/review");
    const handleReserve = () => navigate("/checkout");
    const handlechat = () => navigate("/chat");

  // State for heart icon toggle
  const [liked, setLiked] = useState(false);
  
  // Toggle like status
  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="description-page">
      {/* Main Section */}
      <div className="main-section">
        {/* Image Section */}
        <div className="image-section">
          <img
            src={pianoimge} // Use the imported image
            alt={pageTitle}
            className="main-image"
          />
          {/* Thumbnail Gallery */}
          <div className="thumbnail-gallery">
            <img src={amped} alt="Thumbnail 1" />
            <img src={saxo} alt="Thumbnail 2" />
            <img src={light} alt="Thumbnail 3" />
          </div>
        </div>

        {/* Details Section */}
        {/* Details Section */}
<div className="details-section">
  {/* New section for category and breadcrumbs */}
  <div className="breadcrumbs">
    <p>Musical instruments / Keyboard & piano</p>
  </div>

  {/* Section for title, icons, and category */}
  <div className="section1Dis">
    <p>{category}</p>
    <div className="iconss">
      <img src={ImageShare} alt="Share" className="shareicon" />
      {/* Heart icon that changes color on click */}
      <svg
        onClick={toggleLike}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hearticon"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={liked ? 'red' : 'none'}
        />
      </svg>
    </div>
  </div>

  {/* Title */}
  <h2>{pageTitle}</h2>
  <p>
    📍 Galle{" "}
    <a href="#" className="location">
      show on map
    </a>
  </p>

  <div className="pricing">
    <div>
      <p>Daily</p>
      <p>Rs. 2,000</p>
    </div>
    <div>
      <p>Weekly</p>
      <p>Rs. 12,000</p>
    </div>
    <div>
      <p>Monthly</p>
      <p>Rs. 32,000</p>
    </div>
  </div>

  <hr />

  {/* Pickup and Handover dates with availability button */}
  <div className="availability">
  <p>📅 Pickup: 2024/09/10 | Handover: 2023/09/14</p>
  <div style={{ position: "relative" }}>
    <button 
      className="check-availability" 
      onClick={toggleCalendar} 
      ref={buttonRef}
    >
      Check availability
    </button>

    {isCalendarVisible && (
      <div className={`calendar-popup-new ${isCalendarVisible ? "" : "hidden"}`}>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
    )}
  </div>
</div>
 
  <p className="estimated-cost">Estimated costs: Rs. 8,000</p>
  <hr />

  {/* Buttons */}
  <div className="buttons">
    <button onClick={handlechat}  className="chat">Chat</button>
    <button className="reserve" onClick={handleReserve}>
      Reserve
    </button>
  </div>
</div>

      </div>

      {/* Description Section */}
      <div className="description-section">
        <h3>Description</h3>
        <p>
          Bring the timeless beauty of the Steinway & Sons Model D Concert Grand
          Piano to your event or studio. This stunning 9-foot piano is known for
          its powerful, rich sound that fills any space, making it the preferred
          choice for professional musicians and venues worldwide.
        </p>
        <p>
          Whether you're hosting a concert, recording in a studio, or need a
          centerpiece for a special event, the Model D delivers a playing
          experience like no other. Its smooth action and deep, resonant tones
          create an unmatched musical experience, loved by pianists of all
          levels. Features:
        </p>
        <ul>
          <li>Size: 9 feet (2.74 meters)</li>
          <li>
            Renowned for its deep bass, clear treble, and balanced mid-range
          </li>
          <li>
            Perfect for concert halls, recording studios, and high-end events
          </li>
          <li>Used by the world's leading pianists and orchestras</li>
        </ul>
        <p>
          Prices are negotiable, and if you have any questions or need more
          details, our chat is always open. We're here to help!
        </p>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        <div className="review-summary">
          <div className="rating-box">
            <h3>⭐ 5 out of 5</h3>
            <p>(2 ratings)</p>
            <div className="ratings-breakdown">
              <div className="rating-item">
                <strong>5 star</strong>
                <div className="rating-bar">
                  <div className="rating-fill" style={{ width: "100%" }}></div>
                </div>
                <span>100%</span>
              </div>
              <div className="rating-item">
                <strong>4 star</strong>
                <div className="rating-bar">
                  <div className="rating-fill" style={{ width: "80%" }}></div>
                </div>
                <span>0%</span>
              </div>
              <div className="rating-item">
                <strong>3 star</strong>
                <div className="rating-bar">
                  <div className="rating-fill" style={{ width: "20%" }}></div>
                </div>
                <span>0%</span>
              </div>
              <div className="rating-item">
                <strong>2 star</strong>
                <div className="rating-bar">
                  <div className="rating-fill" style={{ width: "0%" }}></div>
                </div>
                <span>0%</span>
              </div>
              <div className="rating-item">
                <strong>1 star</strong>
                <div className="rating-bar">
                  <div className="rating-fill" style={{ width: "0%" }}></div>
                </div>
                <span>0%</span>
              </div>
            </div>

            {/* Show the "Write a review" button */}
            
  <button className="write-review" onClick={handleWriteReviewClick}>
    Write a review
  </button>
</div>

          {/* Review Card */}
          {showReviewCard && (
  <div className="review-card">
    <h3 className="review-title">Write a Review</h3>
    <div className="star-rating" onMouseLeave={handleStarLeave}>
      {ratings.map((star) => (
        <span
          key={star}
          className={`star ${hoverRating >= star || rating >= star ? "filled" : ""}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
        >
          ★
        </span>
      ))}
    </div>
    <div className="review-field">
      <label htmlFor="review-title">Title</label>
      <input
        id="review-title"
        type="text"
        value={reviewTitle} 
        onChange={(e) => setReviewTitle(e.target.value)} 
        placeholder="Enter the review title"
        className="input-field"
        
      />
    </div>
    <div className="review-field">
      <label htmlFor="review-comment">Comment</label>
      <textarea
        id="review-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here"
        className="textarea-field"
      ></textarea>
    </div>
    <button className="done-button" onClick={handleDoneClick}>
      Done
    </button>
  </div>
)}

          {/* Individual Reviews */}
          <div className="individual-reviews">
            <div className="review">
              <h3>Positive Experience</h3>
              <p>
                <strong>Sarah Francis</strong> - Singer
              </p>
              <p>⭐⭐⭐⭐⭐</p>
              <p>
                I had a fantastic experience renting through this buyer. The
                process was smooth, and the item I rented was exactly as
                described. The seller was easy to communicate with, and the
                reserve fee gave me peace of mind. Highly recommend this
                service!
              </p>
              <p className="review-date">2024/09/12</p>
            </div>
            <div className="review">
              <h3>Satisfied, will rent again</h3>
              <p>
                <strong>James Turner</strong> - Musician
              </p>
              <p>⭐⭐⭐⭐⭐</p>
              <p>
                The experience was very straightforward. The product was
                top-notch, and the whole process was easy and enjoyable. I'll
                definitely rent again for my next event. Thanks for a great
                service!
              </p>
              <p className="review-date">2024/09/10</p>
            </div>
            <Link to="/review">
              <button className="loadMore">Load More</button>
            </Link>
           {/* Calendar Popup */}
      

          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
