import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./FilterTag.module.scss";
import CloseIcon from "../../public/svg/closeFilterTag.svg";
import StarIcon from "../../public/svg/starForFilterTag.svg";

const CloseButton = ({ onClick }) => {
  const wrapperIconClasses = classNames(styles.closeButton);
  return (
    <button className={wrapperIconClasses} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

const FilterTag = ({ data, deleteTag, className }) => {
  const wrapperClasses = classNames(styles.wrapper, className);
  const bodyClasses = classNames({
    [styles.bodyFilterTag]: typeof data.value === "number",
  });
  return (
    <div className={wrapperClasses}>
      <div className={bodyClasses}>
        {data.value}
        {typeof data.value === "number" ? <StarIcon /> : null}
      </div>
      <CloseButton onClick={() => deleteTag(data)} />
    </div>
  );
};

FilterTag.defaultProps = {
  text: "",
  onClick: () => {},
};

FilterTag.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export default FilterTag;
