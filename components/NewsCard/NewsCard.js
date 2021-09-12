import Image from "next/image";
import styles from "./NewsCard.module.scss";

export default function NewsCard({ data }) {

  return (
    <>
      <div className={styles.card}>
        <Image
          src={data.img}
          alt="news-card"
          layout="fill"
          className={styles.image}
        />
        <div className={styles.info} >
          {data.text}
        </div>
      </div>
    </>
  );
}
