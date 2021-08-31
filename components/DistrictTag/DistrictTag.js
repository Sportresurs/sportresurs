import PropTypes from "prop-types";
import cn from "classnames";
import s from "./DistrictTag.module.scss";

const DistrictTag = ({ text, color }) => (
  <div className={cn(s.wrapper, s[color])}>
    <p className={s.content}>{text}</p>
  </div>
);

DistrictTag.defaultProps = {
  text: "Інший",
  color: "black",
};

DistrictTag.propTypes = {
  text: PropTypes.oneOf([
    "Шевченківський",
    "Франківський",
    "Личаківський",
    "Залізничний",
    "Сихівський",
    "Галицький",
    "Інший",
  ]).isRequired,
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

export default DistrictTag;
