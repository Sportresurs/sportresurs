/* eslint-disable jsx-a11y/no-onchange */
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";

const cx = classNames.bind(styles);

export default function Select({ onChange, value, options, type }) {
  return (
    <div
      className={cx("customIcon", {
        tableIcon: type === "table",
        formIcon: type === "form",
      })}
    >
      <select className={cx("select", type)} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  defaultValue: PropTypes.string,
  type: PropTypes.oneOf(["table", "form"]).isRequired,
  options: PropTypes.array.isRequired,
};
