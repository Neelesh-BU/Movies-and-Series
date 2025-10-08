import "./Home.scss";
import { useEffect, useState } from "react";
import { useSnackbarAndLoader } from "../../components/Snackbar/SnackbarAndLoaderProvider.jsx";

import { getMovies } from "../../api/services/movieService";

const Home = () => {
  const { showSnackbar } = useSnackbarAndLoader();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getMovies();
      if (result.success) {
        setMovies(result.data.data);
      } else {
        showSnackbar(
          "Fetching Movies & Series",
          result.message || "Failed to fetch movies"
        );
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <h2 className="home-title">Featured Movies & Series</h2>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`/Images/Posters/${movie.title}.jpg`}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => (e.target.src = "/images/placeholder.jpg")}
              />

              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>

                <button
                  className="watch-btn"
                  onClick={() => window.open(movie.downloadLink, "_blank")}
                >
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
