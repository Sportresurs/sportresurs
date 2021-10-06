import * as Yup from "yup";
import validation from "../utils/validations";

const validationSchema = Yup.object({
  number: Yup.string()
    .matches(validation.numberValidation, validation.getErrorMessage("number"))
    .required(validation.getErrorMessage()),
  address: Yup.string()
    .max(30, validation.getErrorMessage("max", 30))
    .required(validation.getErrorMessage()),
  latitude: Yup.string()
    .matches(
      validation.latitudeValidation,
      validation.getErrorMessage("latitude")
    )
    .required(validation.getErrorMessage()),
  longitude: Yup.string()
    .matches(
      validation.longitudeValidation,
      validation.getErrorMessage("longitude")
    )
    .required(validation.getErrorMessage()),
  area: Yup.string()
    .matches(validation.areaValidation, validation.getErrorMessage("area"))
    .required(validation.getErrorMessage()),
  covering: Yup.string()
    .max(30, validation.getErrorMessage("max", 30))
    .required(validation.getErrorMessage()),
  details: Yup.string().max(200, validation.getErrorMessage("max", 200)),
  rating: Yup.string(),
});

export default validationSchema;
