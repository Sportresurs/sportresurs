import React, { useState } from "react";
import { Formik } from "formik";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./AdminPlaygroundModalContent.module.scss";
import Ratings from "../Rating";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import CustomDropzone from "../CustomDropzone";
import validation from "../../validationSchemas/AddCourtValidationSchema";
import options from "../../utils/testData/testArrs";
import useAsyncData from "../../utils/hooks/useAsyncData";
import playgroundService from "../../api/playgroundService";
import WithLoader from "../WithLoader";
import TimeInput from "../TimeInput";

const AdminPlaygroundModalContent = ({ onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const { data: purposesOptions = [], isLoading: isInitialDataLoading } =
    useAsyncData(playgroundService.getPurposes);
  const handleFocus = (e) => {
    if (e.currentTarget === e.target) {
      setOnFocus(true);
    } else {
      setOnFocus(true);
    }
  };
  const handleBlur = () => {
    setOnFocus(false);
  };
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      let value = values[key];
      if (key === "type" || key === "access") {
        value = value.toLowerCase();
      }
      if (key === "openTime" || key === "closeTime") {
        value = `${value}:00`;
      }
      if (Array.isArray(value)) {
        value = value.map((i) => i.value);
      }
      formData.set(key, value);
    });
    files.forEach((file) => {
      formData.append("images", file.file);
    });
    try {
      await playgroundService.create(formData);
      onSuccess();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  const getFormikErrorByField = (formik, fieldName) =>
    (formik.touched[fieldName] && formik.errors[fieldName]) || "";
  const contentClassesWrapper = classNames(styles.contentWrapper, {
    [styles.loadingContentWrapper]: isInitialDataLoading,
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.imagesWrapper}>
        <CustomDropzone files={files} setFiles={setFiles} />
      </div>
      <div className={contentClassesWrapper}>
        <WithLoader isLoading={isInitialDataLoading}>
          <>
            <h1 className={styles.heading}>Майданчик № </h1>
            <Formik
              initialValues={{
                number: "",
                district: options.districts[0].value,
                address: "",
                latitude: "",
                longitude: "",
                type: options.typeOptions[0].value,
                purpose: [],
                area: "",
                coating: "",
                access: options.accessOptions[0].value,
                openTime: "00:00",
                closeTime: "00:00",
                light: options.lightingOptions[0].value,
                additional: "",
                rating: 0.0,
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
                      label="Район"
                      labelSize="smallLabel"
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
                      labelSize="smallLabel"
                      {...formik.getFieldProps("type")}
                    />
                    <MultiSelect
                      placeholderColor="#150223"
                      placeholderFontSize="14px"
                      type="Призначення"
                      data={purposesOptions.map((item) => ({
                        label: item.title,
                        value: item.id,
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
                      errorMessage={getFormikErrorByField(formik, `coating`)}
                      {...formik.getFieldProps("coating")}
                    />
                    <Select
                      type="form"
                      options={options.accessOptions}
                      label="Доступ"
                      labelSize="smallLabel"
                      {...formik.getFieldProps("access")}
                    />
                    <TimeInput
                      openFormikProps={{ ...formik.getFieldProps("openTime") }}
                      closeFormikProps={{
                        ...formik.getFieldProps("closeTime"),
                      }}
                      label="часи роботи"
                      onFocus={onFocus}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                    />
                    <Select
                      type="form"
                      options={options.lightingOptions}
                      label="Освітлення"
                      labelSize="smallLabel"
                      {...formik.getFieldProps("light")}
                    />
                    <Input
                      className={styles.input}
                      label="Додатково"
                      as="textarea"
                      size="small"
                      labelSize="smallLabel"
                      inputSize="form"
                      errorStyle="formErrorIcon"
                      errorMessage={getFormikErrorByField(formik, `additional`)}
                      {...formik.getFieldProps("additional")}
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
          </>
        </WithLoader>
      </div>
    </div>
  );
};

AdminPlaygroundModalContent.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default AdminPlaygroundModalContent;
