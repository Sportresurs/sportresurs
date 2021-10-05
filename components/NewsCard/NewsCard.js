import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import Image from "next/image";
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
    onTap: () => setShowInfo(true),
  });

  return (
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
        className={styles.image}
        layout="fill"
      />
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={showInfo ? styles.infoMore : styles.info}
        style={{ background: color }}
        onClick={() => setShowInfo(false)}
      >
        {newsData.text}
      </div>
    </div>
  );
}

NewsCard.propTypes = {
  newsData: PropTypes.object,
  color: PropTypes.string,
};
