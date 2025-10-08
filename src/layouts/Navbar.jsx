import { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState("Movies & Series");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleCategoryChange = (e) => {
  //   setSelectedCategory(e.target.value);
  // };

  return (
    <header className={`App-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container">
        {/* Logo */}
        <img src="/Images/Logo.png" alt="Logo" className="logo-icon" />

        {/* Dropdown */}
        {/* <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="Movies & Series">Movies & Series</option>
          <option value="Movies">Movies</option>
          <option value="Series">Series</option>
        </select> */}
      </nav>
    </header>
  );
}

export default Navbar;
