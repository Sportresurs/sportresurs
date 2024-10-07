import * as Yup from "yup";
import validation from "../utils/validations";

const validationSchema = Yup.object({
  title: Yup.string().required(validation.getErrorMessage()),
  address: Yup.string().required("Адреса обов'язкова"),
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
  size: Yup.string().matches(
    validation.sizeValidation,
    validation.getErrorMessage("size")
  ),
  coating: Yup.string().max(30, validation.getErrorMessage("max", 30)),
  additional: Yup.string().max(200, validation.getErrorMessage("max", 200)),
  rating: Yup.string(),
});

export default validationSchema;
