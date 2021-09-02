import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CloseMark from "../../public/svg/closeModal.svg";
import styles from "./Modal.module.scss";

const ESC_KEYCODE = 27;
const CloseIcon = ({ onClick, type }) => {
  const wrapperIconClasses = classNames(styles.closeButton, styles[type]);
  return (
    <button className={wrapperIconClasses} onClick={onClick}>
      <CloseMark />
    </button>
  );
};
const Modal = ({ children, visible, onClose, closeIconMobileVariant }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);
  useEffect(() => {
    const handleWindowKeydown = (e) => {
      if (e.keyCode === ESC_KEYCODE) {
        handleClose();
      }
    };
    if (visible) {
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("keydown", handleWindowKeydown);
    return function cleanup() {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleWindowKeydown);
    };
  }, [visible, handleClose]);

  const wrapperClasses = classNames(styles.container, {
    [styles.active]: visible,
  });
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  return visible ? (
    <div className={wrapperClasses} role="presentation" onClick={handleClose}>
      <div
        className={styles.modal}
        role="presentation"
        onClick={handleContentClick}
      >
        <CloseIcon onClick={handleClose} type={closeIconMobileVariant} />
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  type: PropTypes.oneOf(["circle", ""]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  visible: PropTypes.bool,
};
CloseIcon.propTypes = {
  type: PropTypes.oneOf(["circle", ""]),
};
export default Modal;
