import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useParams, useLocation, Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const prevLocation = useRef(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/");
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDc0OGRiNTVhMThjN2QxNzg1ODkzOTE0YjY1OWViNCIsInN1YiI6IjY2MGVlN2I4NWFhZGM0MDE0OTYzNTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EwV41cGxMc2HGH9eWewv2gmR2sjoGuKP7LPcQkG3QtM";

  const fetchMovieData = async (url, setDataCallback) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}?api_key=${apiKey}`);
      setDataCallback(response.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    prevLocation.current = location.state;
    fetchMovieData(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      setMovieDetails
    );
    fetchMovieData(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
      setReviews
    );
    fetchMovieData(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      setCast
    );
  }, [movieId, location, apiKey]);

  return (
    <>
      <div>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && (
          <>
            {movieDetails && (
              <>
                <Link to={backLink.current}>⬅ Go Back</Link>
                <h1>{movieDetails.original_title}</h1>
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
              </>
            )}
          </>
        )}
      </div>
      <div className={css.moviedetails}>
        <h4>Additional Information</h4>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path={`${location.pathname}/cast`}
              element={<MovieCast cast={cast} />}
            />
            <Route
              path={`${location.pathname}/reviews`}
              element={<MovieReviews reviews={reviews} />}
            />
          </Routes>
        </Suspense>
        <Link to={`${location.pathname}/cast`}>Cast</Link>
        <Link to={`${location.pathname}/reviews`}>Reviews</Link>
      </div>
    </>
  );
};

export default MovieDetailsPage;
