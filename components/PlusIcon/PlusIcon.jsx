import PropTypes from "prop-types";
import styles from "./PlusIcon.module.scss";

export default function PlusIcon({ onClick }) {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      <div className={styles.plus}>+</div>
    </button>
  );
}

PlusIcon.PropTypes = {
  onClick: PropTypes.func,
};