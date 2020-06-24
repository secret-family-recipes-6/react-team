import React, { useContext, useState, useEffect } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialFormValues = {
  title: '',
  source: '',
  category: '',
  recipe_img: '',
  ingredients: '',
  instructions: '',
};

export default function EditRecipeForm() {
  const { currentRecipe } = useContext(RecipesContext);
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();
  const { id } = useParams();

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(
    (currentRecipe) => {
      setFormValues({ ...currentRecipe });
    },
    [id]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    // axiosWithAuth()
    //   .put(`/recipes/${id}`, formValues)
    //   .then((res) => {
    //     console.log('edit submitted');
    //     history.push(`/recipes/${id}`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <form onSubmit={onSubmit} className="update">
      <h2>Update {currentRecipe.title}</h2>

      <label>
        Title:&nbsp;
        <input
          type="text"
          placeholder="..."
          maxLength="50"
          name="title"
          value={formValues.title}
          onChange={onInputChange}
        />
      </label>

      <label>
        Source:&nbsp;
        <input
          type="text"
          name="source"
          placeholder="..."
          maxLength="50"
          value={formValues.source}
          onChange={onInputChange}
        />
      </label>

      <label>
        Category:&nbsp;
        <input
          type="text"
          name="category"
          placeholder="..."
          maxLength="50"
          value={formValues.category}
          onChange={onInputChange}
        />
      </label>

      <label>
        Image:&nbsp;
        <input
          type="text"
          name="recipe_img"
          placeholder="..."
          value={formValues.recipe_img}
          onChange={onInputChange}
        />
      </label>

      <label>
        Ingredients:&nbsp;
        <input
          type="text"
          name="ingredients"
          placeholder="..."
          value={formValues.ingredients}
          onChange={onInputChange}
        />
      </label>

      <label>
        Instructions:&nbsp;
        <input
          type="text"
          name="instructions"
          placeholder="..."
          value={formValues.instructions}
          onChange={onInputChange}
        />
      </label>

      <button>Submit</button>
    </form>
  );
}
