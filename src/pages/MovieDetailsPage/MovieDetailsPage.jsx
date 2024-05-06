import { useState, useEffect, Suspense, lazy } from "react";
import { useParams, useLocation, Link, Routes, Route } from "react-router-dom";
import { getMovieDetails } from "../../API/API";
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
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await getMovieDetails(movieId);
        setMovieDetails(() => response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  return (
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
                {movieDetails.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={css.moviedetails}>
            <h4>Additional Information</h4>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </Suspense>
          </div>
        </>
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </>
  );
};

export default MovieDetailsPage;
