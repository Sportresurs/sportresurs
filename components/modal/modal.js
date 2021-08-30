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
        onClose();
      }
    };
    window.addEventListener("keydown", handleWindowKeydown);
    return () => window.removeEventListener("keydown", handleWindowKeydown);
  }, [visible, onClose]);

  const wrapperClasses = classNames(styles.modal, {
    [styles.active]: visible,
  });

  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  return visible ? (
    <div className={wrapperClasses}>
      <div className={styles.modal_content} onClick={handleContentClick}>
        <button className={styles.btn_close} onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
