import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Formik } from "formik";
import s from "./EditAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";
import validation from "./ValidationSchema";

export default function EditAdminForm({
  setAdmins,
  adminEmail,
  setVisible,
  adminId,
}) {
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";

  const [editEmail, setEditEmail] = useState(adminEmail);

  const handleChange = (e) => {
    const { value } = e.target;
    setEditEmail(value);
  };

  const handleSubmitEdit = async (values) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST}api/admin/edit-admin`,
      {
        email: values.email,
      },
      {
        params: {
          id: adminId,
        },
      }
    );
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/admin/get-admins`)
      .then((res) => setAdmins(res.data));
    setEditEmail("");
    setVisible({ isVisible: false, id: null });
  };

  return (
    <Formik
      initialValues={{
        email: editEmail,
      }}
      validationSchema={validation}
      onSubmit={handleSubmitEdit}
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
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  adminId: PropTypes.number,
};
