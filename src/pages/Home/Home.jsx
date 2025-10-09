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

    fetchMovies();

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

    return () => clearTimeout(checkLoaderTimeout);
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
