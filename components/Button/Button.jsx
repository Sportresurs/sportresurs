import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";
import Spinner from "../Spinner";

const Button = ({
  children,
  variant,
  size,
  className,
  isLoading,
  as: RootComponent,
  ...rest
}) => {
  const combinedClassName = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.loading]: isLoading,
    },
    className
  );
  return (
    <RootComponent className={combinedClassName} {...rest}>
      {isLoading ? <Spinner /> : children}
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
    "white",
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
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default Button;
