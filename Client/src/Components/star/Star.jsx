import React from "react";
import "./Star.css";
const StarRating = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);

  const starArray = Array(maxStars)
    .fill()
    .map((_, index) => {
      return (
        <span
          key={index}
          className={index < filledStars ? "star-filled" : "star-empty"}
        >
          &#9733;
        </span>
      );
    });

  return <div className="star-rating">{starArray}</div>;
};

export default StarRating;
