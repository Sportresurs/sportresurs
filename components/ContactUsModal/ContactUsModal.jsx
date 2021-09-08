import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ContactUsModalContent from "../ContactUsModalContent";
import Portal from "../Portal";

const ContactUsModal = ({ visible, onClose }) => (
  <Portal>
    <Modal variant="medium" visible={visible} onClose={onClose}>
      <ContactUsModalContent onClose={onClose} />
    </Modal>
  </Portal>
);

ContactUsModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ContactUsModal;
