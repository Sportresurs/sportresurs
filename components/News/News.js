import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";

const news = [
  {
    id: 0,
    img: image,
    text: "Оновили елементи на Величковського 30.",
    url: "/",
  },
  {
    id: 1,
    img: image,
    text: "Запрошуємо всіх бажаючих відвідати дворик Ратуші, де Управління спорту Львова створили фантастичну фан-зону для підтримки наших олімпійців🙏🏻🔥🤩 Багато цікавих та крутих атракцій🔝 Наше ЛКП Спортресурс в свою чергу допомагало логістикою та перевезенням цінних елементів💪 Приходьте та вболівайте🇺🇦🇺🇦🇺🇦 Тарас Брус Denys Holovko",
    url: "/",
  },
  {
    id: 2,
    img: image,
    text: "Розпочинаємо роботи по об‘єкту на вулиці Стрийська 87. Клуб єдиноборств💪🔝🙏🏻",
    url: "/",
  },
];

export default function News() {
  const getColor = useColorLoop();
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Новини</h2>
      </div>
      <div className={styles.container}>
      {news.map((item) => {
          return <NewsCard key={item.id} newsData={item} color={getColor()} />;
        })}
      </div>
    </>
  );
}
