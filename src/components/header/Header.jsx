import { useEffect, useState, useRef } from "react";
import NavMenus from "./NavMenus";
import signInIcon from "../../assets/sign-in-icon.svg";
import { Link, useParams } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { userID } = useParams();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const clickOutToCloseMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", clickOutToCloseMenu);
    } else {
      document.removeEventListener("mousedown", clickOutToCloseMenu);
    }

    return () => document.removeEventListener("mousedown", clickOutToCloseMenu);
  }, [isMenuOpen]);

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
            <span>&#10005;</span> // Close icon
          ) : (
            <span>&#9776;</span> // Hamburger icon
          )}
        </div>

        {/* Conditional rendering of NavMenus for small screens */}
        {isMenuOpen && (
          <div ref={menuRef}>
            <NavMenus isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}

        <nav className="navbar-menu-large">
          <ul className="navbar-list-large">
            <li>
              <Link className="navbar-item-large" to="/">
                Home
              </Link>
            </li>
            {userID && (
              <li>
                <Link className="navbar-item-large" to={`/profile/${userID}`}>
                  Profile
                </Link>
              </li>
            )}
            <li>
              <Link className="navbar-item-large" to="/features">
                Features
              </Link>
            </li>
            <li>
              <Link className="navbar-item-large" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="navbar-item-large" to="/pricing">
                Pricing
              </Link>
            </li>

            <button className="signup-button-large" onClick={toggleMenu}>
              <h3>Sign up</h3>
              <img
                src={signInIcon}
                alt="Click to sign in."
                className="signInIcon"
              />
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

