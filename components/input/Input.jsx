import styles from "./Input.module.scss";

const Input = ({ value, isError = false, label, placeholder, ...rest }) => {

  const renderInputField = () => (
    <>
      <input
        value={value}
        className={`${styles["custom-input"]} ${
          isError ? styles["input-error"] : ""
        }`}
        placeholder={placeholder}
        {...rest}
      />
      {isError && <i className={styles["error-icon"]} />}
    </>
  );

  return (
    <div className={styles["input-container"]}>
      {label && <label className={styles["input-label"]}>{label}</label>}
      {renderInputField()}
    </div>
  );
};

export default Input;
