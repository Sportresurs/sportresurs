import * as Yup from "yup";
import validation from "../utils/validations";

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(validation.emailValidation, validation.getErrorMessage("email"))
    .required(validation.getErrorMessage()),
});

export default validationSchema;
