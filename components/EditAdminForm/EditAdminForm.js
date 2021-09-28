import PropTypes from "prop-types";
import { Formik } from "formik";
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
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";
  return (
    <Formik
      initialValues={{
        email: value,
      }}
      validationSchema={validation}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      {(formik) => (
        <form className={s.editForm} onSubmit={formik.handleSubmit(adminId)}>
          <Input
            className={s.editInput}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            errorMessage={getFormikErrorByField(formik, "email")}
            {...formik.getFieldProps("email")}
          />
          <Button
            variant="black"
            size="small"
            className={s.saveBtn}
            type="submit"
          >
            Зберегти
          </Button>
        </form>
      )}
    </Formik>
  );
}

EditAdminForm.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  adminId: PropTypes.number,
};
