import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../styles/Rating.css';

const Rating = ({ rating, reviews, size = 16, showAnimation = true }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${showAnimation ? 'star-animate' : ''}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {i <= fullStars ? (
            <FaStar className="star-filled" size={size} />
          ) : i === fullStars + 1 && hasHalfStar ? (
            <FaStarHalfAlt className="star-half" size={size} />
          ) : (
            <FaRegStar className="star-empty" size={size} />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating-wrapper">
      <div className="stars-container">
        {renderStars()}
      </div>
      {reviews && (
        <span className="review-count">
          ({reviews.toLocaleString()} {reviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default Rating;
