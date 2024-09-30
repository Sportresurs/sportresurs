import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./PlaygroundInfoRow.module.scss";
import capitalizeFirstLetter from "../../utils/capitalize";

const PlaygroundInfoRow = ({ label, value, isList = false }) => {
  const textStyleWrapper = classNames(styles.text, {
    [styles.listText]: isList,
  });
  const labelStyleWrapper = classNames(styles.label, {
    [styles.listText]: isList,
  });

  return (
    <p className={textStyleWrapper}>
      <b className={labelStyleWrapper}>{label}:</b>
      {capitalizeFirstLetter(value)}
    </p>
  );
};

PlaygroundInfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PlaygroundInfoRow;
