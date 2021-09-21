import React from "react";
import Dialog from "../Dialog";
import Button from "../Button";
import styles from "./DeleteDialog.module.scss";
import Basket from "../../public/svg/basket.svg";

const DeleteDialog = ({ isShow, shouldLockScreen, onClose }) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    visible={isShow}
    info="Ви впевнені, що хочете видалити цей пост?"
    onClose={onClose}
    iconRender={() => <Basket />}
    buttonsRender={() => (
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
    )}
  />
);

export default DeleteDialog;
