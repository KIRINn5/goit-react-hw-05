import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MovieSearch.module.css";
import { API_READ_ACCESS_TOKEN } from "../../components/API/API";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie`;
      const params = {
        api_key: API_READ_ACCESS_TOKEN,
        include_adult: false,
        language: "en-US",
        page: 1,
        query: query,
      };
      const response = await axios.get(url, {
        params,
        headers: { Authorization: `${API_READ_ACCESS_TOKEN}` },
      });
      setSearchResults(response.data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.moviesearch}>
      <h1></h1>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter movie title"
        />
        <button onClick={handleSearch} type="submit" className={styles.button}>
          Search
        </button>
      </div>
      {error && <div>Error:{error}</div>}
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MovieSearch;
