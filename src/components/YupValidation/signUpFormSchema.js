import * as Yup from "yup";

const signUpFormSchema = Yup.object().shape({
  first_name: Yup
    .string()
    .required("Must include a first name."),
  last_name: Yup
    .string()
    .required("Must include a last name."),
  username: Yup
    .string()
    .min(5, "Username must be at least 5 characters long.")
    .required("Username is Required"),
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup
    .string()
    .min(5, "Passwords must be at least 5 characters long.")
    .required("Must include a password."),
})

export default signUpFormSchema;