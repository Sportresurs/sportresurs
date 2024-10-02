import React from "react";
import Link from "next/link";
import Button from "../Button";
import style from "./district-action.module.scss";

const EntityButtonAction = ({ selectedRows, pathName }) => {
  const { id } = selectedRows[0] || 0;

  return (
    <div className={style.wrap}>
      <div className={style.linksWrapper}>
        <Link href={`/${pathName}/create`} passHref>
          <Button color="#9c9208">Створити</Button>
        </Link>
        <Link href={`/${pathName}/update/${id}`} passHref>
          <Button color="#0d9c08">Оновити</Button>
        </Link>
        <Link href={`/${pathName}/delete/${id}`} passHref>
          <Button>Видалити</Button>
        </Link>
      </div>
    </div>
  );
};

export default EntityButtonAction;
