import React from "react";
import { Formik } from "formik";
import styles from "./AdminPlaygroundModalContent.module.scss";
import DefaultEmptyImage from "../../public/svg/defaultEmptyImage.svg";
import Ratings from "../Rating";
import Input from "../Input";
import Button from "../Button";
import CustomDropzone from "../CustomDropzone";
import validation from "./CustomValidationSchema";

const AdminPlaygroundModalContent = () => (
  <div className={styles.wrapper}>
    <div className={styles.imagesWrapper}>
      <CustomDropzone />
    </div>
    <div className={styles.contentWrapper}>
      <h1 className={styles.heading}>Майданчик № </h1>
      <Formik
        initialValues={{
          number: "",
          district: "",
          address: "",
          latitude: "",
          longitude: "",
          type: "",
          purpose: "",
          area: "",
          covering: "",
          access: "",
          opening: "00:00 - 00:00",
          lighting: "",
          details: "",
        }}
        validationSchema={validation}
      >
        {(formik) => (
          <form>
            <Input
              className={styles.input}
              label="Номер майданчику"
              labelSize="smallLabel"
              {...formik.getFieldProps("number")}
            />
            <Input
              className={styles.input}
              label="Район"
              labelSize="smallLabel"
              {...formik.getFieldProps("district")}
            />
            <Input
              className={styles.input}
              label="Адреса"
              labelSize="smallLabel"
              {...formik.getFieldProps("address")}
            />
            <Input
              className={styles.input}
              label="широта"
              labelSize="smallLabel"
              {...formik.getFieldProps("latitude")}
            />
            <Input
              className={styles.input}
              label="Довгота"
              labelSize="smallLabel"
              {...formik.getFieldProps("longitude")}
            />
            <Input
              className={styles.input}
              label="Тип майданчика"
              labelSize="smallLabel"
              {...formik.getFieldProps("type")}
            />
            <Input
              className={styles.input}
              label="Призначення"
              labelSize="smallLabel"
              {...formik.getFieldProps("purpose")}
            />
            <Input
              className={styles.input}
              label="Метраж"
              labelSize="smallLabel"
              {...formik.getFieldProps("area")}
            />
            <Input
              className={styles.input}
              label="Покриття"
              labelSize="smallLabel"
              {...formik.getFieldProps("covering")}
            />
            <Input
              className={styles.input}
              label="Доступ"
              labelSize="smallLabel"
              {...formik.getFieldProps("access")}
            />
            <Input
              className={styles.input}
              label="часи роботи"
              labelSize="smallLabel"
              {...formik.getFieldProps("opening")}
            />
            <Input
              className={styles.input}
              label="Освітлення"
              labelSize="smallLabel"
              {...formik.getFieldProps("lighting")}
            />
            <Input
              className={styles.input}
              label="Додатково"
              as="textarea"
              size="small"
              labelSize="smallLabel"
              {...formik.getFieldProps("details")}
            />
            <p className={styles.inputInfo}>Рейтинг</p>
            <Ratings value={0} />
            <Button
              variant="lilac"
              size="medium-dense"
              className={styles.submitButton}
            >
              Зберегти
            </Button>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

export default AdminPlaygroundModalContent;
