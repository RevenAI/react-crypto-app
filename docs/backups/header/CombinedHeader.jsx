import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import signInIcon from "../../src/assets/sign-in-icon.svg";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <Link to="/" aria-label="Go to homepage">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-crypto">Crypto</span>
            <span className="logo-riches">Riches</span>
          </div>
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </div>

        {/* Navigation Menu for Small Screens */}
        <NavMenus isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Navigation Menu for Large Screens */}
        <nav className="navbar-menu-large">
          <ul className="navbar-list-large">
            <li><a className="navbar-item-large">Home</a></li>
            <li><a className="navbar-item-large">Profile</a></li>
            <li><a className="navbar-item-large">Features</a></li>
            <li><a className="navbar-item-large">About</a></li>
            <li><a className="navbar-item-large">Pricing</a></li>

            <button className="signup-button-large" onClick={toggleMenu}>
              <h3>Sign up</h3>
              <img src={signInIcon} alt="Click to sign in." className="signInIcon" />
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const NavMenus = ({ isOpen, toggleMenu }) => {
  return (
    <nav className={`navbar-menu ${isOpen ? "active" : ""}`}>
      <ul className="navbar-list">
        <li><a className="navbar-item">Home</a></li>
        <li><a className="navbar-item">Profile</a></li>
        <li><a className="navbar-item">Features</a></li>
        <li><a className="navbar-item">About</a></li>
        <li><a className="navbar-item">Pricing</a></li>

        {/* Sign-Up Button */}
        <button className="signup-button" onClick={toggleMenu}>
          <h3>Sign up</h3>
          <img src={signInIcon} alt="Click to sign in." className="signInIcon" />
        </button>
      </ul>
    </nav>
  );
};

NavMenus.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Header;

