import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ text, state, changeState }) => {
  const checkboxClassName = classNames({
    [styles.checkboxChecked]: state,
    [styles.checkbox]: !state,
  });

  const handler = (e) => {
    e.preventDefault();
    changeState(!state);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handler} className={checkboxClassName}>
        <p className={styles.text}>{text}</p>
      </button>
    </div>
  );
};

Checkbox.defaultProps = {
  state: false,
  text: "",
  changeState: () => {},
};

Checkbox.propTypes = {
  text: PropTypes.string,
  state: PropTypes.bool,
  changeState: PropTypes.func,
};

export default Checkbox;
