import React, { useContext } from 'react';
import Recipe from './Recipe';
import SearchBar from './SearchBar';
import './RecipeList.css';
import { RecipesContext } from '../contexts/RecipesContext';

export default function RecipeList() {
  const { recipes } = useContext(RecipesContext);
  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      <SearchBar />
      <div className="all-cards">
        {/* map through the recipe data, imported via context */}
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
      </div>
    </div>
  );
}
