import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import styles from "./Dialog.module.scss";
import ThumbUpIcon from "../../public/svg/thumbUp.svg";
import Basket from "../../public/svg/basket.svg";

const Dialog = ({
  isShow,
  onClose,
  header,
  info,
  isAdmin = false,
  shouldLockScreen,
}) => (
  <Modal
    shouldLockScreen={shouldLockScreen}
    variant="small"
    visible={isShow}
    onClose={onClose}
  >
    <div className={styles.modal}>
      {isAdmin ? (
        <Basket className={styles.icon} />
      ) : (
        <ThumbUpIcon className={styles.icon} />
      )}
      <h1 className={styles.title}>{header}</h1>
      <p className={styles.text}>{info}</p>
      <div>
        {isAdmin ? (
          <>
            <Button variant={"white"} size={"medium"} onClick={onClose}>
              Відмінити
            </Button>
            <Button
              variant="black"
              size="medium"
              onClick={onClose}
              className={styles.deleteBtn}
            >
              Видалити
            </Button>
          </>
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
