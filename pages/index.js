import { useState } from "react";
import Button from "../components/Button";
import About from "../components/About";
import ContactUsModal from "../components/ContactUsModal";

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
      <Button variant="green" size="large" onClick={handleOpen}>
        Open
      </Button>
      <ContactUsModal visible={modal} onClose={handleClose} />
      <About />
    </>
  );
}
