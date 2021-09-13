import classNames from "classnames";
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

const FilterTag = ({ text, onClick }) => (
  <div className={styles.wrapper}>
    {text}
    <CloseButton onClick={onClick} />
  </div>
);

export default FilterTag;
