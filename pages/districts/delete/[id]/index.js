import { useRouter } from "next/router";
import axiosInstance from "../../../../api/axiosInstance";
import NotFound from "../../../404/Page404";
import style from "../../District.module.scss";
import Button from "../../../../components/Button";
import capitalizeFirstLetter from "../../../../utils/capitalize";

function DeleteDistrict({ district }) {
  const router = useRouter();

  if (!district) {
    return <NotFound />;
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`district/${district.id}`);
      router.push("/districts");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className={style.wrapFrom}>
      <p className={style.deleteText}>
        {capitalizeFirstLetter(district.name)} буде видалено
      </p>
      <div className={style.buttonWrapper}>
        <Button onClick={handleDelete}>Видалити</Button>
        <Button onClick={() => router.back()}>Назад</Button>
      </div>
    </div>
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

export default DeleteDistrict;
