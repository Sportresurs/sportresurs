import * as Yup from "yup";
import validation from "../../utils/validations";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(20, validation.getErrorMessage("max", 20))
    .matches(validation.nameValidation, validation.getErrorMessage("name"))
    .required(validation.getErrorMessage()),
  phone: Yup.string()
    .matches(validation.phoneValidation, validation.getErrorMessage("phone"))
    .required(validation.getErrorMessage()),
  details: Yup.string().max(200, validation.getErrorMessage("max", 200)),
});

export default validationSchema;
