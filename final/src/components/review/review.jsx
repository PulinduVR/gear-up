import  { useState } from "react";
import "../review/review.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ReviewNew = () => {
  const { title: pageTitle, category } = useParams(); // Rename `title` from params to `pageTitle`
  const navigate = useNavigate();

  // State variables
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState(""); // Renamed to avoid conflict
  const [comment, setComment] = useState("");
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [sortOrder, setSortOrder] = useState("Top Reviews");

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

 

  return (
    <>
      <div className="review-section-new">
        <h2 className="review-heading-new">Reviews</h2>

        <div className="filter-controls-new">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All Ratings">Ratings</option>
            <option value="1 star">1 star</option>
            <option value="2 star">2 star</option>
            <option value="3 star">3 star</option>
            <option value="4 star">4 star</option>
            <option value="5 star">5 star</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-dropdown"
          >
            <option value="Sort">Sort</option>
            <option value="Top Reviews">Top Reviews</option>
            <option value="Most Recent">Most Recent</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="review-summary-container">
        <div className="review-rating-box">
          <h3>⭐ 5 out of 5</h3>
          <p>(6 ratings)</p>
          <div className="rating-breakdown">
            {["5 star", "4 star", "3 star", "2 star", "1 star"].map(
              (label, index) => (
                <div className="rating-item" key={index}>
                  <strong>{label}</strong>
                  <div className="rating-bar">
                    <div
                      className="rating-fill"
                      style={{ width: index === 0 ? "100%" : "0%" }}
                    ></div>
                  </div>
                  <span>{index === 0 ? "100%" : "0%"}</span>
                </div>
              )
            )}
          </div>
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

        <div className="user-reviews">
          <div className="review-item">
            <h3>Positive Experience</h3>
            <p>
              <strong>Sarah Francis</strong> - Singer
            </p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>
              I had a fantastic experience renting through this buyer. The process was smooth, and the item I rented was exactly as described. The seller was easy to communicate with, and the reserve fee gave me peace of mind. Highly recommend this service!
            </p>
            <p className="review-date">2024/09/12</p>
          </div>

          <div className="review-item">
            <h3>Positive Experience</h3>
            <p>
              <strong>Sarah Francis</strong> - Singer
            </p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>
              I had a fantastic experience renting through this buyer. The process was smooth, and the item I rented was exactly as described. The seller was easy to communicate with, and the reserve fee gave me peace of mind. Highly recommend this service!
            </p>
            <p className="review-date">2024/09/12</p>
          </div>

          <div className="review-item">
            <h3>Positive Experience</h3>
            <p>
              <strong>Sarah Francis</strong> - Singer
            </p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>
              I had a fantastic experience renting through this buyer. The process was smooth, and the item I rented was exactly as described. The seller was easy to communicate with, and the reserve fee gave me peace of mind. Highly recommend this service!
            </p>
            <p className="review-date">2024/09/12</p>
          </div>

          <div className="review-item">
            <h3>Positive Experience</h3>
            <p>
              <strong>Sarah Francis</strong> - Singer
            </p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>
              I had a fantastic experience renting through this buyer. The process was smooth, and the item I rented was exactly as described. The seller was easy to communicate with, and the reserve fee gave me peace of mind. Highly recommend this service!
            </p>
            <p className="review-date">2024/09/12</p>
          </div>

          {/* Repeat similar structure for other reviews */}
          {/* Review Item 2 */}
          <div className="review-item">
            <h3>Satisfied with the Service</h3>
            <p>
              <strong>Mark Thompson</strong>
            </p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>
              I found what I needed quickly, and the transaction went well. The reserve fee system worked great, but I'd suggest meeting the seller in person before finalizing the payment. Overall, I'm happy with the service!
            </p>
            <p className="review-date">2024/09/12</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewNew;
