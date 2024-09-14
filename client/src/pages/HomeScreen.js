import React from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to the App!</h1>
      <Link to="/register" className="button">Register</Link>
      <Link to="/login" className="button">Login</Link>
    </div>
  );
};

export default HomeScreen;