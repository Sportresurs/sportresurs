import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ContactUsModalContent from "../ContactUsModalContent";

const ContactUsModal = ({ visible, onClose }) => (
  <Modal variant="medium" visible={visible} onClose={onClose}>
    <ContactUsModalContent />
  </Modal>
);

ContactUsModal.propTypes = {
  visible: PropTypes.bool,
};
export default ContactUsModal;
