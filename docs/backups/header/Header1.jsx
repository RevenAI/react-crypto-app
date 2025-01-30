import { useState } from "react";
import NavMenus from "./NavMenus";
import signInIcon from "../../src/assets/sign-in-icon.svg";
import { Link } from  "react-router-dom";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
       <Link to="/" aria-label="Go to homepage"> 
        <div className="logo">
          <div className="logo-icon"></div> 
          <span className="logo-crypto">Crypto</span>
          <span className="logo-riches">Riches</span>
        </div>
       </Link> 

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? (
            <span>&#10005; </span>  // "X" icon for closing the menu
          ) : (
            <span>&#9776; </span>  // Hamburger icon for opening the menu
          )}
        </div>

        {/* Navigation Menu to be dynamically shown for small screen */}
        <NavMenus isOpen={isMenuOpen} toggleMenu={toggleMenu} />

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

    
       {/*  <div className="currency-selector">
          <select>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
        </div> */}

      </div>
    </header>
  );
};

export default Header;

