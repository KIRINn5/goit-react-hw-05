import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
        const response = await axios.get(url);
        setReviews(response.data.cast);
        setReviews(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error.message);
      }
    };
    fetchMovieReviews();
  }, [movieId]);
  return (
    <div>
      {/* <h2>Reviews</h2> */}
      {reviews && reviews.length > 0 ? (
        <ul className={styles.reviews.list}>
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
