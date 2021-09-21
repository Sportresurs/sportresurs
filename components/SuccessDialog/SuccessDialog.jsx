import React from "react";
import Dialog from "../Dialog";

const SuccessDialog = ({ isShow, shouldLockScreen, onClose }) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    visible={isShow}
    title="Готово!"
    info="Ми отримали ваші дані і скоро вам зателефонуємо"
    onClose={onClose}
  />
);

export default SuccessDialog;
