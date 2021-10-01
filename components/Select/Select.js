/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";

const cx = classNames.bind(styles);

export default function Select({
  defaultValue,
  options,
  type,
  label,
  labelSize,
  ...rest
}) {
  const [value, setValue] = useState(defaultValue);
  const inputLabelWrapperClassName = classNames(
    styles.inputLabel,
    styles[labelSize]
  );
  const handleOptionChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {label && <label className={inputLabelWrapperClassName}>{label}</label>}
      <div
        className={cx("customIcon", {
          tableIcon: type === "table",
          formIcon: type === "form",
        })}
      >
        <select
          className={cx("select", type)}
          value={value}
          onChange={handleOptionChange}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

Select.propTypes = {
  defaultValue: PropTypes.string,
  type: PropTypes.oneOf(["table", "form"]).isRequired,
  options: PropTypes.array.isRequired,
};
