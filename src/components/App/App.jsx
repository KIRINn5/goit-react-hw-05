// import reactLogo from '../../assets/react.svg';
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
// eslint-disable-next-line no-unused-vars
import MovieCast from "../MovieCast/MovieCast";
// eslint-disable-next-line no-unused-vars
import MovieReviews from "../MovieReviews/MovieReviews";

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
  const apiKey = "ec261201863a731c0d3b446536ab92e4";

  return (
    <div className=".container - route">
      {/* Router*/}
      <Navigation />

      {/* Navigation для Router*/}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Suspense*/}

        <Routes>
          <Route exact path="/" element={<HomePage apiKey={apiKey} />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          {/* <Route path="/movies" className="search-container">
						<Route path="reviews" element={<MoviesPage />} />
						<Route path="*" element={<Outlet />} />
						<Route
							path=":movieId"
							element={<MovieDetailsPage apiKey={apiKey} />}
						>
							<Route path="cast" element={<MovieCast />} />
							<Route path="reviews" element={<MovieReviews />} />
						</Route>
					</Route> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
