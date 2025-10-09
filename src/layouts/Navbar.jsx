import { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`App-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container">
        {/* Logo */}
        <img src="/Images/Logo.png" alt="Logo" className="logo-icon" />
      </nav>
    </header>
  );
}

export default Navbar;
