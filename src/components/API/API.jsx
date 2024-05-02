import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    // eslint-disable-next-line no-undef
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

instance
  .get("/trending/movie/day?language=en-US")
  .then((response) => {})
  .catch((error) => {});
