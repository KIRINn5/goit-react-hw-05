import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearch from "../../components/MovieSearch/MovieSearch";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Деструктуризуємо результат useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/discover/movie`;
        const params = {
          api_key: "API_READ_ACCESS_TOKEN",
          language: "en-US",
          sort_by: "popularity.desc",
          include_adult: false,
          page: 1,
        };

        // Оновлюємо параметри пошуку перед викликом API
        if (searchParams.has("search")) {
          params.query = searchParams.get("search");
        }

        const response = await axios.get(url, { params });
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]); // Викликаємо ефект, коли змінюються параметри пошуку

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Встановлюємо новий параметр пошуку
    setSearchParams({ search: searchTerm });
  };

  return (
    <div>
      <h1>Movies</h1>
      {error && <div>Error: {error}</div>}
      <MovieSearch
        // eslint-disable-next-line no-undef
        apiKey={API_READ_ACCESS_TOKEN}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      {loading ? <div>Loading...</div> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
