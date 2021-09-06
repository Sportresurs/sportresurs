import React from "react";
import PropTypes from "prop-types";
import styles from "./PlaygroundInfoRow.module.scss";

const PlaygroundInfoRow = ({ label, value }) => (
  <p className={styles.text}>
    <b className={styles.label}>{label}:</b> {value}
  </p>
);

PlaygroundInfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default PlaygroundInfoRow;
