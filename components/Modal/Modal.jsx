import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
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
const Modal = ({
  variant,
  children,
  visible,
  onClose,
  closeIconMobileVariant,
}) => {
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
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  return (
    <CSSTransition
      in={visible}
      unmountOnExit
      timeout={200}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <div
        className={styles.container}
        role="presentation"
        onClick={handleClose}
      >
        <div
          className={styles[variant]}
          role="presentation"
          onClick={handleContentClick}
        >
          <CloseIcon onClick={handleClose} type={closeIconMobileVariant} />
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
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
