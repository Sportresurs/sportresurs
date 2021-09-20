import React from "react";
import Dialog from "../Dialog";

const SuccessDialog = ({ isShow, onClose, shouldLockScreen }) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    onClose={onClose}
    isShow={isShow}
    header="Готово!"
    info="Ми отримали ваші дані і скоро вам зателефонуємо"
  />
);

export default SuccessDialog;
