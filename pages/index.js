import { useState } from "react";
import Button from "../components/button";
import Modal from "../components/modal";
import PlaygroundModal from "../components/modal/PlaygroundModal";

export default function Home() {
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <Button variant="green" size="medium" onClick={handleOpen}>
        Open
      </Button>
      <Modal visible={modal} onClose={handleClose}>
        <PlaygroundModal />
      </Modal>
    </>
  );
}
