import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function Recipe(props) {
  const { category, recipe_img, title, id } = props;
  const { toRecipeDetails } = useContext(RecipesContext);
  return (
    <div className="recipe-card" onClick={() => toRecipeDetails(id)}>
      <div className="recipe-card-img">
        <img src={recipe_img} alt={title} />
      </div>
      <div className="recipe-card-text">
        <h3>{title}</h3>
        <h4>{category}</h4>
      </div>
    </div>
  );
}
