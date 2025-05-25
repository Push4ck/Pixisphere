"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {hasHalfStar && (
          <FaStar
            key="half"
            className="text-yellow-500 transform scale-x-[-1]"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}{" "}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-2">
        {renderStars(review.rating)}
        <span className="ml-2 text-gray-800 font-semibold">
          {review.rating}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{review.comment}</p>
      <div className="text-sm text-gray-500">
        <span className="font-medium">{review.name}</span> on{" "}
        {new Date(review.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
