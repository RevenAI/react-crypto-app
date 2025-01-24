import { useState } from "react";
import NavMenus from "./NavMenus";
import signInIcon from "../../assets/sign-in-icon.svg";
import { Link, useParams } from  "react-router-dom";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { userID } = useParams();
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
        <li><Link className="navbar-item-large" to="/">Home</Link></li>
        <li><Link className="navbar-item-large" to={`/profile/${userID}`}>Profile</Link></li>
        <li><Link className="navbar-item-large" to="/features">Features</Link></li>
        <li><Link className="navbar-item-large" to="/about">About</Link></li>
        <li><Link className="navbar-item-large" to="/pricing">Pricing</Link></li>

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

export default Header;

