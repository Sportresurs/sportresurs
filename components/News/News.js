import { useState, useEffect } from "react";
import { captureException } from "@sentry/nextjs";
import axios from "axios";
import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";
import DeleteDialog from "../DeleteDialog";
import Slider from "../Slider";

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
        <Slider
          slidesToShow={3}
          slidesToScroll={3}
          isInfinite={true}
          isAutoplay={true}
          isArrows={false}
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
