import styles from "./Error.module.scss";

export default function Error() {
  return (
    <section className={styles.error}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <div className={styles.titleWrapper}>
            <p className={styles.text}>Й</p>
            <span className={styles.ball} role="img" aria-label="basketball">
              🏀
            </span>
            <p className={styles.text}>й</p>
          </div>
          <p className={styles.info}>
            Щось пішло не так{" "}
            <span role="img" aria-label="man-shruging">
              🤷‍♂️
            </span>
            <br />
            Оновіть, будь ласка, сторінку!
          </p>
        </div>
      </div>
    </section>
  );
}
