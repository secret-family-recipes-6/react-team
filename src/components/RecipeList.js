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
      {recipes.map(recipe => {
        return (
      <Recipe key={recipe.id} category={recipe.category} recipe_img={recipe.recipe_img} source = {recipe.source} title = {recipe.title}/>
      )})};
      </div>
    </div>
  );
}
