import React, { useState, useEffect, useContext } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

export default function NavBar() {
  const [status, setStatus] = useState(false);
  const { auth, setAuth } = useContext(RecipesContext);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [auth]);

  return (
    <header className="nav-bar">
      <h2>🍝 Secret Family Recipes</h2>
      <div className="nav-links">
        <Link to="/">Recipes</Link>
        {!status ? (
          <Link to="/signin">Sign In</Link>
        ) : (
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem('token');
              setAuth(false);
            }}
          >
            Sign Out
          </Link>
        )}
      </div>
    </header>
  );
}
