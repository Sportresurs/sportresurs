import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Formik } from "formik";
import s from "./AddAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";
import validation from "./ValidationSchema";

export default function AddAdminForm({ setAdmins }) {
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (values) => {
    await axios.post(`${process.env.NEXT_PUBLIC_HOST}api/admin/add-admin`, {
      email: values.email,
    });
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/admin/get-admins`)
      .then((res) => setAdmins(res.data));
    setEmail("");
  };

  return (
    <>
      <div className={s.textContainer}>
        <p className={s.title}>Електронна пошта</p>
      </div>
      <Formik
        initialValues={{
          email,
        }}
        validationSchema={validation}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        {(formik) => (
          <form className={s.form} onSubmit={formik.handleSubmit}>
            <Input
              className={s.inp}
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              errorMessage={getFormikErrorByField(formik, "email")}
              {...formik.getFieldProps("email")}
            />
            <Button variant="lilac" size="small" type="submit">
              Додати
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

AddAdminForm.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};
