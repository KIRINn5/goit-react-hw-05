import axios from "axios";

const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDc0OGRiNTVhMThjN2QxNzg1ODkzOTE0YjY1OWViNCIsInN1YiI6IjY2MGVlN2I4NWFhZGM0MDE0OTYzNTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EwV41cGxMc2HGH9eWewv2gmR2sjoGuKP7LPcQkG3QtM";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export const fetchHomePage = async () => {
  const response = await instance.get("/trending/movie/day?language=en-US");
  return response.data;
};

export const getMoviesPage = async (query) => {
  const response = await instance.get(`/search/movie?query=${query}`);
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await instance.get(`/movie/${id}`);
  return response.data;
};

export const getMovieReviews = async (id) => {
  const response = await instance.get(`/movie/${id}/reviews`);
  return response.data;
};

export const getMovieCast = async (id) => {
  const response = await instance.get(`/movie/${id}/credits`);
  return response.data;
};
