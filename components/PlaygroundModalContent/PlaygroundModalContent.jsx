import React from "react";
import Image from "next/image";
import styles from "./playgroundModalContent.module.scss";
import Ratings from "../Rating";
import Button from "../Button";
import PlaygroundInfoRow from "../PlaygroundInfoRow";

const PlaygroundModalContent = ({ playground }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", field: "type" },
    { label: "Призначення", field: "purpose" },
    { label: "Рік відкриття", field: "year" },
    { label: "Метраж", field: "area" },
    { label: "Покриття", field: "covering" },
    { label: "Доступ", field: "access" },
    { label: "Час роботи", field: "opening" },
    { label: "Освітлення", field: "lighting" },
    { label: "Додатково", field: "additionally" },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.bgImage}
          src={playground.img}
          alt=""
          layout="responsive"
        />
      </div>
      <div className={styles.contentWrapper}>
        <button className={styles.tagBtn}>Сихівський</button>
        <h1 className={styles.heading}>Майданчик № {playground.id}</h1>
        <p className={styles.street}>вул. {playground.address}</p>
        <Ratings color="#F2BA4C" readOnly={true} />
        <div className={styles.infoWrapper}>
          {playgroundInfoFields.map(({ label, field }) => (
            <PlaygroundInfoRow
              key={field}
              label={label}
              value={playground[field]}
            />
          ))}
        </div>
        <Button
          variant="lilac"
          size="medium-dense"
          className={styles.contactBtn}
        >
          Зв’яжіться зі мною
        </Button>
      </div>
    </div>
  );
};

export default PlaygroundModalContent;
