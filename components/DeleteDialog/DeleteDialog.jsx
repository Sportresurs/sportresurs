import React from "react";
import PropTypes from "prop-types";
import Dialog from "../Dialog";
import Button from "../Button";
import styles from "./DeleteDialog.module.scss";
import Basket from "../../public/svg/basket.svg";
import WarningIcon from "../../public/svg/warningIcon.svg";
import deleteDialogTypes from "../../utils/deleteDialogTypes";

const DeleteDialog = ({
  variant,
  visible,
  onCancel,
  shouldLockScreen,
  onClose,
  forAdminLogOut,
}) => {
  function handleInfoChange(type) {
    return deleteDialogTypes.find((el) => el.name === type).value;
  }

  return (
    <Dialog
      shouldLockScreen={shouldLockScreen}
      visible={visible}
      info={
        variant
          ? handleInfoChange(variant)
          : "Ви впевнені, що хочете видалити цей пост?"
      }
      iconRender={() => (forAdminLogOut ? <WarningIcon /> : <Basket />)}
      buttonsRender={() => (
        <>
          <Button
            variant={"white"}
            size={"medium"}
            onClick={onCancel || onClose}
          >
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
};

DeleteDialog.propTypes = {
  variant: PropTypes.oneOf([
    "deleteCourt",
    "deletePost",
    "deleteAdmin",
    "closeCourt",
    "adminLogout",
  ]).isRequired,
  forAdminLogOut: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default DeleteDialog;
