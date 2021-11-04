import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import AdminPlaygroundModalContent from "../AdminPlaygroundModalContent";

const AdminPlaygroundModal = ({ visible, onClose, area, images }) => (
  <Modal variant="large" visible={visible} onClose={onClose} shouldLockScreen>
    <AdminPlaygroundModalContent
      onClose={onClose}
      area={area}
      images={images}
    />
  </Modal>
);
AdminPlaygroundModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  area: PropTypes.object,
  images: PropTypes.array,
};
export default AdminPlaygroundModal;
