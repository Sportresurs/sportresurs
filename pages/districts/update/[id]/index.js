import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axiosInstance from "../../../../api/axiosInstance";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import style from "../../District.module.scss";
import NotFound from "../../../404/Page404";
import RouteGuard from "../../../../components/RouteGuard";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  color: Yup.string()
    .matches(/^#[0-9A-F]{6}$/i, "Color must be in HEX format")
    .required("Color is required"),
});

function UpdateDistrict({ district }) {
  const router = useRouter();
  if (!district) {
    return <NotFound />;
  }

  return (
    <RouteGuard>
      <div className={style.wrapFrom}>
        <Formik
          initialValues={{
            name: district.name,
            color: district.color,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosInstance.put(`district/${district.id}`, values);
              setSubmitting(false);
              router.push("/districts");
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
                name="name"
                errorMessage={formik.errors.name ? "Lengt more than 3" : null}
                {...formik.getFieldProps("name")}
              />

              <input
                type="color"
                {...formik.getFieldProps("color")}
                placeholder="color"
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
        district: null,
      },
    };
  }

  let district = null;

  try {
    const { data } = await axiosInstance.get(`district/${id}`);
    district = data.district;
  } catch (error) {
    return {
      props: {
        district: null,
      },
    };
  }

  return {
    props: {
      district,
    },
  };
}

export default UpdateDistrict;
