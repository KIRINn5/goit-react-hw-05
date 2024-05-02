import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import styles from "./HomePage.module.css";

// eslint-disable-next-line react/prop-types
const HomePage = ({ apiKey }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const url = "https://api.themoviedb.org/3/trending/movie/day";
        const params = {
          api_key: "8aba4e3419a44727b7eb66f35fce4fa2",
          include_adult: false,
          language: "en-US",
          page: 1,
        };
        const response = await axios.get(url, { params });
        setTrendingMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTrendingMovies();
  }, [apiKey]);
  return (
    <div className={styles.homepage}>
      <h1>Trending Today</h1>
      {error && <div>Error:{error}</div>}
      <MovieList movies={trendingMovies} />
    </div>
  );
};
export default HomePage;
