import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt='logo'/>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/login" className="navbar-link">
            Sign In
          </Link>
          <Link to="/register" className="navbar-link">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
