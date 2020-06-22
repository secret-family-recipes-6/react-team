import React from 'react';

import axios from'axios';

    //you know
// import * as Yup from 'yup';

const initialFormValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    tos: false,
  };

  const initialFormErrors = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    tos: false,
  };

export default function SignUpForm() {
    
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    const onInputChange = evt => {
    
        const { name, value } = evt.target
    
            // For Validation later
        // Yup
        //   .reach(formSchema, name)
    
        //   .validate(value)
    
        //   .then(() => {
        //     setFormErrors({
        //       ...formErrors,
        //       [name]: ""
        //     })
        //   })
        //   .catch(err => {
        //     setFormErrors({
        //       ...formErrors,
        //       [name]: err.errors[0]
        //     })
        //   })
    
        // setFormValues({
        //   ...formValues,
        //   [name]: value
        // })
      };

    const onCheckboxChange = evt => {
        setFormValues({
          ...formValues,
          tos: !formValues.tos
        })
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
      

    // Same thing as for the post request
//   const onSubmit = evt => {
//     evt.preventDefault();

//     const newUser = {
//       first_name: formValues.first_name.trim(),
//       last_name: formValues.last_name.trim(),
//       username: formValues.username.trim(),
//       email: formValues.email.trim(),
//       password: formValues.password,
//       tos: formValues.tos,
//     };

//     setUsers(props => [newUser, ...props]);

//     setFormValues(initialFormValues);

//     postUsers(newUser);
//   };

      // This is to refresh the formValues for validation later
//   useEffect(() => {

//     formSchema.isValid(formValues).then(props => {
//       setDisabled(!props)
//     })
//   }, [formValues]);



  return (
    <div className="form-container">
        {/* <div className='errors'>
            <div>{formErrors.first_name}</div>
            <div>{formErrors.last_name}</div>
            <div>{formErrors.username}</div>
            <div>{formErrors.email}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.tos}</div>
        </div> */}
        <div className='form-input'>
            <h3>Sign Up</h3>
            <label> First Name
                <input name='first_name' type='text' value={formValues.first_name} onChange={onInputChange} maxLength='40'/>
            </label>
            <label> Last Name
                <input name='last_name' type='text' value={formValues.last_name} onChange={onInputChange} maxLength='40'/>
            </label>
            <label> Username
                <input name='username' type='text' value={formValues.username} onChange={onInputChange} maxLength='20'></input>
            </label>
            <label> Email
                <input name='email' type='text' value={formValues.email} onChange={onInputChange}/>
            </label>
            <label> Password
                <input name='password' type='password' value={formValues.password} onChange={onInputChange}/>
            </label>
            <label> Terms of Service
                <input name='tos' type='checkbox' checked={formValues.tos} onChange={onCheckboxChange}/>
            </label>
            <button onClick={onSubmit} disabled={disabled}>Submit</button>
        </div>
    </div>
);
}
