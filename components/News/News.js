import { useState } from "react";
import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";
import image from "../../public/img/court-placeholder.jpg";
import DeleteDialog from "../DeleteDialog";

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
      <div className={styles.titleContainer} id="navigateToNews">
        <h2 className={styles.title}>Новини</h2>
      </div>
      <div className={styles.container}>
        {news.map((item) => (
          <NewsCard
            key={item.id}
            newsData={item}
            color={getColor()}
            canDelete={isAdmin}
            onDeleteIconClick={handleDeleteDialogOpen}
          />
        ))}
      </div>
      <DeleteDialog visible={itemToRemove} onClose={handleDeleteDialogClose} />
    </>
  );
}
