import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";
import ErrorIcon from "../../public/svg/input_error.svg";

const Input = ({
  as: RootComponent,
  value,
  label,
  errorMsg,
  placeholder,
  className,
  ...rest
}) => {
  const inputClassName = classNames(
    styles.customInput,
    styles[RootComponent],
    {
      [styles.inputError]: errorMsg,
    },
    className
  );
  const renderInputField = () => (
    <>
      <RootComponent
        value={value}
        className={inputClassName}
        placeholder={placeholder}
        {...rest}
      />
      {errorMsg && (
        <div className={styles.errorIcon}>
          <ErrorIcon></ErrorIcon>
        </div>
      )}
    </>
  );

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      {renderInputField()}
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
    </div>
  );
};

Input.defaultProps = {
  as: "input",
};

Input.propTypes = {
  as: PropTypes.oneOf(["input", "textarea"]).isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Input;
