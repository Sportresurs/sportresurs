import PropTypes from "prop-types";
import className from "classnames";
import styles from "./Tag.module.scss";

const Tag = ({ text, color }) => (
  <div className={className(styles.wrapper)} style={{ backgroundColor: color }}>
    <p className={styles.content}>{text}</p>
  </div>
);

Tag.defaultProps = {
  text: "Another",
  color: "#ffff",
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Tag;
