import "./Home.scss";
import { useEffect, useState, useRef } from "react";
import { useSnackbarAndLoader } from "../../components/Snackbar/SnackbarAndLoaderProvider.jsx";
import { getMovies } from "../../api/services/movieService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const { showSnackbar } = useSnackbarAndLoader();
  const [moviesGrouped, setMoviesGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const retryTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getMovies();
        const moviesData = response?.data?.data;

        if (moviesData && Array.isArray(moviesData)) {
          const grouped = moviesData.reduce((acc, movie) => {
            const langs = Array.isArray(movie.languages)
              ? movie.languages
              : [movie.language || "Unknown"];
            const type = movie.category || "Unknown";

            langs.forEach((lang) => {
              const key = `${lang} - ${type}`;
              if (!acc[key]) acc[key] = [];
              acc[key].push(movie);
            });

            return acc;
          }, {});

          setMoviesGrouped(grouped);
          showSnackbar("Hi!! friend👋, Enjoy your visit!", "success");
          setLoading(false);
        } else {
          showSnackbar("Loading Please Wait...", "success");
          retryFetch();
        }
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
        showSnackbar("Loading Please Wait...", "success");
        retryFetch();
      }
    };

    const retryFetch = () => {
      retryTimeoutRef.current = setTimeout(() => {
        fetchMovies();
      }, 2000);
    };

    fetchMovies();

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
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
        <div className="loader-container">
          <div className="loader"></div>
        </div>
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
                      <LazyLoadImage
                        alt={movie.title}
                        src={`/Images/Posters/${movie.title}.jpg`}
                        effect="blur"
                        className="movie-poster"
                        onError={(e) => (e.target.src = "/images/placeholder.jpg")}
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
