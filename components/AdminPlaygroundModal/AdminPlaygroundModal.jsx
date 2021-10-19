import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import AdminPlaygroundModalContent from "../AdminPlaygroundModalContent";

const AdminPlaygroundModal = ({ visible, onClose }) => (
  <Modal variant="large" visible={visible} onClose={onClose} shouldLockScreen>
    <AdminPlaygroundModalContent onClose={onClose} />
  </Modal>
);
AdminPlaygroundModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AdminPlaygroundModal;
