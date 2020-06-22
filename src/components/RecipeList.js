import React from 'react';
import Recipe from './Recipe';

export default function RecipeList() {
  return (
    <div className="recipe-list">
      <h2>Recipe List Component</h2>
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  );
}
