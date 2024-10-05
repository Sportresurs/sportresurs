import React from "react";
import PropTypes from "prop-types";
import PlaygroundModalContent from "../PlaygroundModalContent";
import Modal from "../Modal";

const PlaygroundModal = ({ visible, onClose, playground, isModal }) => (
  <Modal
    variant="large"
    visible={visible}
    onClose={onClose}
    closeIconMobileVariant="circle"
    shouldLockScreen
  >
    <PlaygroundModalContent playground={playground} isModal={isModal} />
  </Modal>
);

PlaygroundModal.propTypes = {
  playground: PropTypes.object,
  visible: PropTypes.bool,
};
export default PlaygroundModal;
