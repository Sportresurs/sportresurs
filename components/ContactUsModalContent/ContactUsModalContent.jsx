import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Input from "../input/Input";
import Button from "../Button";
import Textarea from "../Textarea";
import styles from "./ContactUsModalContent.module.scss";
import backgroundImg from "./images/basketball.png";

const ContactUsModalContent = () => (
  <div className={styles.wrapper}>
    <div className={styles.contentWrapper}>
      <h1 className={styles.heading}>Хочете дізнатись деталі?</h1>
      <p className={styles.info}>
        Залиште свої контактні дані і ми вам зателфеонуємо
      </p>
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
            "Колличество символов не должно превышать 200"
          ),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <Input
              placeholder="Ім’я"
              id="name"
              name="name"
              {...formik.getFieldProps("name")}
              isError={formik.errors.name}
            />
            {formik.errors.name ? (
              <div className={styles.errorMsg}>{formik.errors.name}</div>
            ) : null}
            <Input
              placeholder="Номер телефон"
              id="phone"
              name="phone"
              {...formik.getFieldProps("phone")}
              isError={formik.errors.phone}
            />
            {formik.errors.phone ? (
              <div className={styles.errorMsg}>{formik.errors.phone}</div>
            ) : null}
            <Textarea
              placeholder="Деталі"
              id="details"
              name="details"
              {...formik.getFieldProps("details")}
              isError={formik.errors.details}
            />
            {formik.errors.details ? (
              <div className={styles.errorMsg}>{formik.errors.details}</div>
            ) : null}
            <div className={styles.buttonWrapper}>
              <Button
                type="submit"
                variant="black"
                size="medium"
                className={styles.submit}
              >
                Надіслати
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
    <div className={styles.imageWrapper}>
      <Image src={backgroundImg} alt="" />
    </div>
  </div>
);

export default ContactUsModalContent;
