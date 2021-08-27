import  styles from './Input.module.scss';

const Input = ({ value, changeValue, isError = false, label, placeholder }) => {
  const changeInputValue = (e) => changeValue(e.target.value);

  const renderInputField = (clasess = '') => (
    <>
      <input
        value={value}
        onChange={changeInputValue}
        className={`${styles[clasess]} ${styles["custom-input"]} ${isError ? styles["input-error"] : ""}`}
        placeholder={placeholder}
      />
      {isError && <i className={styles["error-icon"]} />}
    </>
  );

  return (
    <div className={styles["input-container"]}>
      {label
      ? <label className={styles["input-label"]}>
          {label}
          <br />
          {renderInputField("margin-top-7")}
        </label>
      : renderInputField()}
    </div>
  );
};

export default Input;
