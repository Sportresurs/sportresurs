import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axiosInstance from "../../../api/axiosInstance";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import RouteGuard from "../../../components/RouteGuard";

import style from "../Purpose.module.scss";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

function CreatePurpose() {
  const router = useRouter();
  return (
    <RouteGuard>
      <div className={style.wrapFrom}>
        <Formik
          initialValues={{
            title: "",
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosInstance.post("purpose", values);
              setSubmitting(false);
              router.push("/purposes");
            } catch (error) {
              throw new Error(`Error update ${error}`);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={style.form}>
              <Input
                label="Ім’я"
                placeholder="Ім’я"
                name="title"
                errorMessage={formik.errors.name ? "Lengt more than 3" : null}
                {...formik.getFieldProps("title")}
              />

              <div className={style.buttonWrap}>
                <Button type="submit" color="#0fa942" size="medium">
                  Створити
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <div className={style.backButton}>
          <Button onClick={() => router.back()}>Назад</Button>
        </div>
      </div>
    </RouteGuard>
  );
}

export default CreatePurpose;
