import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Forms.css';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { RecipesContext } from '../contexts/RecipesContext';
import * as Yup from 'yup';
import addRecipeFormSchema from './YupValidation/addRecipeFormSchema';

const initialFormValues = {
  title: '',
  source: '',
  category: '',
  recipe_img: '',
  ingredients: '',
  instructions: '',
};

export default function AddRecipeForm() {
  const { getRecipes } = useContext(RecipesContext);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  
  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    
    Yup.reach(addRecipeFormSchema, name)

      .validate(value)

      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    axiosWithAuth()
      .post(`/recipes`, formValues)
      .then((res) => {
        getRecipes();
        history.push(`/recipes/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    addRecipeFormSchema.isValid(formValues).then((props) => {
      setDisabled(!props);
    });
  }, [formValues]);

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

      <button onClick={onSubmit} disabled={disabled}>Submit</button>
    </form>
  );
}
