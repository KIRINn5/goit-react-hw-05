import { useState, useEffect, useRef } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import { API_READ_ACCESS_TOKEN } from "../../components/API/API";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const prevLocation = useRef(null);
  const location = useLocation();
  const { movieId } = useParams();

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

    const fetchMovieReviews = async () => {
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

    const fetchMovieCast = async () => {
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

    prevLocation.current = location.state;
    fetchMovieDetails();
    fetchMovieReviews();
    fetchMovieCast();
  }, [movieId, location.state]);

  useEffect(() => {
    if (prevLocation.current !== location.state) {
      // Виконується, коли змінюється розташування
    }
  }, [location.state]);

  const goBack = () => {
    // Редагуємо розташування, щоб повернутися назад
  };

  return (
    <div>
      {!movieDetails ? (
        <Loader />
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
          {error && <ErrorMessage />}
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
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
