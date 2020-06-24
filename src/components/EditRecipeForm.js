import React, { useContext, useState, useEffect } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import * as Yup from 'yup';
import editRecipeFormSchema from './YupValidation/editRecipeFormSchema';

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
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  const [formValues, setFormValues] = useState({ ...currentRecipe });
  const history = useHistory();
  const { id } = useParams();

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    Yup.reach(editRecipeFormSchema, name)

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
    axiosWithAuth()
      .put(`/recipes/${id}`, formValues)
      .then((res) => {
        history.push(`/recipes/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    editRecipeFormSchema.isValid(formValues).then((props) => {
      setDisabled(!props);
    });
  }, [formValues]);

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

      <button onClick={onSubmit} disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
