import React from 'react';

import axios from'axios';
// import * as Yup from 'yup';

const initialUser = [{
    first_name: 'fName',
    last_name: 'lName',
    username: 'username',
    email: 'email@email.com',
    password: '1234567890',
    tos: true,
  }];

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
    
    const [users, setUsers] = useState(initialUser);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    const onInputChange = evt => {
    
        const { name, value } = evt.target
    
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
    const getUsers = () => {
        axios.get('')
          .then(res => {
            setUsers(res.data.data);
          })
          .catch(err => {
            console.log(err)
          })
      };
    const postUsers = newUser => {
        axios.post('', newUser)
          .then(response => {
            setUsers([response.data, ...users]);
            debugger
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            setFormValues(initialFormValues);
          })
      };
      
  const onSubmit = evt => {
    evt.preventDefault();

    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      tos: formValues.tos,
    };

    setUsers(props => [newUser, ...props]);

    setFormValues(initialFormValues);

    postUsers(newUser);
  };

  useEffect(() => {
    getUsers()
  }, []);

  useEffect(() => {

    formSchema.isValid(formValues).then(props => {
      setDisabled(!props)
    })
  }, [formValues]);



  return (
    <div className="form-container">
        {/* <div className='errors'>
            <div>{errors.first_name}</div>
            <div>{errors.last_name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.tos}</div>
        </div> */}
        <div className='form-input'>
            <h3>Information</h3>
            <label> First Name
                <input name='first_name' type='text' value={first_name} onChange={onInputChange} maxLength='40'/>
            </label>
            <label> Last Name
                <input name='last_name' type='text' value={last_name} onChange={onInputChange} maxLength='40'/>
            </label>
            <label> Username
                <input name='username' type='text' value={username} onChange={onInputChange} maxLength='20'></input>
            </label>
            <label> Email
                <input name='email' type='text' value={email} onChange={onInputChange}/>
            </label>
            <label> Password
                <input name='password' type='password' value={password} onChange={onInputChange}/>
            </label>
            <label> Terms of Service
                <input name='tos' type='checkbox' checked={tos} onChange={onCheckboxChange}/>
            </label>
            <button onClick={onSubmit} disabled={disabled}>Submit</button>
        </div>
    </div>
);
}
