import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../components/MovieApi";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { MdArrowBack } from "react-icons/md";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");

  console.log(backLinkRef);

  useEffect(() => {
    const detailsMovie = async () => {
      const details = await fetchMovieDetails(movieId);
      setMovie(details);
    };
    detailsMovie();
  }, [movieId]);

  const formatScore = (score) => {
    return `${score}%`;
  };

  console.log(location);

  return (
    <div>
      <NavLink to={backLinkRef.current} className={css.btnBack}>
        <MdArrowBack />
        Go back
      </NavLink>
      {movie && (
        <div className={css.container}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width="250"
          />
          <div className={css.list}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.score}>
              User Score: {formatScore(movie.vote_average)}
            </p>
            <p className={css.overview}>{movie.overview}</p>
            <p className={css.genres}>
              <span>Genres</span>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      )}

      {movie && (
        <div className={css.info}>
          <h4 className={css.titleInfo}>Additional information</h4>
          <ul className={css.listInfo}>
            <li>
              <NavLink to={`/movies/${movieId}/cast`} className={css.itemInfo}>
                Movie Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/movies/${movieId}/reviews`}
                className={css.itemInfo}
              >
                Movie Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
