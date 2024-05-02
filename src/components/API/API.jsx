import { API_READ_ACCESS_TOKEN } from "./API";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

instance
  .get("/trending/movie/day?language=en-US")
  .then((response) => {})
  .catch((error) => {});
