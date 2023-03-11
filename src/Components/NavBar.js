import React, { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Brand from '../images/logo.png'
const NavBar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand p-0">
            <span className="ml-2 align-middle brand1">AlihsanCards</span>
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#MainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="MainNav">
            <img src={Brand} alt="" className="img-fluid ml-auto" width="8%" />
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${window.location.pathname === "/" ? 'active1' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employees" className={`nav-link ${window.location.pathname === '/employees' ? 'active1' : ''}`}>
                  Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cards" className={`nav-link ${window.location.pathname === '/cards' ? 'active1' : ''}`}>
                  Cards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};
export default NavBar;
