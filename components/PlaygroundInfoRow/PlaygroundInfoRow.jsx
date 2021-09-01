import React from "react";
import styles from "./playgroundInfoRow.module.scss";

const PlaygroundInfoRow = ({ label, value }) => (
  <p className={styles.pgText}>
    <b className={styles.pgTextBold}>{label}:</b> {value}
  </p>
);

export default PlaygroundInfoRow;
