import Image from "next/image";
import styles from "./NewsCard.module.scss";
import {
  colorAccentPurple,
  colorAccentBlue,
  colorAccentGreen,
  colorAccentOrange,
  colorAccentYellow,
  colorAccentRed,
} from "../../styles/exportColorVars.module.scss";

export default function NewsCard({ data }) {
  function pickColor() {
    const colorsArr = [
      colorAccentPurple,
      colorAccentBlue,
      colorAccentGreen,
      colorAccentOrange,
      colorAccentYellow,
      colorAccentRed,
    ];
    const randomColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
    return randomColor;
  }

  return (
    <>
      <div className={styles.card}>
        <Image
          src={data.img}
          alt="news-card"
          layout="fill"
          className={styles.image}
        />
        <div className={styles.info} style={{ background: pickColor() }}>
          {data.text}
        </div>
      </div>
    </>
  );
}
