import  styles from './Input.module.scss';

const Input = ({
  value,
  onChange,
  isError = false,
  label,
  placeholder
}) => {
  const renderInputField = (clasess = '') => (
    <input
      value={value}
      onChange={onChange}
      className={`${styles[clasess]} ${styles["custom-input"]} ${isError ? styles['input-error'] : ''}`}
      placeholder={placeholder}
    />
  );

  return (
    <>
      {label
      ? <label className={styles["input-label"]}>
          {label}
          <br />
          {renderInputField('margin-top-7')}
        </label>
      : renderInputField()}
    </>
  );
};

export default Input;
