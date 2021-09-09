import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ContactUsModalContent from "../ContactUsModalContent";

const ContactUsModal = ({ visible, onClose }) => (
  <Modal variant="medium" visible={visible} onClose={onClose}>
    <ContactUsModalContent onClose={onClose} />
  </Modal>
);

ContactUsModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ContactUsModal;
