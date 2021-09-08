import React, { useState } from "react";
import { Formik } from "formik";
import Input from "../input/Input";
import Button from "../Button";
import styles from "./ContactUsModalContent.module.scss";
import Basketball from "../../public/assets/images/basketball.svg";
import validation from "./CustomValidationSchema";
import customerService from "../../api/customerService";
import Spiner from "../Spinner";

const ContactUsModalContent = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
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
          onSubmit={async (values) => {
            setLoading(true);
            const result = await customerService(values);
            alert(result);
            setLoading(false);
            onClose();
          }}
        >
          {(formik) => (
            <form className={styles.formGroup} onSubmit={formik.handleSubmit}>
              <Input
                placeholder="Ім’я"
                name="name"
                isError={formik.touched.name && formik.errors.name}
                errorMsg={
                  formik.errors.name &&
                  formik.touched.name && <p>{formik.errors.name}</p>
                }
                {...formik.getFieldProps("name")}
              />
              <Input
                placeholder="Номер телефон"
                name="phone"
                isError={formik.touched.phone && formik.errors.phone}
                errorMsg={
                  formik.errors.phone &&
                  formik.touched.phone && <p>{formik.errors.phone}</p>
                }
                {...formik.getFieldProps("phone")}
              />
              <Input
                as="textarea"
                placeholder="Деталі"
                name="details"
                isError={formik.touched.details && formik.errors.details}
                errorMsg={
                  formik.errors.details &&
                  formik.touched.details && <p>{formik.errors.details}</p>
                }
                {...formik.getFieldProps("details")}
              />
              <div className={styles.buttonWrapper}>
                <Button
                  type="submit"
                  variant="black"
                  size="medium"
                  className={styles.submit}
                >
                  {loading ? <Spiner /> : <p>Надіслати</p>}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.imageWrapper}>
        <Basketball></Basketball>
      </div>
    </div>
  );
};

export default ContactUsModalContent;
