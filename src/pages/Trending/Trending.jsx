import React, { useState, useEffect, useRef } from "react";
import "./Trending.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DownloadIcon from "@mui/icons-material/Download";
import { getTrendingMovies } from "../../api/services/movieService";

function Trending() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const autoSlideRef = useRef(null);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let intervalId;

    const fetchTrending = async () => {
      try {
        const response = await getTrendingMovies();

        if (response?.data?.data) {
          setResponseData(response.data.data);
          setLoading(false);

          if (intervalId) clearInterval(intervalId);
        }
      } catch (error) {
        console.error("❌ Error fetching trending movies, retrying...", error);
      }
    };

    fetchTrending();
    intervalId = setInterval(fetchTrending, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    if (responseData.length === 0) return;
    resetAutoSlide();
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % responseData.length);
      setFade(false);
    }, 400);
  };

  const handlePrev = () => {
    if (responseData.length === 0) return;
    resetAutoSlide();
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + responseData.length) % responseData.length
      );
      setFade(false);
    }, 400);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearAutoSlide();
  }, [responseData]);

  const startAutoSlide = () => {
    clearAutoSlide();
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        responseData.length ? (prev + 1) % responseData.length : prev
      );
    }, 15000);
  };

  const clearAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const resetAutoSlide = () => {
    clearAutoSlide();
    startAutoSlide();
  };

  useEffect(() => {
    setShowFullDesc(false);
  }, [currentIndex]);

  if (loading) {
    return (
      <div className="home">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  const current = responseData[currentIndex];

  const formatFileName = (title = "") =>
    title.trim().toLowerCase().replace(/\s+/g, "-");

  const imagePath = current
    ? isMobile
      ? `/Images/Posters/${encodeURIComponent(current.title)}.jpg`
      : `/Images/Trending/${formatFileName(current.title)}.jpg`
    : isMobile
    ? "/Images/Posters/default.jpg"
    : "/Images/Trending/default.jpg";

  return (
    <div>
      <h2 className="trending-heading">Trending</h2>
      <section className="trending-section">
        <div
          className={`trending-bg ${fade ? "fade-out" : "fade-in"}`}
          style={{
            backgroundImage: `url(${imagePath})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="overlay"></div>

          <div className="trending-content">
            <h1 className="trending-title">{current?.title}</h1>

            <div className="buttons">
              <button
                className="trending-watch-btn"
                onClick={() => window.open(current?.downloadLink, "_blank")}
              >
                <DownloadIcon />
                <span>Download</span>
              </button>
            </div>

            {!isMobile && (
              <>
                <p className={`desc ${showFullDesc ? "expanded" : ""}`}>
                  {current?.description}
                </p>

                {current?.description?.length > 120 && (
                  <button
                    className="read-more-btn"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? "Read less" : "Read more"}
                  </button>
                )}
              </>
            )}
          </div>

          <button
            className="nav-btn left"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            className="nav-btn right"
            onClick={handleNext}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Trending;
