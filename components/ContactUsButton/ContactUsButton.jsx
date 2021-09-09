import React, { useState } from "react";
import Button from "../Button";
import ContactUsModal from "../ContactUsModal";

const ContactUsButton = () => {
  const [modal, setModal] = useState(false);
  const [active, setActive] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleActive = () => {
    setActive(true);
  };
  return (
    <>
      <Button variant="lilac" size="small" onClick={handleOpen}>
        Зв’яжіться зі мною
      </Button>
      <ContactUsModal
        active={active}
        isActive={handleActive}
        visible={modal}
        onClose={handleClose}
      />
    </>
  );
};

export default ContactUsButton;
