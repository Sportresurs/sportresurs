import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import styles from "./Dialog.module.scss";
import ThumbUpIcon from "../../public/svg/thumbUp.svg";

const Dialog = ({
  visible,
  shouldLockScreen,
  title,
  info,
  buttonsRender,
  iconRender,
  onClose,
}) => (
  <Modal
    shouldLockScreen={shouldLockScreen}
    variant="small"
    visible={visible}
    onClose={onClose}
  >
    <div className={styles.modal}>
      <div className={styles.icon}>
        {iconRender ? iconRender() : <ThumbUpIcon />}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{info}</p>
      <div>
        {buttonsRender ? (
          buttonsRender()
        ) : (
          <Button variant="black" size="medium" onClick={onClose}>
            Добре
          </Button>
        )}
      </div>
    </div>
  </Modal>
);

export default Dialog;
