import { useState } from "react";
import About from "../components/About";
import image from "../components/PlaygroundModalContent/images/image.png";
import PlaygroundModal from "../components/PlaygroundModal";
import Button from "../components/Button";
import TopCourts from "../components/TopCourts";
import data from "../utils/testData/testArrs";
import { Grid } from "../components/Grid";
import styles from "../styles/MapPage.module.scss";
import SearchSection from "../components/SearchSection";

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

  return (
    <div className={styles.background}>
      <Grid>
        <SearchSection />
        <TopCourts courtList={data.topCourts} />
        <div>
          <Button variant="green" size="large" onClick={handleOpen}>
            Открыть модальное окно
          </Button>
        </div>
        <PlaygroundModal
          visible={modal}
          onClose={handleClose}
          playground={playground}
        />
        <About />
      </Grid>
    </div>
  );
}
