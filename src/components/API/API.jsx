import axios from "axios";
import { API_READ_ACCESS_TOKEN } from "./API";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export const fetchHomePage = async () => {
  try {
    const response = await instance.get("/trending/movie/day?language=en-US");
    return response.data;
  } catch (error) {
    console.error("Error fetching homepage:", error);
    throw error;
  }
};

export const getMoviesPage = async (query) => {
  try {
    const response = await instance.get(`/search/movie?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies page:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await instance.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieReviews = async (id) => {
  try {
    const response = await instance.get(`/movie/${id}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export const getMovieCast = async (id) => {
  try {
    const response = await instance.get(`/movie/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};
