import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={`/images/logo.png`} alt="Logo" className="logo" />
        <Link to="/" className="app-name">Rang Rez</Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
