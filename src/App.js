import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <RecipeList />
    </div>
  );
}

export default App;
