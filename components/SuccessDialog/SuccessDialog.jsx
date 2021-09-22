import React from "react";
import Dialog from "../Dialog";

const SuccessDialog = ({ visible, shouldLockScreen, onClose }) => (
  <Dialog
    shouldLockScreen={shouldLockScreen}
    visible={visible}
    title="Готово!"
    info="Ми отримали ваші дані і скоро вам зателефонуємо"
    onClose={onClose}
  />
);

export default SuccessDialog;
