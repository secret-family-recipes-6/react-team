import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

import axios from 'axios';

//Form Validation
import * as Yup from 'yup';
import signInFormSchema from './YupValidation/signInFormSchema';

const initialFormValues = {
  username: '',
  password: '',
};

const initialFormErrors = {
  username: '',
  password: '',
};

export default function SignUpForm() {
  const { getRecipes, setAuth } = useContext(RecipesContext);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  let history = useHistory();

  const onInputChange = (evt) => {
    const { name, value } = evt.target;

    Yup.reach(signInFormSchema, name)

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

  const signInUser = (user) => {
    axios
      .post('https://secret-family-recipes-6.herokuapp.com/auth/login', user)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        setAuth(true);
        getRecipes();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const user = {
      username: formValues.username.trim(),
      password: formValues.password,
    };

    signInUser(user);
  };

  const toSignUp = (evt) => {
    evt.preventDefault();

    history.push('/signup');
  };

  // This is to refresh the formValues for validation later
  useEffect(() => {
    signInFormSchema.isValid(formValues).then((props) => {
      setDisabled(!props);
    });
  }, [formValues]);

  return (
    <div className="form-container">
      <div className="errors">
        <div>{formErrors.username}</div>
        <div>{formErrors.password}</div>
      </div>
      <div className="form-input">
        <h3>Sign In</h3>
        <label>
          {' '}
          Username
          <input
            name="username"
            type="text"
            value={formValues.username}
            onChange={onInputChange}
            maxLength="20"
          ></input>
        </label>
        <label>
          {' '}
          Password
          <input
            name="password"
            type="password"
            value={formValues.password}
            onChange={onInputChange}
          />
        </label>
        <button onClick={onSubmit} disabled={disabled}>Sign In</button>
      </div>
      <p>New Here? Click to Register</p>
      <button onClick={toSignUp}>Register Here</button>
    </div>
  );
}
