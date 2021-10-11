import { useState } from "react";
import styles from "./News.module.scss";
import NewsCard from "../NewsCard";
import useColorLoop from "../../utils/hooks/useColorLoop";
import DeleteDialog from "../DeleteDialog";
import Slider from "../Slider";
import useFetchData from "../../utils/hooks/useFetchData";
import useWindowSize from "../../utils/hooks/findWindowSize";

export default function News({ isAdmin }) {
  const [itemToRemove, setItemToRemove] = useState(null);
  const size = useWindowSize();

  const calculateWidth = (value) => {
    let width = null;

    if (value >= 1001 && value <= 1149) {
      width = 820;
    }
    if (value >= 901 && value <= 1149) {
      width = value * 0.82;
    }
    if (value >= 751 && value <= 900) {
      width = value * 0.86;
    }
    if (value >= 601 && value <= 750) {
      width = value * 0.88;
    }
    if (value <= 600) {
      width = value * 0.9;
    }

    return width;
  };

  const widthOfContainer = calculateWidth(size.width);

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
      <div className={styles.containerList} style={{ width: widthOfContainer }}>
        <Slider
          slidesToShow={3}
          slidesToScroll={3}
          isInfinite={true}
          isAutoplay={false}
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
