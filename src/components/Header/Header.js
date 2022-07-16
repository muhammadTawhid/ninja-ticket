import "./Header.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Header = () => {
  const [signedInUser, setSignedInUser] = useContext(userContext);
  const signOut = () => {
    setSignedInUser("");
    localStorage.removeItem("newLoggedInUser")
  };
  return (
    <div>
      <nav className="container navbar navbar-expand-lg navbar-light bg-none">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            <h2>
              <b>Ninja Ticket<span className="title-dot">.</span></b>
            </h2>
          </Link>
          <button
            style={{ border: "1px solid white" }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-ico">
              <FontAwesomeIcon style={{ color: "white" }} icon={['fas', 'bars']} />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav nav-items">
              <Link
                to="/"
                className="nav-link active nav-item"
                aria-current="page"
              >
                Home
              </Link>
              <Link to="/destination/1" className="nav-link nav-item">
                Destination
              </Link>
              <Link to="/contact" className="nav-link nav-item">
                Contact
              </Link>
              {signedInUser.email ? (
                <p className="nav-link nav-item">{signedInUser.name}</p>
              ) : (
                <Link to="/login" className="nav-link nav-item" id="nav-login">
                  Login
                </Link>
              )}
              {signedInUser.email && (
                <Link onClick={signOut} className="nav-link nav-signOut">
                  Sign Out
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
