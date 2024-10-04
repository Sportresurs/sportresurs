import React from "react";
import { Formik, Form } from "formik";
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

import WithLoader from "../WithLoader";
import TimeInput from "../TimeInput";
import setInitialValues from "./model/setInitalValues";
import Label from "./ui/Label";
import UseCreateUpdate from "./model/use-create-update";
import OPTIONS from "./model/constant";
import GoogleMapPicker from "./ui/map-for-pick";

const AdminPlaygroundModalContent = ({ onClose, area = null, images }) => {
  const {
    isLoading,
    onFocus,
    handleFocus,
    handleBlur,
    handleSubmit,
    isInitialDataLoading,
    files,
    setFiles,
    initialData,
  } = UseCreateUpdate({ area, images, onClose });

  const initialValues = setInitialValues({ area, ...initialData });

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
          <Label area={area} />
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(data) => handleSubmit(data)}
          >
            {(formik) => {
              const purposeField = formik.getFieldProps("Purposes");
              purposeField.onChange = (value) => {
                formik.setFieldValue("Purposes", value);
              };

              const typeFiled = formik.getFieldProps("Types");
              typeFiled.onChange = (value) => {
                formik.setFieldValue("Types", value);
              };

              return (
                <Form>
                  <Input
                    className={styles.input}
                    label="Назва"
                    labelSize="smallLabel"
                    inputSize="form"
                    errorStyle="formErrorIcon"
                    errorMessage={getFormikErrorByField(formik, "title")}
                    {...formik.getFieldProps("title")}
                  />
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
                    options={initialData.districtsOptions}
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
                    errorMessage={getFormikErrorByField(formik, "address")}
                    {...formik.getFieldProps("address")}
                  />
                  <GoogleMapPicker formik={formik} />
                  <MultiSelect
                    placeholderColor="#150223"
                    placeholderFontSize="14px"
                    type="Тип"
                    data={initialData.typesOptions}
                    multiSelectType="form"
                    className={styles.input}
                    {...typeFiled}
                  />
                  <MultiSelect
                    placeholderColor="#150223"
                    placeholderFontSize="14px"
                    type="Вид спорту"
                    data={initialData.purposesOptions}
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
                    errorMessage={getFormikErrorByField(formik, `size`)}
                    {...formik.getFieldProps("size")}
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
                    options={OPTIONS.access}
                    label="Доступ"
                    labelSize="smallLabel"
                    {...formik.getFieldProps("access")}
                  />
                  <TimeInput
                    openFormikProps={formik.getFieldProps("open_time")}
                    closeFormikProps={formik.getFieldProps("close_time")}
                    label="Часи роботи"
                    onFocus={onFocus}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                  />
                  <Select
                    type="form"
                    options={OPTIONS.light}
                    label="Освітлення"
                    labelSize="smallLabel"
                    {...formik.getFieldProps("light")}
                  />

                  <Select
                    type="form"
                    options={OPTIONS.ownership_form}
                    label="Форма власності"
                    labelSize="smallLabel"
                    {...formik.getFieldProps("ownership_form")}
                  />
                  <Select
                    type="form"
                    options={OPTIONS.inclusiveness}
                    label="Інклюзивність"
                    labelSize="smallLabel"
                    {...formik.getFieldProps("inclusiveness")}
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
                </Form>
              );
            }}
          </Formik>
        </WithLoader>
      </div>
    </div>
  );
};

AdminPlaygroundModalContent.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  area: PropTypes.object,
  images: PropTypes.array,
};

export default AdminPlaygroundModalContent;
