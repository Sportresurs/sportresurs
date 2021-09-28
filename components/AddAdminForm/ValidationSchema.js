import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Будь ласка, введіть електронну пошту"
    )
    .required("Поле обовязкове для заповнення"),
});

export default validationSchema;
