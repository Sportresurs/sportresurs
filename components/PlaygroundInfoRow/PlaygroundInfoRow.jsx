import React from "react";
import styles from "./PlaygroundInfoRow.module.scss";

const PlaygroundInfoRow = ({ label, value }) => (
  <p className={styles.text}>
    <b className={styles.label}>{label}:</b> {value}
  </p>
);

export default PlaygroundInfoRow;
