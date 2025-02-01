import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/wishlist';
import Rating from './Rating';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={`/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="product-image"
        />
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <AiFillHeart className="heart-icon active" />
          ) : (
            <AiOutlineHeart className="heart-icon" />
          )}
        </button>
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>
        <Rating 
          rating={product.rating} 
          reviews={product.reviews}
          showAnimation={true}
        />
        <div className="product-price">
          ${product.price.toLocaleString()}
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
