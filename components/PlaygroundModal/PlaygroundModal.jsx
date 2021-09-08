import React from "react";
import PropTypes from "prop-types";
import PlaygroundModalContent from "../PlaygroundModalContent";
import Modal from "../Modal";
import Portal from "../Portal";

const PlaygroundModal = ({ visible, onClose, playground }) => (
  <Portal>
    <Modal
      variant="large"
      visible={visible}
      onClose={onClose}
      closeIconMobileVariant="circle"
    >
      <PlaygroundModalContent playground={playground} />
    </Modal>
  </Portal>
);

PlaygroundModal.propTypes = {
  playground: PropTypes.object,
  visible: PropTypes.bool,
};
export default PlaygroundModal;
