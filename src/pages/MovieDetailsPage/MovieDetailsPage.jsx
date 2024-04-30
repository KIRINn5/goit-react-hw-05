import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import { API_READ_ACCESS_TOKEN } from "../../components/API/API";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  const navigate = useNavigate();
  const { movieId } = useParams();
  const prevLocation = useRef(null);

  const toggleCast = () => {
    setCastVisible(!castVisible);
  };

  const toggleReviews = () => {
    setReviewsVisible(!reviewsVisible);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}`;
        const options = {
          headers: {
            Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          },
        };
        const response = await axios.get(url, options);
        setMovieDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fecthMovieReviews = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;

        const options = {
          headers: {
            Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          },
        };
        const response = await axios.get(url, options);
        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    const fecthMovieCast = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

        const options = {
          headers: {
            Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          },
        };
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
      }
    };

    prevLocation.current = window.location.pathname;
    fetchMovieDetails();
    fecthMovieCast();
    fecthMovieReviews();
  }, [movieId]);
  const goBack = () => {
    navigate(prevLocation.current);
  };
  return (
    <div>
      {!movieDetails ? ( // обработка если данные еще загружаются
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <button onClick={goBack} className={styles.button}>
            Go back
          </button>
          <div className={styles.movieInfo}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div className={styles.movieDetails}>
              <h1 className={styles.title}>{movieDetails.title}</h1>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
          {error && <div>Error: {error}</div>}
          <div>
            <h2 onClick={toggleCast} className={styles.toggle}>
              Cast
            </h2>
            {castVisible && <MovieCast cast={cast} />}
          </div>
          <div>
            <h2 onClick={toggleReviews} className={styles.toggle}>
              Reviews
            </h2>
            {reviewsVisible && <MovieReviews reviews={reviews} />}
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieDetailsPage;
