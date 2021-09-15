import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./FilterTag.module.scss";
import CloseIcon from "../../public/svg/closeFilterTag.svg";

const CloseButton = ({ onClick }) => {
  const wrapperIconClasses = classNames(styles.closeButton);
  return (
    <button className={wrapperIconClasses} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

const FilterTag = ({ text, onClick, className }) => {
  const wrapperClasses = classNames(styles.wrapper, className);
  return (
    <div className={wrapperClasses}>
      {text}
      <CloseButton onClick={onClick} />
    </div>
  );
};

FilterTag.defaultProps = {
  text: "",
  onClick: () => {},
};

FilterTag.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default FilterTag;
