import React from "react";
import styles from "./modal.module.scss";
import PlaygroundInfo from "./PlaygroundInfo";
import Button from "../button";
import Ratings from "../Rating";

const PlaygroundModal = () => (
  <div className={styles.wrapper}>
    <div className={styles.bg_img} />
    <div className={styles.content_wrapper}>
      <button className={styles.tag_btn}>Сихівський</button>
      <h1>Майданчик №1</h1>
      <p className={styles.street}>вул. Тернопільська, 13а, Львів</p>
      <Ratings color="#F2BA4C"></Ratings>
      <PlaygroundInfo />
      <Button
        variant="lilac"
        size="medium-dense"
        className={styles.contact_btn}
      >
        Зв’яжіться зі мною
      </Button>
    </div>
  </div>
);

export default PlaygroundModal;
