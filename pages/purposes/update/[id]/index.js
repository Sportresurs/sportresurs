import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import NotFound from "../../../404/Page404";
import RouteGuard from "../../../../components/RouteGuard";
import axiosInstance from "../../../../api/axiosInstance";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

import style from "../../Purpose.module.scss";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

function UpdatePurpose({ purpose }) {
  const router = useRouter();

  if (!purpose) {
    return <NotFound />;
  }

  return (
    <RouteGuard>
      <div className={style.wrapFrom}>
        <Formik
          initialValues={{
            title: purpose.title,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosInstance.put(`purpose/${purpose.id}`, values);
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
                  Оновити
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

export async function getServerSideProps(context) {
  const { id } = context.params;

  if (!id) {
    return {
      props: {
        purpose: null,
      },
    };
  }

  let purpose = null;

  try {
    const { data } = await axiosInstance.get(`purpose/${id}`);

    purpose = data.purpose;
  } catch (error) {
    return {
      props: {
        purpose: null,
      },
    };
  }

  return {
    props: {
      purpose,
    },
  };
}

export default UpdatePurpose;
