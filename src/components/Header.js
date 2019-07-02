import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import avatar from "./avatar.png";

const Header = () => {
  const authToken = localStorage.getItem("token");
  return (
    <Fragment>
      <header className="fixed-top">
        <div className="header">
          {authToken ? (
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar" />
            </Link>
          ) : (
            <Link to="/signin">
              <img src={avatar} alt="avatar" className="avatar" />
            </Link>
          )}
          <Link to="/">
            <div className="app-title">
              <img src={logo} alt="logo" className="logo" />
            </div>
          </Link>
          {authToken ? (
            <Link to="/create">
              <i className="fas fa-camera" />
            </Link>
          ) : (
            <Link to="/signin">
              <i className="fas fa-camera" />
            </Link>
          )}
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
