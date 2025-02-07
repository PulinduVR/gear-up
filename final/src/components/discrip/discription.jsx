import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./description.css";
import pianoimge from "../../assets/proimage/piono.jpg"; // Import the image
import amped from "../../assets/proimage/amped.jpg";
import saxo from "../../assets/proimage/saxo.jpg";
import light from "../../assets/proimage/light.jpg";
import { useNavigate } from "react-router-dom";
import ImageShare from "../../assets/proimage/new-share.png"; // Import heart icon image
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Description = () => {
  const { title: title, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");

  const [pickupDate, setPickupDate] = useState(new Date());
  const [handoverDate, setHandoverDate] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkedAvailability, setCheckedAvailability] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState("");

  const handleCheckAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5000/reservations/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          startDate: pickupDate,
          endDate: handoverDate,
        }),
      });

      const data = await response.json();
      console.log("Availability response:", data);
      setEstimatedCost(data.estimatedCost);

      setCheckedAvailability(true);

      if (data.available) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
        alert(
          "Product is not available for the selected date range. Please try a different range."
        );
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const fetchProductReviews = async (productId) => {
    setReviewsLoading(true);
    setReviewsError("");

    try {
      const response = await fetch(
        `http://localhost:5000/reviews/${productId}`
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewsError("Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      console.log(product._id);
      fetchProductReviews(product._id);
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${encodeURIComponent(title)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product details");
        }

        setProduct(data[0]);
        console.log(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [title]);

  // State variables
  // const [rating, setRating] = useState(0);
  // const [hoverRating, setHoverRating] = useState(0);
  // const [reviewTitle, setReviewTitle] = useState(""); // Renamed to avoid conflict
  // const [comment, setComment] = useState("");
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const buttonRef = useRef(null);

  const ratings = [1, 2, 3, 4, 5];

  // Handlers
  // const handleWriteReviewClick = () => setShowReviewCard(true);
  // const handleStarClick = (value) => setRating(value);
  // const handleStarHover = (value) => setHoverRating(value);
  // const handleStarLeave = () => setHoverRating(0);

  const ReviewForm = ({ productId }) => {
    const [formData, setFormData] = useState({
      title: "",
      comment: "",
      starCount: "0",
      product: productId,
      user: "65f2e37d9fa36c72c71d5d23",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newReview = await response.json();
        console.log("Review added successfully:", newReview);
        setFormData({
          ...formData,
          title: "",
          comment: "",
          starCount: "0",
        });
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="starCount">Rating</label>
          <select
            id="starCount"
            name="starCount"
            value={formData.starCount}
            onChange={handleChange}
            required
          >
            <option value="0">Select rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <button type="submit">Submit Review</button>
      </form>
    );
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const handleLoadMoreClick = () => navigate("/review");
  const handleReserve = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const response = await fetch("http://localhost:5000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product._id,
          startDate: pickupDate,
          endDate: handoverDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Reservation failed. Please try again.");
      }

      const responseData = await response.json();
      console.log("Reservation created:", responseData);

      // Navigate to checkout with reservation details
      navigate("/checkout", { state: { reservation: responseData } });
    } catch (error) {
      console.error("Error reserving product:", error);
      alert("An error occurred while reserving.");
    }
  };

  const handlechat = () => navigate("/chat");

  // State for heart icon toggle
  const [liked, setLiked] = useState(false);

  // Toggle like status
  const toggleLike = () => {
    setLiked(!liked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="description-page">
      {/* Main Section */}
      <div className="main-section">
        {/* Image Section */}
        <div className="image-section">
          <img
            src={product.img} // Use the imported image
            alt={title}
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
            <p>{product.category}</p>
          </div>

          {/* Section for title, icons, and category */}
          <div className="section1Dis">
            <p className="cat-text">{product.category}</p>
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
                  fill={liked ? "red" : "none"}
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2>{product.name}</h2>
          <p>
            📍 {product.district}{" "}
            <a href="#" className="location">
              show on map
            </a>
          </p>

          <div className="pricing">
            <div>
              <p>Daily</p>
              <p>{product.price}</p>
            </div>
            {/* <div>
              <p>Weekly</p>
              <p>Rs. 12,000</p>
            </div>
            <div>
              <p>Monthly</p>
              <p>Rs. 32,000</p>
            </div> */}
          </div>

          <hr />

          {/* Pickup and Handover dates with availability button */}
          <div className="availability">
            <label>Pickup Date:</label>
            <DatePicker selected={pickupDate} onChange={setPickupDate} />
            <label>Handover Date:</label>
            <DatePicker selected={handoverDate} onChange={setHandoverDate} />
            <button
              className="check-availability"
              onClick={handleCheckAvailability}
              disabled={!pickupDate || !handoverDate}
            >
              Check availability
            </button>
          </div>

          <p className="estimated-cost">Estimated costs: {estimatedCost}</p>
          <hr />

          {/* Buttons */}
          <div className="buttons">
            <button onClick={handlechat} className="chat">
              Chat
            </button>
            {checkedAvailability && isAvailable && (
              <button className="reserve" onClick={handleReserve}>
                Reserve
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h3>Description</h3>
        <p>{product.description}</p>
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

            <button
              className="write-review"
              onClick={() => setShowReviewCard(true)}
            >
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
                    className={`star ${
                      hoverRating >= star || rating >= star ? "filled" : ""
                    }`}
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
                  //onChange={(e) => setReviewTitle(e.target.value)}
                  onChange={handleChange}
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
          <div className="reviews-section">
            <h2>Reviews</h2>
            {reviewsLoading ? (
              <div>Loading reviews...</div>
            ) : reviewsError ? (
              <div className="error">{reviewsError}</div>
            ) : reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <h3>{review.title}</h3>
                    <p>Rating: {"⭐".repeat(review.starCount)}</p>
                    <p>{review.comment}</p>
                    <p className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet. Be the first to write one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
