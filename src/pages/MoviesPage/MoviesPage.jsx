import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesPage } from "../../components/API/API";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, Form } from "formik";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    async function fetchSearchMovie() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await getMoviesPage(query);
        setMovies(response.results);
        if (response.total_results === 0) {
          message();
        }
      } catch (error) {
        console.log("error: ", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSearchMovie();
  }, [query]);

  const handleSubmit = (value) => {
    if (!value.query.trim()) return notify();
    if (query === value.query) return;
    setSearchParams({ query: value.query });
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
