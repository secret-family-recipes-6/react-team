import * as Yup from "yup";

const signInFormSchema = Yup.object().shape({
  username: Yup
    .string()
    .required("Username is Required."),
  password: Yup
    .string()
    .required("Password is Required"),
})

export default signInFormSchema
