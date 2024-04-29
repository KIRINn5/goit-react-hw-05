/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

// eslint-disable-next-line react/prop-types
const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <NavLink
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.link}
          >
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
