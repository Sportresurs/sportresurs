import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.scss";
import DeleteIcon from "../../public/svg/basketIcon.svg";

export default function NewsCard({
  newsData,
  color,
  canDelete,
  onDeleteIconClick,
}) {
  const [showInfo, setShowInfo] = useState(false);

  const handlers = useSwipeable({
    onSwipedUp: () => setShowInfo(true),
    onSwipedDown: () => setShowInfo(false),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  return (
    <Link href={newsData.url} passHref>
      <div className={styles.card} {...handlers}>
        {canDelete ? (
          <div className={styles.deleteIcon}>
            <DeleteIcon
              onClick={() => {
                onDeleteIconClick(newsData);
              }}
            />
          </div>
        ) : null}
        <Image
          src={newsData.imgUrl}
          alt="news-card"
          layout="fill"
          className={styles.image}
        />
        {showInfo ? (
          <div className={styles.infoSwiped} style={{ background: color }}>
            {newsData.text}
          </div>
        ) : (
          <div className={styles.info} style={{ background: color }}>
            {newsData.text}
          </div>
        )}
      </div>
    </Link>
  );
}

NewsCard.propTypes = {
  newsData: PropTypes.object,
  color: PropTypes.string,
};
