import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Forms.css';

import axios from 'axios';

//you know
import * as Yup from 'yup';
import signUpFormSchema from './YupValidation/signUpFormSchema';

const initialFormValues = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
};

const initialFormErrors = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
};

export default function SignUpForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  let history = useHistory();

  const onInputChange = (evt) => {
    const { name, value } = evt.target;

    // For Validation later
    Yup.reach(signUpFormSchema, name)

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

  // This is my generic post request, not sure how I'll be using it yet, or if it's for you.
  const postUser = (newUser) => {
    axios
      .post(
        'https://secret-family-recipes-6.herokuapp.com/auth/register',
        newUser
      )
      .then((response) => {
        history.push('/signin');
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  // Same thing as for the post request
  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
    };

    postUser(newUser);
  };

  // This is to refresh the formValues for validation later
  useEffect(() => {
    signUpFormSchema.isValid(formValues).then((props) => {
      setDisabled(!props);
    });
  }, [formValues]);

  return (
    <form className="form-container">
      <h3>Sign Up</h3>
      <div className="form-input">
        <div className="errors">
          <div>{formErrors.first_name}</div>
          <div>{formErrors.last_name}</div>
          <div>{formErrors.username}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
        </div>
        <label>
          {' '}
          First Name
          <input
            name="first_name"
            type="text"
            value={formValues.first_name}
            onChange={onInputChange}
            maxLength="40"
          />
        </label>
        <label>
          {' '}
          Last Name
          <input
            name="last_name"
            type="text"
            value={formValues.last_name}
            onChange={onInputChange}
            maxLength="40"
          />
        </label>
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
          Email:
          <input
            name="email"
            type="text"
            value={formValues.email}
            onChange={onInputChange}
          />
        </label>
        <label>
          {' '}
          Password:
          <input
            name="password"
            type="password"
            value={formValues.password}
            onChange={onInputChange}
          />
        </label>
        <button onClick={onSubmit} disabled={disabled}>
          Submit
        </button>
      </div>
    </form>
  );
}
