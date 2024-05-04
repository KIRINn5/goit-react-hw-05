import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useParams, Outlet, useLocation, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const prevLocation = useRef(null);
  const { movieId } = useParams();
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const toggleCast = () => {
    setCastVisible(!castVisible);
  };

  // eslint-disable-next-line no-unused-vars
  const toggleReviews = () => {
    setReviewsVisible(!reviewsVisible);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}`;
        const response = await axios.get(url);
        setMovieDetails(response.data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
        const response = await axios.get(url);
        setReviews(response.data.results);
      } catch (error) {
        setIsError(true);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
        const response = await axios.get(url);
        setCast(response.data.cast);
      } catch (error) {
        setIsError(true);
      }
    };

    prevLocation.current = location.state;
    fetchMovieDetails();
    fetchMovieReviews();
    fetchMovieCast();
  }, [movieId, location]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <>
          {movieDetails && (
            <>
              <Link to={prevLocation.current || "/"}>⬅ Go Back</Link>
              <div>
                <h1>{movieDetails.original_title} </h1>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                  alt={movieDetails.title}
                />
                <div>
                  <h2>Overview</h2>
                  <p>{movieDetails.overview}</p>
                  <h3>Genres</h3>
                  <ul>
                    {movieDetails.genres.map(({ id, name }) => (
                      <li key={id}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={css.moviedetails}>
                <h4>Additional Information</h4>
                <Link to={`${location.pathname}/cast`}>Cast</Link>
                <Link to={`${location.pathname}/reviews`}>Reviews</Link>
                <Routes>
                  <Route path="cast" element={<MovieCast cast={cast} />} />
                  <Route
                    path="reviews"
                    element={<MovieReviews reviews={reviews} />}
                  />
                </Routes>
              </div>
            </>
          )}
        </>
      )}
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
