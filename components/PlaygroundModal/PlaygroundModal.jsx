import React from "react";
import PropTypes from "prop-types";
import PlaygroundModalContent from "../PlaygroundModalContent";
import Modal from "../Modal";

const PlaygroundModal = ({ visible, onClose, playground }) => (
  <Modal visible={visible} onClose={onClose} closeIconMobileVariant="circle">
    <PlaygroundModalContent playground={playground} />
  </Modal>
);

PlaygroundModal.propTypes = {
  playground: PropTypes.object,
  visible: PropTypes.bool,
};
export default PlaygroundModal;
