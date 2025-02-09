import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./description.css";
import pianoimge from "../../assets/proimage/piono.jpg";
import amped from "../../assets/proimage/amped.jpg";
import saxo from "../../assets/proimage/saxo.jpg";
import light from "../../assets/proimage/light.jpg";
import ImageShare from "../../assets/proimage/new-share.png";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Description = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  // Product States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Review States
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Reservation States
  const [pickupDate, setPickupDate] = useState(new Date());
  const [handoverDate, setHandoverDate] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkedAvailability, setCheckedAvailability] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState("");
  const [liked, setLiked] = useState(false);

  // Fetch Product Details
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [title]);

  // Fetch Reviews
  const fetchReviews = async (productId) => {
    setReviewsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/reviews/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setReviewsError("Failed to load reviews");
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (product?._id) {
      fetchReviews(product._id);
    }
  }, [product]);

  // Handle Availability Check
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
      setEstimatedCost(data.estimatedCost);
      setCheckedAvailability(true);

      if (data.available) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
        alert("Product is not available for the selected date range. Please try a different range.");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  // Handle Reserve
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
      navigate("/checkout", { state: { reservation: responseData } });
    } catch (error) {
      console.error("Error reserving product:", error);
      alert("An error occurred while reserving.");
    }
  };

  // Review Form Component
  const ReviewForm = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
      title: "",
      comment: "",
      starCount: 0,
      product: product?._id || "",
      user: userInfo?.id || "",
    });

    const handleStarClick = (rating) => {
      setFormData({ ...formData, starCount: rating });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormError("");
      setSubmitting(true);

      // Validate user is logged in
      if (!userInfo?.id) {
        setFormError("Please log in to submit a review");
        setSubmitting(false);
        return;
      }

      // Validate product ID exists
      if (!product?._id) {
        setFormError("Invalid product");
        setSubmitting(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: formData.user,
            product: formData.product,
            starCount: formData.starCount,
            title: formData.title,
            comment: formData.comment
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.status === 201) {
          const newReview = await response.json();
          // Fetch updated reviews to ensure consistency
          await fetchReviews(product._id);
          
          // Reset form and close
          setFormData({
            title: "",
            comment: "",
            starCount: 0,
            product: product._id,
            user: userInfo.id,
          });
          setShowReviewForm(false);
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        setFormError("Failed to submit review. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="review-card">
        <h3 className="review-title">Write a Review</h3>
        {formError && <div className="error-message">{formError}</div>}
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className="review-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="input-field"
              disabled={submitting}
            />
          </div>

          <div className="review-field star-rating">
            <label>Rating</label>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`star ${formData.starCount >= num ? "filled" : ""}`}
                onClick={() => handleStarClick(num)}
              >
                ★
              </span>
            ))}
          </div>

          <div className="review-field">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              className="textarea-field"
              disabled={submitting}
            />
          </div>

          <div className="review-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button 
              type="button" 
              onClick={() => setShowReviewForm(false)}
              className="cancel-button"
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="description-page">
      {/* Main Section */}
      <div className="main-section">
        {/* Image Section */}
        <div className="image-section">
          <img src={product.img} alt={title} className="main-image" />
          <div className="thumbnail-gallery">
            <img src={amped} alt="Thumbnail 1" />
            <img src={saxo} alt="Thumbnail 2" />
            <img src={light} alt="Thumbnail 3" />
          </div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="breadcrumbs">
            <p>{product.category}</p>
          </div>

          <div className="section1Dis">
            <p className="cat-text">{product.category}</p>
            <div className="iconss">
              <img src={ImageShare} alt="Share" className="shareicon" />
              <svg
                onClick={() => setLiked(!liked)}
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

          <h2>{product.name}</h2>
          <p>
            📍 {product.district}{" "}
            <a href="#" className="location">show on map</a>
          </p>

          <div className="pricing">
            <div>
              <p>Daily</p>
              <p>{product.price}</p>
            </div>
          </div>

          <hr />

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

          <div className="buttons">
            <button onClick={() => navigate("/chat")} className="chat">
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
        <button
          className="write-review"
          onClick={() => setShowReviewForm(true)}
        >
          Write a review
        </button>

        {showReviewForm && <ReviewForm />}

        {reviewsLoading ? (
          <div>Loading reviews...</div>
        ) : reviewsError ? (
          <div className="error-message">{reviewsError}</div>
        ) : reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review._id} className="review-item">
                <h3>{review.title}</h3>
                <p>Rating: {"⭐".repeat(parseInt(review.starCount))}</p>
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
  );
};

export default Description;