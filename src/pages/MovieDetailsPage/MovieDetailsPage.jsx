/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useParams, Outlet, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const prevLocation = useRef(null);
  const location = useLocation();
  const searchParams = useSearchParams();
  const movieId = useParams().movieId;

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
        const response = await axios.get(url);
        setMovieDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
        const response = await axios.get(url);
        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
        const response = await axios.get(url);
        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
      }
    };

    prevLocation.current = location.state;
    fetchMovieDetails();
    fetchMovieReviews();
    fetchMovieCast();
  }, [movieId, location]);

  useEffect(() => {
    if (prevLocation.current !== location.state) {
      // handle location change if needed
    }
  }, [location.state]);

  const goBack = () => {
    searchParams.delete("movieId");
  };

  return (
    <div>
      {!movieDetails ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button onClick={goBack}>Go back</button>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div>
              <h1>{movieDetails.title}</h1>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
          {error && <div>Error: {error}</div>}
          <div>
            <h2 onClick={toggleCast}>Cast</h2>
            {castVisible && <MovieCast cast={cast} />}
          </div>
          <div>
            <h2 onClick={toggleReviews}>Reviews</h2>
            {reviewsVisible && <MovieReviews reviews={reviews} />}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
