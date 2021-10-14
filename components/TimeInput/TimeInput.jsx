import React from "react";
import classNames from "classnames";
import styles from "./TimeInput.module.scss";

const TimeInput = ({
  openFormikProps,
  closeFormikProps,
  label,
  onFocus,
  handleFocus,
  handleBlur,
}) => {
  const wrapperTimeContainerStyles = classNames(styles.timeWrapper, {
    [styles.timeWrapperFocus]: onFocus,
  });
  return (
    <>
      <p className={styles.timeLabel}>{label}</p>
      <div
        className={wrapperTimeContainerStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input
          type="time"
          min="00:00"
          max="24:00"
          className={styles.open}
          {...openFormikProps}
        />
        <nobr> -</nobr>
        <input
          type="time"
          min="00:00"
          max="24:00"
          className={styles.close}
          {...closeFormikProps}
        />
        <div className={styles.clockClose} />
      </div>
    </>
  );
};

export default TimeInput;
