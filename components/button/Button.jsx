import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.scss";

const Button = ({
  children,
  variant,
  size,
  className,
  as: RootComponent,
  ...rest
}) => {
  const combinedClassName = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className
  );
  return (
    <RootComponent className={combinedClassName} {...rest}>
      {children}
    </RootComponent>
  );
};

Button.defaultProps = {
  variant: "orange",
  size: "medium",
  as: "button",
};

Button.propTypes = {
  as: PropTypes.oneOf(["a", "button"]).isRequired,
  variant: PropTypes.oneOf([
    "orange",
    "green",
    "blue",
    "lilac",
    "black",
    "red",
    "yellow",
  ]).isRequired,
  size: PropTypes.oneOf([
    "mobile",
    "small",
    "medium-dense",
    "medium",
    "large",
    "enormous",
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default Button;
