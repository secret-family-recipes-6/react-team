import React, {useState} from 'react';

import axios from'axios';

    //you know
// import * as Yup from 'yup';

const initialFormValues = {
    username: '',
    password: '',
  };

  const initialFormErrors = {
    username: '',
    password: '',

  };

export default function SignUpForm() {
    
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    const onInputChange = evt => {
    
        const { name, value } = evt.target
      };


      // This is my generic post request, not sure how I'll be using it yet, or if it's for you.
    // const postUsers = newUser => {
    //     axios.post('', newUser)
    //       .then(response => {
    //         setUsers([response.data, ...users]);
    //         debugger
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //       .finally(() => {
    //         setFormValues(initialFormValues);
    //       })
    //   };
      


  return (
    <div className="form-container">
        <div className='form-input'>
            <h3>Sign In</h3>
            <label> Username
                <input name='username' type='text' value={formValues.username} onChange={onInputChange} maxLength='20'></input>
            </label>
            <label> Password
                <input name='password' type='password' value={formValues.password} onChange={onInputChange}/>
            </label>
            <button onClick={onSubmit}>Sign In</button>
        </div>
    </div>
);
}
