import { useState } from "react";
import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";
import DeleteDialog from "../DeleteDialog";
import Slider from "../Slider";
import useFetchData from "../../utils/hooks/useFetchData";

export default function News({ isAdmin }) {
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleDeleteDialogOpen = (item) => {
    setItemToRemove(item);
  };
  const handleDeleteDialogClose = () => {
    setItemToRemove(null);
  };
  const getColor = useColorLoop();

  const [news] = useFetchData(`/api/news`, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer} id="navigateToNews">
        <h2 className={styles.title}>Новини</h2>
      </div>
      <div className={styles.containerList}>
        <Slider
          slidesToShow={3}
          slidesToScroll={3}
          isInfinite={true}
          isAutoplay={true}
          withArrows={false}
          isModal={false}
          isVariableWidth={true}
          arrayLength={news.length}
          classNameBox={styles.newsSlider}
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
    </div>
  );
}
