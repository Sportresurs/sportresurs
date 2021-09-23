import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.scss";

export default function NewsCard({ newsData, color }) {
  return (
    <Link href={newsData.url} passHref>
      <div className={styles.card}>
        <Image
          src={newsData.imgUrl}
          alt="news-card"
          layout="fill"
          className={styles.image}
        />
        <div className={styles.info} style={{ background: color }}>
          {newsData.text}
        </div>
      </div>
    </Link>
  );
}

NewsCard.propTypes = {
  newsData: PropTypes.object,
  color: PropTypes.string,
};
