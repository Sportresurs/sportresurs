import * as Yup from "yup";

const validationSchema = Yup.object({
  number: Yup.number().required("Поле обязательно к заполнению"),
  address: Yup.string()
    .max(30, "Количество символов не должно превышать 30")
    .required("Поле обязательно к заполнению"),
  latitude: Yup.number().required("Поле обязательно к заполнению"),
  longitude: Yup.number().required("Поле обязательно к заполнению"),
  facility: Yup.number().required("Поле обязательно к заполнению"),
  coating: Yup.string()
    .max(30, "Количество символов не должно превышать 30")
    .required("Поле обязательно к заполнению"),
  details: Yup.string().max(200, "Количество символов не должно превышать 200"),
});

export default validationSchema;
