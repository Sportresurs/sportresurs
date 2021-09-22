import PropTypes from "prop-types";
import { useFormik } from "formik";
import s from "./AddAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";
import validation from "./ValidationSchema";

export default function AddAdminForm({ value, handleSubmit, handleChange }) {
  const formik = useFormik({
    initialValues: {
      email: value,
    },
    validationSchema: validation,
    onSubmit: handleSubmit,
    onChange: handleChange,
  });
  return (
    <>
      <div className={s.textContainer}>
        <p className={s.title}>Електронна пошта</p>
      </div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <Input
          className={s.inp}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
        />
        <Button variant="lilac" size="small" type="submit">
          Додати
        </Button>
      </form>
    </>
  );
}

AddAdminForm.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};
