import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearch from "../../components/MovieSearch/MovieSearch";
import { API_READ_ACCESS_TOKEN } from "../../components/API/API";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/discover/movie`;
        const params = {
          api_key: "API_READ_ACCESS_TOKEN",
          language: "en-US",
          sort_by: "popularity.desc",
          include_adult: false,
          page: 1,
        };
        const response = await axios.get(url, {
          params,
          headers: { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <h1>Movies</h1>
      {error && <div>Error: {error}</div>}
      <MovieSearch apiKey={API_READ_ACCESS_TOKEN} />
      <MovieList movies={movies} />
    </div>
  );
};
export default MoviesPage;
