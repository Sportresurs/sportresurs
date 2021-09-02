import { useState } from "react";
import image from "../components/PlaygroundModalContent/images/image.png";
import PlaygroundModal from "../components/PlaygroundModal";
import Button from "../components/Button";

export default function Home() {
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  const playground = {
    id: 1,
    address: "Тернопільська, 13а, Львів",
    district: "Сихівський",
    type: "спортивний",
    purpose: "не зазначено",
    area: "1630 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "08:00 - 22:00",
    lighting: "є",
    additionally:
      "огорожа, ворота, тенісний стіл, вуличні тренажери,смітники, лавки, комерційні години (бронювання за телефоном)",
    img: image,
  };
  return (
    <>
      <Button variant="green" size="large" onClick={handleOpen}>
        Open
      </Button>
      <PlaygroundModal
        visible={modal}
        onClose={handleClose}
        playground={playground}
      />
    </>
  );
}
