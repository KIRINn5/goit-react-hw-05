import { useState, useEffect, Suspense, lazy, useRef } from "react";
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
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const apiKey =
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDc0OGRiNTVhMThjN2QxNzg1ODkzOTE0YjY1OWViNCIsInN1YiI6IjY2MGVlN2I4NWFhZGM0MDE0OTYzNTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EwV41cGxMc2HGH9eWewv2gmR2sjoGuKP7LPcQkG3QtM";
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        const response = await axios.get(url);
        setMovieDetails(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

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
