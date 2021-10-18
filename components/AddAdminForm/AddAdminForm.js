import PropTypes from "prop-types";
import { Formik } from "formik";
import s from "./AddAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";
import validation from "../../validationSchemas/AddAdminValidationSchema";

export default function AddAdminForm({ value, handleSubmit, handleChange }) {
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";
  return (
    <>
      <div className={s.textContainer}>
        <p className={s.title}>Електронна пошта</p>
      </div>
      <Formik
        initialValues={{
          email: value,
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
