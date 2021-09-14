import { useState } from "react";
import About from "../components/About";
import image from "../components/PlaygroundModalContent/images/image.png";
import PlaygroundModal from "../components/PlaygroundModal";
import ThanksModal from "../components/ThanksModal";
import Button from "../components/Button";
import TopCourts from "../components/TopCourts";
import data from "../utils/testData/testArrs";
import { Grid } from "../components/grid/Grid";
import styles from "../styles/Home.module.scss";
import ContactUsButton from "../components/ContactUsButton";
import Modal123 from "../components/Modal123";

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
    districtColor: "yellow",
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

  // ThanksModal handler
  const [isThankModalOpen, setIsThankModalOpen] = useState(false);
  const handleToggleModal = () => {
    setIsThankModalOpen(!isThankModalOpen);
  };
  return (
    <div className={styles.background}>
      <Grid>
        <Modal123 />
        <TopCourts courtList={data.topCourts} />
        <Button variant="green" size="large" onClick={handleOpen}>
          Open
        </Button>
        <PlaygroundModal
          visible={modal}
          onClose={handleClose}
          playground={playground}
        />
        <ContactUsButton />
        <div id="portal" />
        <About />
        <Button variant="lilac" size="large" onClick={handleToggleModal}>
          Open ThanksModal
        </Button>
        <ThanksModal isShow={isThankModalOpen} onClose={handleToggleModal} />
      </Grid>
    </div>
  );
}
