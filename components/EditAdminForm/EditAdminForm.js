import PropTypes from "prop-types";
import { useFormik } from "formik";
import s from "./EditAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";
import validation from "./ValidationSchema";

export default function EditAdminForm({
  value,
  handleSubmit,
  handleChange,
  adminId,
}) {
  const formik = useFormik({
    initialValues: {
      email: value,
    },
    validationSchema: validation,
    onSubmit: handleSubmit,
    onChange: handleChange,
  });
  return (
    <form className={s.editForm} onSubmit={formik.handleSubmit(adminId)}>
      <Input
        className={s.editInput}
        type="email"
        value={formik.values.email}
        onChange={formik.onChange}
        name="email"
      />
      <Button variant="black" size="small" className={s.saveBtn} type="submit">
        Зберегти
      </Button>
    </form>
  );
}

EditAdminForm.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  adminId: PropTypes.number,
};
