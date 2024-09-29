import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";
import Spinner from "../Spinner";

const Button = ({
  children,
  color,
  size,
  className,
  isLoading,
  as: RootComponent,
  ...rest
}) => {
  const combinedClassName = classNames(
    styles.button,
    styles[size],
    {
      [styles.loading]: isLoading,
    },
    className
  );
  return (
    <RootComponent
      style={{ backgroundColor: color }}
      className={combinedClassName}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </RootComponent>
  );
};

Button.defaultProps = {
  color: "#d12421",
  size: "medium",
  as: "button",
};

Button.propTypes = {
  as: PropTypes.oneOf(["a", "button"]).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    "mobile",
    "small",
    "medium-dense",
    "medium",
    "large",
    "enormous",
  ]).isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default Button;
