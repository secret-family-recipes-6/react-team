import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="nav-bar">
      <h2>🍝 Secret Family Recipes</h2>
      <div className="nav-links">
        <Link to="/">Recipes</Link>
        {localStorage.getItem('infiniteScrollEnabled') === null ? (
          <Link to="/signin">Sign In</Link>
        ) : (
          <Link to="/">Sign Out</Link>
        )}
      </div>
    </header>
  );
}
