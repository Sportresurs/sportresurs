import React from "react";
import PlaygroundModalContent from "../PlaygroundModalContent";
import Modal from "../modal";

const PlaygroundModal = ({ visible, onClose, playground }) => (
  <Modal visible={visible} onClose={onClose}>
    <PlaygroundModalContent playground={playground} />
  </Modal>
);

export default PlaygroundModal;
