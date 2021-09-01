import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import styles from "./modal.module.scss";

const ESC_KEYCODE = 27;
const Modal = ({ children, visible, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);
  useEffect(() => {
    const handleWindowKeydown = (e) => {
      if (e.keyCode === ESC_KEYCODE) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleWindowKeydown);
    return () => window.removeEventListener("keydown", handleWindowKeydown);
  }, [visible, handleClose]);

  const wrapperClasses = classNames(styles.modal, {
    [styles.active]: visible,
  });

  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  return visible ? (
    <div className={wrapperClasses} onClick={handleClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <button className={styles.btnClose} onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
