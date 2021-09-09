import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ContactUsModalContent from "../ContactUsModalContent";

const ContactUsModal = ({
  visible,
  onClose,
  onSuccessOpen,
  shouldLockScreen,
}) => (
  <Modal
    shouldLockScreen={shouldLockScreen}
    variant="medium"
    visible={visible}
    onClose={onClose}
  >
    <ContactUsModalContent
      onSuccessOpen={onSuccessOpen}
      visible={visible}
      onClose={onClose}
    />
  </Modal>
);

ContactUsModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ContactUsModal;
