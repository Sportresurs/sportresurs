import styles from "./News.module.scss";
import NewsCard from "../NewsCard";

export default function News({ news }) {
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Новини</h2>
      </div>
      <div className={styles.container}>
        <NewsCard data={news[0]} />;
        <NewsCard data={news[1]} />;
        <NewsCard data={news[2]} />;
      </div>
    </>
  );
}
