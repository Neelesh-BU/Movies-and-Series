import { FiSearch } from "react-icons/fi";
import "./Navbar.scss";

function Navbar() {
  return (
    <header className="App-header">
      <nav>
        {/* Logo */}
        <img src="/Images/Logo.png" alt="Logo" className="logo-icon" />

        {/* Search Box */}
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => console.log("Searching:", e.target.value)}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
