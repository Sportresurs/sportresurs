import PropTypes from "prop-types";
import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import s from "./EditAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";
import validation from "../../validationSchemas/AddAdminValidationSchema";

export default function EditAdminForm({ admin, cancel }) {
  const [email, setEmail] = useState(admin.email);

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (values) => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Прийняти зміни?")) {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}api/admin/edit-admin?id=${admin.id}`,
        values
      );
      window.location.reload(false);
    } else {
      cancel();
    }
  };

  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";
  return (
    <Formik
      initialValues={{
        email,
      }}
      validationSchema={validation}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      {(formik) => (
        <form className={s.editForm} onSubmit={formik.handleSubmit}>
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
  admin: PropTypes.object,
  cancel: PropTypes.func,
};
