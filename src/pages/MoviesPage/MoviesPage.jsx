/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast("This field cannot be empty. Please enter a search query", {
    duration: 4000,
    position: "top-left",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const message = () =>
  toast("There are no movies. Please enter another request", {
    duration: 4000,
    position: "top-left",
    style: {
      borderRadius: "10px",
      background: "#387ce1",
      color: "#fff",
    },
  });

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const { query } = values;
    if (!query.trim()) {
      notify();
      return;
    }
    try {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/search/movie`;
      const params = {
        // eslint-disable-next-line no-undef
        api_key: API_READ_ACCESS_TOKEN,
        include_adult: false,
        language: "en-US",
        page: 1,
        query: query,
      };
      const response = await axios.get(url, { params });
      setMovies(response.data.results);
      if (response.data.results.length === 0) {
        message();
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Error fetching movies");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form>
          <label>
            <Field
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search movie..."
            />
          </label>
          <button type="submit">Search</button>
          <Toaster />
        </Form>
      </Formik>
      {loading ? <div>Loading...</div> : <MovieList movies={movies} />}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default MoviesPage;
