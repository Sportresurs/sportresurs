import { useRouter } from "next/router";
import axiosInstance from "../../../../api/axiosInstance";
import NotFound from "../../../404/Page404";
import style from "../../Purpose.module.scss";
import Button from "../../../../components/Button";
import capitalizeFirstLetter from "../../../../utils/capitalize";

function DeletePurpose({ purpose }) {
  const router = useRouter();

  if (!purpose) {
    return <NotFound />;
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`purpose/${purpose.id}`);
      router.push("/purposes");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className={style.wrapFrom}>
      <p className={style.deleteText}>
        {capitalizeFirstLetter(purpose.title)} буде видалено
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

export default DeletePurpose;
