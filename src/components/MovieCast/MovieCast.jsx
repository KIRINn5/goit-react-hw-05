import styles from "./MovieCast.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const apiKey = "54748db55a18c7d1785893914b659eb4";
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(url);
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error.message);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.cast.list}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <div className={styles.actor}>
              <img
                className={styles.actorImage}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <div className={styles.actorInfo}>
                <h3>{actor.name}</h3>
                <p>Character: {actor.character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
