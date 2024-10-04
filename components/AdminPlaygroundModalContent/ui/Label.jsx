import React from "react";
import styles from "../AdminPlaygroundModalContent.module.scss";

const Label = ({ area }) => (
  <h1 className={styles.heading}>
    {area ? `Редагувати майданчик ${area.id}` : "Створити новий майданчик"}
  </h1>
);

export default Label;
