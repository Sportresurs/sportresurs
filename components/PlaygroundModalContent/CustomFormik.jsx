import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const CustomFormik = ({ children }) => (
  <Formik
    initialValues={{
      name: "",
      phone: "",
      details: "",
    }}
    validationSchema={Yup.object({
      name: Yup.string()
        .max(20, "Колличество символов не должно превышать 20")
        .matches(/^[A-Za-z ]*$/, "Пожалуйста, введите валидное имя")
        .required("Поле обязательно к заполнению"),
      phone: Yup.string()
        .matches(
          /^\+?3?8?(0[5-9][0-9]\d{7})$/,
          "Пожалуйста, введите валидный номер"
        )
        .required("Поле обязательно к заполнению"),
      details: Yup.string().max(
        200,
        "Количество символов не должно превышать 200"
      ),
    })}
    onSubmit={(values) => {
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {children}
  </Formik>
);

export default CustomFormik;
