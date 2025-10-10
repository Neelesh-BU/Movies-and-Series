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
        showSnackbar("Please wait for Loading...");
      }
    };

    // Call once immediately
    fetchMovies();

    // Then call every 30 seconds
    const interval = setInterval(fetchMovies, 20000);

    // Loader logic (same as before)
    const hasReload = localStorage.getItem("autoReloadDone");
    const checkLoaderTimeout = setTimeout(() => {
      if (movies.length === 0 && !hasReload) {
        showSnackbar("Please wait for Loading...");
        setTimeout(() => {
          localStorage.setItem("autoReloadDone", "true");
          window.location.reload();
        }, 10000);
      }
    }, 5000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(checkLoaderTimeout);
    };
  }, []);

  const groupMoviesByLanguageAndType = (movies) => {
    const grouped = {};

    movies.forEach((movie) => {
      const key = `${movie.language} - ${movie.type}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(movie);
    });

    return grouped;
  };

  const groupedMovies = groupMoviesByLanguageAndType(movies);

  return (
    <div className="home">
      {/* Language Sections */}
      {Object.entries(groupedMovies).map(([langType, movies]) => (
        <div key={langType} className="language-section">
          <h2 className="home-title">{langType}</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
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
            ))}
          </div>
        </div>
      ))}

      {/* Loader */}
      {movies.length === 0 && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
