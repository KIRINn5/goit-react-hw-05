import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./App.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  return (
    <div className="container-route">
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route key="home" exact path="/" element={<HomePage />} />
          <Route key="movies" path="/movies" element={<MoviesPage />} />
          <Route
            key="movie-details"
            path="/movies/:movieId"
            element={<MovieDetailsPage />}
          />
          <Route key="not-found" path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
