import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import NotFound from "../../../404/Page404";
import RouteGuard from "../../../../components/RouteGuard";
import axiosInstance from "../../../../api/axiosInstance";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

import style from "../../Types.module.scss";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

function UpdateType({ type }) {
  const router = useRouter();

  if (!type) {
    return <NotFound />;
  }

  return (
    <RouteGuard>
      <div className={style.wrapFrom}>
        <Formik
          initialValues={{
            name: type.name,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosInstance.put(`type/${type.id}`, values);
              setSubmitting(false);
              router.push("/types");
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
        type: null,
      },
    };
  }

  let type = null;

  try {
    const { data } = await axiosInstance.get(`type/${id}`);

    type = data.type;
  } catch (error) {
    return {
      props: {
        type: null,
      },
    };
  }

  return {
    props: {
      type,
    },
  };
}

export default UpdateType;
