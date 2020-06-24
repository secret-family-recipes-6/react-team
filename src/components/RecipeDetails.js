import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import './RecipeList.css';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export default function RecipeDetails() {
  const { getRecipe, currentRecipe, setCurrentRecipe, getRecipes } = useContext(
    RecipesContext
  );
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    getRecipe(params.id);
  }, [params.id]);

  const deleteRecipe = (id) => {
    axiosWithAuth()
      .delete(`/recipes/${id}`)
      .then((res) => {
        getRecipes();
        console.log('deleted', id);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="recipe-details">
      <div className="title-bar">
        <h2
          onClick={() => {
            history.push('/');
            setCurrentRecipe({});
          }}
        >
          ←
        </h2>
        <h2>{currentRecipe.title}</h2>
      </div>
      <div className="recipe-content">
        <div className="left-column-card">
          <img src={currentRecipe.recipe_img} alt={currentRecipe.title} />
          <h3>Ingredients:</h3> <p>{currentRecipe.ingredients}</p>
        </div>
        <div className="right-column-card">
          <div className="card-subtitle">
            <h3>
              A {currentRecipe.category} dish by {currentRecipe.source}
            </h3>
          </div>
          <div className="instructions">
            <h3>Instructions:</h3> <p>{currentRecipe.instructions}</p>
            <div className="buttons">
              <button>Edit Recipe</button>
              <button onClick={() => deleteRecipe(params.id)}>
                Delete Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
