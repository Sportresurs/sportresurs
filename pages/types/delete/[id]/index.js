import { useRouter } from "next/router";
import axiosInstance from "../../../../api/axiosInstance";
import NotFound from "../../../404/Page404";
import style from "../../Types.module.scss";
import Button from "../../../../components/Button";
import capitalizeFirstLetter from "../../../../utils/capitalize";

function DeleteType({ type }) {
  const router = useRouter();

  if (!type) {
    return <NotFound />;
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`type/${type.id}`);
      router.push("/types");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className={style.wrapFrom}>
      <p className={style.deleteText}>
        {capitalizeFirstLetter(type.name)} буде видалено
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

export default DeleteType;
