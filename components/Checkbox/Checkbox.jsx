import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ text, state, changeState }) => {
  const checkboxClassName = classNames({
    [styles.checkboxChacked]: state,
    [styles.checkbox]: !state,
  });

  const handler = (e) => {
    e.preventDefault();
    changeState(!state);
  };

  return (
    <div className={styles.wrapper}>
      <textbox onClick={handler} className={checkboxClassName}>
        {text}
      </textbox>
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
