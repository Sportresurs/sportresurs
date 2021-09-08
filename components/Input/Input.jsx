import classNames from "classnames";
import styles from "./Input.module.scss";
import Error from "../../public/svg/input_error.svg";

const Input = ({ value, isError = false, label, placeholder, ...rest }) => {
  const combinedClassName = classNames(
    styles.customInput,
    (
      isError ? styles.inputError : ""
    )
  );

  const renderInputField = () => (
    <>
      <input
        value={value}
        className={combinedClassName}
        placeholder={placeholder}
        {...rest}
      />
      {isError && (
        <div className={styles.errorIcon}>
          <Error />
        </div>
      )}
    </>
  );

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      {renderInputField()}
    </div>
  );
};

export default Input;
