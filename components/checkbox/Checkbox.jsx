import styles from './Checkbox.module.scss';

const Checkbox = ({ text = '', state = false, changeState }) => {
  const handler = (e) => {
    e.preventDefault();
    changeState(!state)
  }

  return (
      <div className={styles["checkbox-container"]}>
        <label onClick={handler} className={state ? styles["checkbox-label-chacked"] : styles["checkbox-label"]}>
          <input
            className={styles["checkbox-input"]}
            type="checkbox"
          />
          {text}
        </label>
      </div>
  );
};

export default Checkbox;
