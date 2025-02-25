import PropTypes from 'prop-types';
import signInIcon from "../../assets/sign-in-icon.svg";
import { Link, useParams } from  "react-router-dom";

const NavMenus = ({ isOpen, toggleMenu }) => {
  const { userID } = useParams();
  return (
    <nav className={`navbar-menu ${isOpen ? "active" : ""}`}>
      <ul className="navbar-list">
        <li><Link className="navbar-item" to="/">Home</Link></li>
        <li><Link className="navbar-item" to={`/profile/${userID}`}>Profile</Link></li>
        <li><Link className="navbar-item" to="/features">Features</Link></li>
        <li><Link className="navbar-item" to="/about">About</Link></li>
        <li><Link className="navbar-item" to="/pricing">Pricing</Link></li>

        {/* Sign-Up Button */}
        <Link to="/sign-up">
          <button className="signup-button" onClick={toggleMenu}>
          <h3>Sign up</h3>
            <img src={signInIcon} alt="Click to sign in." className="signInIcon" />
          </button>
        </Link>
      </ul>
    </nav>
  );
};

NavMenus.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default NavMenus;

