import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import Input from "../Input/Input";
import Button from "../Button";
import styles from "./ContactUsModalContent.module.scss";
import BasketballIcon from "../../public/assets/images/basketball.svg";
import validation from "./CustomValidationSchema";

const ContactUsModalContent = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_HOST}api/request`, values);
      onSuccess();
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.heading}>Хочете дізнатись деталі?</h1>
        <p className={styles.info}>
          Залиште свої контактні дані і ми вам зателефонуємо
        </p>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            details: "",
          }}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <Input
                className={styles.formGroup}
                placeholder="Ім’я"
                name="name"
                errorMessage={getFormikErrorByField(formik, `name`)}
                {...formik.getFieldProps("name")}
              />
              <Input
                className={styles.formGroup}
                placeholder="Номер телефону"
                name="phone"
                errorMessage={getFormikErrorByField(formik, `phone`)}
                {...formik.getFieldProps("phone")}
              />
              <Input
                className={styles.formGroup}
                as="textarea"
                placeholder="Деталі"
                name="details"
                errorMessage={getFormikErrorByField(formik, `details`)}
                {...formik.getFieldProps("details")}
              />
              <div className={styles.buttonWrapper}>
                <Button
                  type="submit"
                  variant="black"
                  size="medium"
                  className={styles.submit}
                  isLoading={loading}
                >
                  Надіслати
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.imageWrapper}>
        <BasketballIcon></BasketballIcon>
      </div>
    </div>
  );
};

export default ContactUsModalContent;
