import { useState, useEffect } from "react";
import { captureException } from "@sentry/nextjs";
import axios from "axios";
import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";
import DeleteDialog from "../DeleteDialog";

export default function News({ isAdmin }) {
  const [itemToRemove, setItemToRemove] = useState(null);
  const [news, setNews] = useState([]);
  const handleDeleteDialogOpen = (item) => {
    setItemToRemove(item);
  };
  const handleDeleteDialogClose = () => {
    setItemToRemove(null);
  };
  const getColor = useColorLoop();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/news")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        captureException(err);
      });
  }, [news]);
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Новини</h2>
      </div>
      <div className={styles.container}>
        {news.slice(0, 3).map((item) => (
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
