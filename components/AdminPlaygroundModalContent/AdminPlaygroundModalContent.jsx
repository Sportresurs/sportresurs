import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./AdminPlaygroundModalContent.module.scss";
import Ratings from "../Rating";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import CustomDropzone from "../CustomDropzone";
import validation from "./CustomValidationSchema";
import customerService from "../../api/customerService";

const districtOptions = [
  { label: "Галицький", value: "Галицький" },
  { label: "Сихівський", value: "Сихівський" },
  { label: "Залізничний", value: "Залізничний" },
  { label: "Личаківський", value: "Личаківський" },
  { label: "Франківський", value: "Франківський" },
  { label: "Шевченківський", value: "Шевченківський" },
  { label: "Інший", value: "Інший" },
];
const typeOptions = [
  { label: "Спортивний", value: "Спортивний" },
  { label: "Дитячо-спортивний", value: "Дитячо-спортивний" },
];
const purposeOptions = [
  { label: "Спортивний", value: "Спортивний" },
  { label: "Дитячий", value: "Дитячий" },
  { label: "Тенісний", value: "Тенісний" },
  { label: "Футбольний", value: "Футбольний" },
  { label: "Стріт воркаут", value: "Стріт воркаут" },
  { label: "Скейт-майданчик", value: "Скейт-майданчик" },
  { label: "Бігові доріжки", value: "Бігові доріжки" },
];
const accessOptions = [
  { label: "Безкоштовний", value: "Безкоштовний" },
  { label: "Платний", value: "Платний" },
];
const lightingOptions = [
  { label: "Є", value: "Є" },
  { label: "Відсутнє", value: "Відсутнє" },
];
const AdminPlaygroundModalContent = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    // eslint-disable-next-line array-callback-return
    Object.keys(values).map((item) => {
      let value = values[item];
      if (Array.isArray(value)) {
        value = value.map((i) => i.value);
      }
      formData.append(`${item}`, value);
    });
    formData.append(
      "images",
      files.map((file) => file.file)
    );
    setLoading(true);
    try {
      await customerService.contactRequest(formData);
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
      <div className={styles.imagesWrapper}>
        <CustomDropzone files={files} setFiles={setFiles} />
      </div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.heading}>Майданчик № </h1>
        <Formik
          initialValues={{
            number: "",
            district: "Галицький",
            address: "",
            latitude: "",
            longitude: "",
            type: "Спортивний",
            purpose: [],
            area: "",
            covering: "",
            access: "Безкоштовний",
            opening: "00:00 - 00:00",
            lighting: "Є",
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
                  options={districtOptions}
                  defaultValue={[{ label: "Галицький", value: "Галицький" }]}
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
                  options={typeOptions}
                  label="Тип майданчика"
                  labelSize="smallLabel"
                  {...formik.getFieldProps("type")}
                />
                <MultiSelect
                  placeholderColor="#150223"
                  placeholderFontSize="14px"
                  type="Призначення"
                  data={purposeOptions}
                  multiSelectType="form"
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
                  options={accessOptions}
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
                  options={lightingOptions}
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
                  isLoading={loading}
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
