import About from "../components/About";
import image from "../components/PlaygroundModalContent/images/image.png";
import TopCourts from "../components/TopCourts";
import { Grid } from "../components/Grid";
import styles from "../styles/Home.module.scss";
import PlaygroundsList from "../components/PlaygroundsList";
import SearchSection from "../components/SearchSection";

export default function Home() {
  const playgrounds = [
    {
      id: 1,
      address: "Тернопільська, 13а, Львів",
      courtNumber: 1,
      rating: 4.5,
      districtColor: "yellow",
      district: "Сихівський",
      type: "спортивний",
      purpose: "не зазначено",
      area: "1630 м. кв.",
      covering: "штучна трава",
      access: "безкоштовний",
      opening: "00:00 - 24:00",
      lighting: "є",
      additionally:
        "огорожа, ворота, тенісний стіл, вуличні тренажери,смітники, лавки, комерційні години (бронювання за телефоном)",
      img: image,
    },
    {
      id: 2,
      address: "Чорноморська, 12, Львів",
      courtNumber: 2,
      rating: 4,
      districtColor: "red",
      district: "Галицький",
      type: "дитячо-спортивний",
      purpose: "футбольний, дитячий",
      area: "1375 м. кв.",
      covering: "штучна трава",
      access: "безкоштовний",
      opening: "08:00 - 22:00",
      lighting: "є",
      additionally: "дитячі елементи, огорожа, ворота",
      img: image,
    },
    {
      id: 3,
      address: "вул. П. Орлика, 5-б, Львів",
      courtNumber: 11,
      rating: 4,
      districtColor: "green",
      district: "Шевченківський",
      type: "спортивний",
      purpose: "футбольний, тренажери, корти",
      area: "970 м. кв.",
      covering: "поліуританове",
      access: "безкоштовний",
      opening: "00:00 - 24:00",
      lighting: "є",
      additionally:
        "огорожа, ворота, тенісний стіл, вуличні тренажери,смітники, лавки, комерційні години (бронювання за телефоном)",
      img: image,
    },
    {
      id: 4,
      address: "вул. Ковельська, 67, Львів",
      courtNumber: 17,
      rating: 4.5,
      districtColor: "orange",
      district: "Личаківський",
      type: "спортивний",
      purpose: "футбольний",
      area: "3000 м. кв.",
      covering: "штучна трава",
      access: "безкоштовний",
      opening: "00:00 - 24:00",
      lighting: "відсутнє",
      additionally: "фут. ворота, огорожа, покриття",
      img: image,
    },
  ];

  return (
    <div className={styles.background}>
      <Grid>
        <SearchSection />
        <TopCourts courtList={playgrounds} />
        <PlaygroundsList />
        <About />
      </Grid>
    </div>
  );
}
