/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const url = `https://api.themoviedb.org/3/discover/movie`;
        const params = {
          api_key: API_READ_ACCESS_TOKEN,
          language: "en-US",
          sort_by: "popularity.desc",
          include_adult: false,
          page: 1,
        };

        if (searchParams.has("search")) {
          params.query = searchParams.get("search");
        }

        const response = await axios.get(url, { params });
        setMovies(response.data.results);
        if (response.data.total_results === 0) {
          message();
        }
      } catch (error) {
        console.log("error: ", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSubmit = (value) => {
    if (!value.query.trim()) return notify();
    if (searchTerm === value.query) return;
    setSearchParams({ search: value.query });
  };

  return (
    <>
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
      {movies && <MovieList movies={movies} />}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </>
  );
};

export default MoviesPage;
