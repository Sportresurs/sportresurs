import { useState } from "react";
import About from "../components/About";
import image from "../components/PlaygroundModalContent/images/image.png";
import PlaygroundModal from "../components/PlaygroundModal";
import Button from "../components/Button";
import TopCourts from "../components/TopCourts";
import data from "../utils/testData/testArrs";
import MultiSelect from "../components/MultiSelect/MultiSelect";

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

  // for multi select testing
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <MultiSelect
        data={data.districts}
        value={selectedOption}
        handleChange={handleChange}
        type="район"
      />
      <TopCourts courtList={data.topCourts} />
      <Button variant="green" size="large" onClick={handleOpen}>
        Open
      </Button>
      <PlaygroundModal
        visible={modal}
        onClose={handleClose}
        playground={playground}
      />
      <About />
    </>
  );
}
