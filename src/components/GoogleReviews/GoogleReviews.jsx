import React, { useState, useEffect } from "react";

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const placeId = "ChIJxfStQss9B08Ru9WOxchFu6I";
  const apiKey = "AIzaSyAdLDtbSip6nx7QOiVziFQscvaOmLkyZPU";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews&key=${apiKey}&language=es`
        );
        const data = await response.json();
        setReviews(data.result.reviews || []);
        setRating(data.result.rating);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [placeId, apiKey]);

  return (
    <div className="google-reviews">
      {rating && (
        <div className="rating">
          <h2>Calificación: {rating}</h2>
        </div>
      )}
      {reviews.length > 0 && (
        <div className="reviews">
          <h3>Reseñas:</h3>
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.author_name}</strong>
              </p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
