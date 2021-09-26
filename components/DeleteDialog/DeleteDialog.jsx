import React from "react";
import Dialog from "../Dialog";
import Button from "../Button";
import styles from "./DeleteDialog.module.scss";
import Basket from "../../public/svg/basket.svg";

const DeleteDialog = ({ visible, shouldLockScreen, onClose }) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    visible={visible}
    info="Ви впевнені, що хочете видалити цей пост?"
    iconRender={() => <Basket />}
    buttonsRender={() => (
      <>
        <Button variant={"white"} size={"medium"} onClick={onClose}>
          Відмінити
        </Button>
        <Button
          variant="black"
          size="medium"
          className={styles.deleteBtn}
          onClick={onClose}
        >
          Видалити
        </Button>
      </>
    )}
    onClose={onClose}
  />
);

export default DeleteDialog;
