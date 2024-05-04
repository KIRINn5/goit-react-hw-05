import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/discover/movie`;
        const params = {
          api_key:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDc0OGRiNTVhMThjN2QxNzg1ODkzOTE0YjY1OWViNCIsInN1YiI6IjY2MGVlN2I4NWFhZGM0MDE0OTYzNTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EwV41cGxMc2HGH9eWewv2gmR2sjoGuKP7LPcQkG3QtM",
          language: "en-US",
          sort_by: "popularity.desc",
          include_adult: false,
          page: 1,
        };

        const response = await axios.get(url, { params });
        setMovies(response.data.results);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (values) => {
    const { query } = values;
    if (!query.trim()) {
      toast.error("This field cannot be empty. Please enter a search query", {
        duration: 4000,
        position: "top-left",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    try {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/search/movie`;
      const params = {
        api_key:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDc0OGRiNTVhMThjN2QxNzg1ODkzOTE0YjY1OWViNCIsInN1YiI6IjY2MGVlN2I4NWFhZGM0MDE0OTYzNTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EwV41cGxMc2HGH9eWewv2gmR2sjoGuKP7LPcQkG3QtM",
        include_adult: false,
        language: "en-US",
        page: 1,
        query: query,
      };
      const response = await axios.get(url, { params });
      setMovies(response.data.results);
      if (response.data.results.length === 0) {
        toast.error("There are no movies. Please enter another request", {
          duration: 4000,
          position: "top-left",
          style: {
            borderRadius: "10px",
            background: "#387ce1",
            color: "#fff",
          },
        });
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
