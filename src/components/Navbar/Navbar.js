import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navStyle= {
}
const Navbar = props =>

  <nav style={navStyle} className="navbar navbar-default">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Slosh.io</Link>
      <ul className="nav navbar-nav pull-right">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/Food"
              ? "active"
              : ""
          }
        >
          <Link to="/">Food</Link>
        </li>
        <li className={window.location.pathname === "/Wine" ? "active" : ""}>
          <Link to="/Wine">Wine</Link>
        </li>
      </ul>
    </div>
  </nav>;

export default Navbar;
