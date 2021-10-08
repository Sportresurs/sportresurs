import React from "react";
import PropTypes from "prop-types";
import Dialog from "../Dialog";
import Button from "../Button";
import styles from "./DeleteDialog.module.scss";
import Basket from "../../public/svg/basket.svg";
import WarningIcon from "../../public/svg/warningIcon.svg";
import deleteDialogTypes from "../../utils/deleteDialogTypes";

const DeleteDialog = ({
  variant = "deletePost",
  visible,
  onCancel,
  shouldLockScreen,
  onClose,
  forAdminLogOut,
}) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    visible={visible}
    info={deleteDialogTypes[variant]}
    iconRender={() => (forAdminLogOut ? <WarningIcon /> : <Basket />)}
    buttonsRender={() => (
      <>
        <Button variant={"white"} size={"medium"} onClick={onCancel || onClose}>
          Відмінити
        </Button>
        <Button
          variant="black"
          size="medium"
          className={styles.deleteBtn}
          onClick={onClose}
        >
          {forAdminLogOut ? "Вийти" : "Видалити"}
        </Button>
      </>
    )}
    onClose={onCancel || onClose}
  />
);

DeleteDialog.propTypes = {
  variant: PropTypes.oneOf([
    "deleteCourt",
    "deletePost",
    "deleteAdmin",
    "closeCourt",
    "adminLogout",
  ]),
  forAdminLogOut: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default DeleteDialog;
