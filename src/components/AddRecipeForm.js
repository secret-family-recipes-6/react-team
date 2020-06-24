import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Forms.css';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialFormValues = {
  title: '',
  source: '',
  category: '',
  recipe_img: '',
  ingredients: '',
  instructions: '',
};

export default function AddRecipeForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();
  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    axiosWithAuth()
      .post(`/recipes`, formValues)
      .then((res) => {
        console.log('new recipe submitted', res.data);
        history.push(`/recipes/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onSubmit} className="update">
      <h2>Add a New Recipe</h2>

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
        Image URL:&nbsp;
        <input
          type="text"
          name="recipe_img"
          placeholder="..."
          maxLength="100"
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
