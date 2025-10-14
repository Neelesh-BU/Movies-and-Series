import "./Home.scss";
import { useEffect, useState } from "react";
import { useSnackbarAndLoader } from "../../components/Snackbar/SnackbarAndLoaderProvider.jsx";
import { getMovies } from "../../api/services/movieService";

const Home = () => {
  const { showSnackbar } = useSnackbarAndLoader();
  const [moviesGrouped, setMoviesGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await getMovies();
        const moviesData =
          response?.data?.data ||
          response?.data?.movies ||
          response?.data ||
          response;

        if (moviesData && Array.isArray(moviesData)) {
          // Group by language + type combination
          const grouped = moviesData.reduce((acc, movie) => {
            const langs = Array.isArray(movie.languages)
              ? movie.languages
              : [movie.language || "Unknown"];
            const type = movie.type || "Unknown";

            langs.forEach((lang) => {
              const key = `${lang} - ${type}`;
              if (!acc[key]) acc[key] = [];
              acc[key].push(movie);
            });

            return acc;
          }, {});
          setMoviesGrouped(grouped);
        } else {
          showSnackbar("No movies found", "warning");
        }
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
        showSnackbar("Failed to load movies", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [showSnackbar]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {Object.keys(moviesGrouped).length === 0 ? (
        <p>No movies found</p>
      ) : (
        Object.keys(moviesGrouped)
          .sort((a, b) => a.localeCompare(b))
          .map((group) => (
            <div key={group} className="language-section">
              <h2 className="home-title">{group}</h2>
              <div className="movie-grid">
                {moviesGrouped[group]
                  .slice()
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <img
                        src={`/Images/Posters/${movie.title}.jpg`}
                        alt={movie.title}
                        className="movie-poster"
                        onError={(e) =>
                          (e.target.src = "/images/placeholder.jpg")
                        }
                      />
                      <div className="movie-info">
                        <div className="movie-title">{movie.title}</div>
                        <button
                          className="watch-btn"
                          onClick={() =>
                            window.open(movie.downloadLink, "_blank")
                          }
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Home;
