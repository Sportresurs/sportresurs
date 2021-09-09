import React, { useState } from "react";
import Button from "../Button";
import ContactUsModal from "../ContactUsModal";

const ContactUsButton = () => {
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <Button variant="lilac" size="small" onClick={handleOpen}>
        Зв’яжіться зі мною
      </Button>
      <ContactUsModal visible={modal} onClose={handleClose} />
    </>
  );
};

export default ContactUsButton;
