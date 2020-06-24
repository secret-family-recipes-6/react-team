import React, { useContext } from 'react';
import Recipe from './Recipe';
import SearchBar from './SearchBar';
import './RecipeList.css';
import { RecipesContext } from '../contexts/RecipesContext';
import { useHistory } from 'react-router-dom';

export default function RecipeList() {
  const { recipes } = useContext(RecipesContext);
  const history = useHistory();
  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      <button onClick={() => history.push('/add-recipe')}>
        Add a New Recipe
      </button>
      <SearchBar />
      <div className="all-cards">
        {recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              category={recipe.category}
              recipe_img={recipe.recipe_img}
              title={recipe.title}
              id={recipe.id}
            />
          );
        })}
      </div>
    </div>
  );
}
