import PropTypes from "prop-types";
import className from "classnames";
import styles from "./Tag.module.scss";

const Tag = ({ text, color }) => (
  <div className={className(styles.wrapper, styles[color])}>
    <p className={styles.content}>{text}</p>
  </div>
);

Tag.defaultProps = {
  text: "Another",
  color: "black",
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "lilac",
    "red",
    "blue",
    "yellow",
    "orange",
    "green",
    "black",
  ]).isRequired,
};

export default Tag;
