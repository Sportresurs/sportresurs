import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./AdminPlaygroundModalContent.module.scss";
import Ratings from "../Rating";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import CustomDropzone from "../CustomDropzone";
import validation from "../../validationSchemas/AddCourtValidationSchema";
import options from "../../utils/testData/testArrs";
import customerService from "../../api/customerService";

const AdminPlaygroundModalContent = ({ onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      let value = values[key];
      if (Array.isArray(value)) {
        value = value.map((i) => i.value);
      }
      formData.append(key, value);
    });
    formData.append(
      "images",
      files.map(({ file }) => file)
    );
    setIsLoading(true);
    try {
      await customerService.contactRequest(formData);
      onSuccess();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";
  return (
    <div className={styles.wrapper}>
      <div className={styles.imagesWrapper}>
        <CustomDropzone files={files} setFiles={setFiles} />
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
            purpose: [],
            area: "",
            covering: "",
            access: "",
            opening: "00:00 - 00:00",
            lighting: "",
            details: "",
            rating: null,
          }}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const purposeField = formik.getFieldProps("purpose");
            purposeField.onChange = (value) => {
              formik.setFieldValue("purpose", value);
            };
            return (
              <form onSubmit={formik.handleSubmit}>
                <Input
                  className={styles.input}
                  label="Номер майданчику"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `number`)}
                  {...formik.getFieldProps("number")}
                />
                <Select
                  type="form"
                  options={options.districts}
                  defaultValue={options.districts[0]}
                  label="Район"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  {...formik.getFieldProps("district")}
                />
                <Input
                  className={styles.input}
                  label="Адреса"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `address`)}
                  {...formik.getFieldProps("address")}
                />
                <Input
                  className={styles.input}
                  label="широта"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `latitude`)}
                  {...formik.getFieldProps("latitude")}
                />
                <Input
                  className={styles.input}
                  label="Довгота"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `longitude`)}
                  {...formik.getFieldProps("longitude")}
                />
                <Select
                  type="form"
                  options={options.typeOptions}
                  label="Тип майданчика"
                  defaultValue={options.typeOptions[0].value}
                  labelSize="smallLabel"
                  {...formik.getFieldProps("type")}
                />
                <MultiSelect
                  placeholderColor="#150223"
                  placeholderFontSize="14px"
                  type="Призначення"
                  data={options.courtsType.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  multiSelectType="form"
                  className={styles.input}
                  {...purposeField}
                />
                <Input
                  className={styles.input}
                  label="Метраж"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `area`)}
                  {...formik.getFieldProps("area")}
                />
                <Input
                  className={styles.input}
                  label="Покриття"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `covering`)}
                  {...formik.getFieldProps("covering")}
                />
                <Select
                  type="form"
                  options={options.accessOptions}
                  defaultValue={options.accessOptions[0].value}
                  label="Доступ"
                  labelSize="smallLabel"
                  {...formik.getFieldProps("access")}
                />
                <Input
                  className={styles.input}
                  label="часи роботи"
                  labelSize="smallLabel"
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `opening`)}
                  {...formik.getFieldProps("opening")}
                />
                <Select
                  type="form"
                  options={options.lightingOptions}
                  defaultValue={options.lightingOptions[0].value}
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
                  inputSize="form"
                  errorStyle="formErrorIcon"
                  errorMessage={getFormikErrorByField(formik, `details`)}
                  {...formik.getFieldProps("details")}
                />
                <p className={styles.inputInfo}>Рейтинг</p>
                <Ratings
                  color="black"
                  readOnly={false}
                  value={formik.initialValues.rating}
                  {...formik.getFieldProps("rating")}
                />
                <Button
                  type="submit"
                  variant="lilac"
                  size="medium-dense"
                  className={styles.submitButton}
                  isLoading={isLoading}
                >
                  Зберегти
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AdminPlaygroundModalContent;
