import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";
import ErrorIcon from "../../public/svg/input_error.svg";

const Input = ({
  as: RootComponent,
  value,
  label,
  errorMessage,
  placeholder,
  className,
  size,
  labelSize,
  inputSize,
  errorStyle,
  ...rest
}) => {
  const inputClassName = classNames(
    styles.customInput,
    styles[RootComponent],
    styles[size],
    {
      [styles.inputError]: errorMessage,
    }
  );
  const inputWrapperClassName = classNames(
    styles.wrapper,
    styles[inputSize],
    className
  );
  const inputLabelWrapperClassName = classNames(
    styles.inputLabel,
    styles[labelSize]
  );
  const errorIconWrapperClassName = classNames(
    styles.errorIcon,
    styles[errorStyle]
  );
  const renderInputField = () => (
    <>
      <RootComponent
        value={value}
        className={inputClassName}
        placeholder={placeholder}
        {...rest}
      />
      {errorMessage && (
        <div className={errorIconWrapperClassName}>
          <ErrorIcon></ErrorIcon>
        </div>
      )}
    </>
  );

  return (
    <div className={inputWrapperClassName}>
      {label && <label className={inputLabelWrapperClassName}>{label}</label>}
      {renderInputField()}
      {errorMessage && <div className={styles.errorMsg}>{errorMessage}</div>}
    </div>
  );
};

Input.defaultProps = {
  as: "input",
  size: "",
  labelSize: "",
  inputSize: "",
  errorStyle: "",
};

Input.propTypes = {
  as: PropTypes.oneOf(["input", "textarea"]).isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  size: PropTypes.oneOf(["small", ""]),
  labelSize: PropTypes.oneOf(["smallLabel", ""]),
  inputSize: PropTypes.oneOf(["form", ""]),
  errorStyle: PropTypes.oneOf(["formErrorIcon", ""]),
};

export default Input;
