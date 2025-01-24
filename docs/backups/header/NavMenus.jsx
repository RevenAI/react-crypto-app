import PropTypes from 'prop-types';
import signInIcon from "../../src/assets/sign-in-icon.svg";

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

export default NavMenus;

