import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useParams, Outlet, useLocation } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import { useSearchParams } from "react-router-dom";
import { API_READ_ACCESS_TOKEN } from "../../components/API/API";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const prevLocation = useRef(null); // Змінив значення з null на null
  const location = useLocation();
  const searchParams = useSearchParams();

  const toggleCast = () => {
    setCastVisible(!castVisible);
  };

  const toggleReviews = () => {
    setReviewsVisible(!reviewsVisible);
  };

  const movieId = useParams().movieId;

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

    // Оновлюємо prevLocation.current замість location.pathname
    prevLocation.current = location.state;
    fetchMovieDetails();
    fetchMovieReviews();
    fetchMovieCast();
  }, [movieId, location]);

  useEffect(() => {
    // Оновлюємо useEffect, щоб він спрацьовував при зміні prevLocation.current
    if (prevLocation.current !== location.state) {
      // Дії, які виконуються при зміні розташування
    }
  }, [location.state]); // Оновлюємо useEffect зміни prevLocation.current

  const goBack = () => {
    searchParams.delete("movieId");
  };

  return (
    <div>
      {!movieDetails ? (
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
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;