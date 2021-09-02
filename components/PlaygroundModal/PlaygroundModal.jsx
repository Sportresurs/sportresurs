import React from "react";
import PlaygroundModalContent from "../PlaygroundModalContent";
import Modal from "../Modal";

const PlaygroundModal = ({ visible, onClose, playground }) => (
  <Modal visible={visible} onClose={onClose} closeIconMobileVariant="circle">
    <PlaygroundModalContent playground={playground} />
  </Modal>
);

export default PlaygroundModal;
