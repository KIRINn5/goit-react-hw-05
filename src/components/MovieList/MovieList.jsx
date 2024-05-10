import styles from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div className={styles.movielist}>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: location.state,
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MovieList;
