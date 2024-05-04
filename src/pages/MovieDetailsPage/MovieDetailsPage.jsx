import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useParams, useLocation, Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
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
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
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
              <Link to={backLink.current}>⬅ Go Back</Link>
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
    </>
  );
};

export default MovieDetailsPage;
