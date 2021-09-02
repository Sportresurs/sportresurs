import PropTypes from "prop-types";
import cn from "classnames";
import s from "./Tag.module.scss";

const Tag = ({ text, color }) => (
  <div className={cn(s.wrapper, s[color])}>
    <p className={s.content}>{text}</p>
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
