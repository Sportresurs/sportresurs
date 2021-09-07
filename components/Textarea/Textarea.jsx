import React from "react";
import classNames from "classnames";
import styles from "./Textarea.module.scss";
import ErrorIcon from "../../public/svg/input_error.svg";

const Textarea = ({ value, isError = false, label, placeholder, ...rest }) => {
  const wrapperClassName = classNames(styles.customTextarea, {
    [styles.textareaError]: isError,
  });
  const renderTextareaField = () => (
    <>
      <textarea
        value={value}
        className={wrapperClassName}
        placeholder={placeholder}
        {...rest}
      />
      {isError && (
        <div alt="" className={styles.errorIcon}>
          <ErrorIcon></ErrorIcon>
        </div>
      )}
    </>
  );

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.textareaLabel}>{label}</label>}
      {renderTextareaField()}
    </div>
  );
};
export default Textarea;
