import Link from "next/link";
import styles from "./Page404.module.scss";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <p className={styles.title}>
            Сторінку не знайдено
            <span role="img" aria-label="man-shruging">
              🤷‍♂️
            </span>
          </p>
          <p className={styles.text}>
            Без паніки! Ви завжди можете повернутись на нашу головну сторінку
            <span role="img" aria-label="man-shruging">
              😎
            </span>
          </p>
          <Link href={"/"}>
            <a className={styles.link}>На головну</a>
          </Link>
        </div>
      </div>
    </section>
  );
}
