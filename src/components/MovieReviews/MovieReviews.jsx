import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const MovieReviews = ({ apiKey }) => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const apiKey = "54748db55a18c7d1785893914b659eb4";
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;
        const response = await axios.get(url);
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error.message);
      }
    };

    fetchMovieReviews();
  }, [movieId, apiKey]);

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
