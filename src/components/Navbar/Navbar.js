import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

const navStyle= {
}
const Navbar = props =>

  <nav style={navStyle} className="navbar navbar-default">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Slosh.io</Link>
    </div>
  </nav>;

export default Navbar;
