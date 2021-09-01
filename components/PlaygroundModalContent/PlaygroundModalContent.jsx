import React from "react";
import Image from "next/image";
import styles from "./playgroundModalContent.module.scss";
import Ratings from "../Rating";
import Button from "../button";
import PlaygroundInfoRow from "../PlaygroundInfoRow";

const PlaygroundModalContent = ({ playground }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", field: "type" },
    { label: "Тип майданчика", field: "purpose" },
    { label: "Тип майданчика", field: "year" },
    { label: "Тип майданчика", field: "area" },
    { label: "Тип майданчика", field: "covering" },
    { label: "Тип майданчика", field: "access" },
    { label: "Тип майданчика", field: "opening" },
    { label: "Тип майданчика", field: "lighting" },
    { label: "Тип майданчика", field: "additionally" },
  ];
  return (
    <div className={styles.wrapper}>
      <Image className={styles.bgImage} src={playground.img} alt="" />
      <div className={styles.contentWrapper}>
        <button className={styles.tagBtn}>Сихівський</button>
        <h1 className={styles.pgHeading}>Майданчик № {playground.id}</h1>
        <p className={styles.street}>вул. {playground.address}</p>
        <Ratings color="#F2BA4C" />
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
