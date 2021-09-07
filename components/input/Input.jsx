import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";
import ErrorIcon from "../../public/svg/input_error.svg";

const Input = ({
  as: RootComponent,
  size,
  value,
  isError = false,
  label,
  placeholder,
  ...rest
}) => {
  const wrapperClassName = classNames(styles.customInput, styles[size], {
    [styles.inputError]: isError,
  });
  const renderInputField = () => (
    <>
      <RootComponent
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
      {renderInputField()}
      {label && <label className={styles.inputLabel}>{label}</label>}
    </div>
  );
};

Input.defaultProps = {
  as: "input",
  size: ["small", "large"],
};

Input.propTypes = {
  as: PropTypes.oneOf(["input", "textarea"]).isRequired,
  size: PropTypes.oneOf(["small", "large"]).isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Input;
