import Image from "next/image";
import classNames from "classnames";
import styles from "./NewsCard.module.scss";
import {
  colorAccentPurple,
  colorAccentBlue,
  colorAccentGreen,
  colorAccentOrange,
  colorAccentYellow,
  colorAccentRed,
} from "../../styles/exportColorVars.module.scss";
import img from "../../public/img/court-placeholder.jpg";

export default function NewsCard() {
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
      <div className={classNames(styles.card, styles.newsList)}>
        <Image src={img} alt="news-card" layout="fill" />
        <div className={styles.info} style={{ background: pickColor() }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget
          convallis erat, in gravida nunc. Etiam iaculis est ut turpis
          ultricies, non pellentesque augue molestie. Mauris at molestie nisi.
          Aliquam erat volutpat. In consequat purus sed lacus aliquet
          pellentesque. Sed quis nisl at lacus suscipit maximus non sed leo.
          Maecenas sed tortor sed enim blandit pellentesque. Proin ullamcorper
          bibendum ligula, vel tempor arcu congue efficitur.
        </div>
      </div>
    </>
  );
}