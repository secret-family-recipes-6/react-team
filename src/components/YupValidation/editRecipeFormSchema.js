import * as Yup from "yup";

const editRecipeFormSchema = Yup.object().shape({
  title: Yup
    .string()
    .required("Username is Required."),
  source: Yup
    .string()
    .required("The source is Required"),
  category: Yup
    .string()
    .required("The category is Required"),
  recipe_img: Yup
    .string()
    .required("An image is Required"),
  ingredients: Yup
    .string()
    .required("Ingredients are Required"),
  instructions: Yup
    .string()
    .required("Instructions are Required"),
})

export default editRecipeFormSchema
