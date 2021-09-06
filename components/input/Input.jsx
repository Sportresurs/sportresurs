import styles from "./Input.module.scss";
import Error from "../../public/svg/input_error.svg";

const Input = ({ value, changeValue, isError = false, label, placeholder }) => {
  const changeInputValue = (e) => changeValue(e.target.value);

  const renderInputField = () => (
    <>
      <input
        value={value}
        onChange={changeInputValue}
        className={`${styles["custom-input"]} ${
          isError ? styles["input-error"] : ""
        }`}
        placeholder={placeholder}
      />
      {isError && (
        <div className={styles["error-icon"]}>
          <Error />
        </div>
      )}
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
