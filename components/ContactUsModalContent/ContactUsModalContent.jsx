import React from "react";
import Image from "next/image";
import Input from "../input/Input";
import Button from "../Button";
import styles from "./ContactUsModalContent.module.scss";
import backgroundImg from "./images/basketball.png";
import CustomFormik from "../PlaygroundModalContent/CustomFormik";

const ContactUsModalContent = () => (
  <div className={styles.wrapper}>
    <div className={styles.contentWrapper}>
      <h1 className={styles.heading}>Хочете дізнатись деталі?</h1>
      <p className={styles.info}>
        Залиште свої контактні дані і ми вам зателфеонуємо
      </p>
      <CustomFormik>
        {(formik) => (
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <Input
              placeholder="Ім’я"
              name="name"
              isError={formik.errors.name}
              label={formik.errors.name ? <p>{formik.errors.name}</p> : null}
              {...formik.getFieldProps("name")}
            />
            <Input
              placeholder="Номер телефон"
              name="phone"
              isError={formik.errors.phone}
              label={formik.errors.phone ? <p>{formik.errors.phone}</p> : null}
              {...formik.getFieldProps("phone")}
            />
            <Input
              as="textarea"
              size="large"
              placeholder="Деталі"
              name="details"
              isError={formik.errors.details}
              label={
                formik.errors.details ? <p>{formik.errors.details}</p> : null
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
                Надіслати
              </Button>
            </div>
          </form>
        )}
      </CustomFormik>
    </div>
    <div className={styles.imageWrapper}>
      <Image src={backgroundImg} alt="" />
    </div>
  </div>
);

export default ContactUsModalContent;
