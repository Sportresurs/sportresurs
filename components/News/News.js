import { useState } from "react";
import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";
import image from "../../public/img/court-placeholder.jpg";
import DeleteDialog from "../DeleteDialog";
import Slider from "../Slider";

const news = [
  {
    id: 0,
    imgUrl: image,
    text: "Оновили елементи на Величковського 30.",
    url: "/",
  },
  {
    id: 1,
    imgUrl: image,
    text: "Запрошуємо всіх бажаючих відвідати дворик Ратуші, де Управління спорту Львова створили фантастичну фан-зону для підтримки наших олімпійців🙏🏻🔥🤩 Багато цікавих та крутих атракцій🔝 Наше ЛКП Спортресурс в свою чергу допомагало логістикою та перевезенням цінних елементів💪 Приходьте та вболівайте🇺🇦🇺🇦🇺🇦 Тарас Брус Denys Holovko",
    url: "/",
  },
  {
    id: 2,
    imgUrl: image,
    text: "Розпочинаємо роботи по об‘єкту на вулиці Стрийська 87. Клуб єдиноборств💪🔝🙏🏻",
    url: "/",
  },
  {
    id: 3,
    imgUrl: image,
    text: "Оновили елементи на Величковського 30.",
    url: "/",
  },
  {
    id: 4,
    imgUrl: image,
    text: "Запрошуємо всіх бажаючих відвідати дворик Ратуші, де Управління спорту Львова створили фантастичну фан-зону для підтримки наших олімпійців🙏🏻🔥🤩 Багато цікавих та крутих атракцій🔝 Наше ЛКП Спортресурс в свою чергу допомагало логістикою та перевезенням цінних елементів💪 Приходьте та вболівайте🇺🇦🇺🇦🇺🇦 Тарас Брус Denys Holovko",
    url: "/",
  },
  {
    id: 5,
    imgUrl: image,
    text: "Розпочинаємо роботи по об‘єкту на вулиці Стрийська 87. Клуб єдиноборств💪🔝🙏🏻",
    url: "/",
  },
  {
    id: 6,
    imgUrl: image,
    text: "Оновили елементи на Величковського 30.",
    url: "/",
  },
  {
    id: 7,
    imgUrl: image,
    text: "Запрошуємо всіх бажаючих відвідати дворик Ратуші, де Управління спорту Львова створили фантастичну фан-зону для підтримки наших олімпійців🙏🏻🔥🤩 Багато цікавих та крутих атракцій🔝 Наше ЛКП Спортресурс в свою чергу допомагало логістикою та перевезенням цінних елементів💪 Приходьте та вболівайте🇺🇦🇺🇦🇺🇦 Тарас Брус Denys Holovko",
    url: "/",
  },
  {
    id: 8,
    imgUrl: image,
    text: "Розпочинаємо роботи по об‘єкту на вулиці Стрийська 87. Клуб єдиноборств💪🔝🙏🏻",
    url: "/",
  },
  {
    id: 9,
    imgUrl: image,
    text: "Оновили елементи на Величковського 30.",
    url: "/",
  },
  {
    id: 10,
    imgUrl: image,
    text: "Запрошуємо всіх бажаючих відвідати дворик Ратуші, де Управління спорту Львова створили фантастичну фан-зону для підтримки наших олімпійців🙏🏻🔥🤩 Багато цікавих та крутих атракцій🔝 Наше ЛКП Спортресурс в свою чергу допомагало логістикою та перевезенням цінних елементів💪 Приходьте та вболівайте🇺🇦🇺🇦🇺🇦 Тарас Брус Denys Holovko",
    url: "/",
  },
  {
    id: 11,
    imgUrl: image,
    text: "Розпочинаємо роботи по об‘єкту на вулиці Стрийська 87. Клуб єдиноборств💪🔝🙏🏻",
    url: "/",
  },
  {
    id: 12,
    imgUrl: image,
    text: "Оновили елементи на Величковського 30.",
    url: "/",
  },
  {
    id: 13,
    imgUrl: image,
    text: "Запрошуємо всіх бажаючих відвідати дворик Ратуші, де Управління спорту Львова створили фантастичну фан-зону для підтримки наших олімпійців🙏🏻🔥🤩 Багато цікавих та крутих атракцій🔝 Наше ЛКП Спортресурс в свою чергу допомагало логістикою та перевезенням цінних елементів💪 Приходьте та вболівайте🇺🇦🇺🇦🇺🇦 Тарас Брус Denys Holovko",
    url: "/",
  },
  {
    id: 14,
    imgUrl: image,
    text: "Розпочинаємо роботи по об‘єкту на вулиці Стрийська 87. Клуб єдиноборств💪🔝🙏🏻",
    url: "/",
  },
];

export default function News({ isAdmin }) {
  const [itemToRemove, setItemToRemove] = useState(null);
  const handleDeleteDialogOpen = (item) => {
    setItemToRemove(item);
  };
  const handleDeleteDialogClose = () => {
    setItemToRemove(null);
  };
  const getColor = useColorLoop();
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Новини</h2>
      </div>
      <div className={styles.container}>
        <Slider
          slidesToShow={3}
          slidesToScroll={3}
          isInfinite={true}
          isAutoplay={true}
          withArrows={false}
          isModal={false}
          arrayLength={news.length}
          responsive={[
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 990,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {news.map((item) => (
            <NewsCard
              key={item.id}
              newsData={item}
              color={getColor()}
              canDelete={isAdmin}
              onDeleteIconClick={handleDeleteDialogOpen}
            />
          ))}
        </Slider>
      </div>
      <DeleteDialog visible={itemToRemove} onClose={handleDeleteDialogClose} />
    </>
  );
}
