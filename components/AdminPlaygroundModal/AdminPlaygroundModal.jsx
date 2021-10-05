import React from "react";
import Modal from "../Modal";
import AdminPlaygroundModalContent from "../AdminPlaygroundModalContent";

const AdminPlaygroundModal = ({ visible, onClose }) => (
  <Modal variant="large" visible={visible} onClose={onClose} shouldLockScreen>
    <AdminPlaygroundModalContent />
  </Modal>
);

export default AdminPlaygroundModal;
