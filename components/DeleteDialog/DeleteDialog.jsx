import React from "react";
import Dialog from "../Dialog";

const DeleteDialog = ({ isShow, onClose, shouldLockScreen }) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    onClose={onClose}
    isShow={isShow}
    isAdmin={true}
    info="Ви впевнені, що хочете видалити цей пост?"
  />
);

export default DeleteDialog;
