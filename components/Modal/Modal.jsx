import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import CloseMark from "../../public/svg/closeModal.svg";
import styles from "./modal.module.scss";

const ESC_KEYCODE = 27;
const Modal = ({ children, visible, onClose }) => {
  if (visible) {
    document.body.style.overflow = "hidden";
  }
  const handleClose = useCallback(() => {
    onClose();
    document.body.style.overflow = "";
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
        <button className={styles.btnClose} onClick={handleClose}>
          <CloseMark />
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
