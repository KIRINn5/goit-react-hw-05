/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { searchMovies } from "../components/MovieApi";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const queryParam = searchParams.get("query");
        const results = await searchMovies(queryParam);
        if (results.length === 0) {
          setError("No movies found for the given query.");
        } else {
          setMovies(results);
          setError(null);
        }
      } catch (error) {
        console.error("Error searching movies:", error);
        setError("An error occurred while searching for movies.");
      }
    };

    if (searchParams.has("query")) {
      fetchMovies();
    }
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    setSearchParams({ query });
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={searchParams.get("query") || ""}
          placeholder="Search for a movie..."
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>

      {error && <p className={css.error}>{error}</p>}

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
