import React, { useState } from "react";
import Button from "../Button";
import ContactUsModal from "../ContactUsModal";
import ThanksModal from "../ThanksModal";

const ContactUsButton = ({ shouldLockScreen }) => {
  const [modal, setModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleSuccessOpen = () => {
    setIsSuccess(true);
  };
  const handleSuccessClose = () => {
    setIsSuccess(false);
  };
  return (
    <>
      <Button variant="lilac" size="small" onClick={handleOpen}>
        Зв’яжіться зі мною
      </Button>
      <ContactUsModal
        shouldLockScreen={shouldLockScreen}
        visible={modal}
        onClose={handleClose}
        onSuccessOpen={handleSuccessOpen}
      />
      <ThanksModal isShow={isSuccess} onClose={handleSuccessClose} />
    </>
  );
};

export default ContactUsButton;
