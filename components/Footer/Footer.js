import styles from "../../styles/Footer.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.wrapper}`}>
          <div className={styles["logo-desktop"]}>
            <Image
              src="/logo.svg"
              alt="спортресурс"
              width={280}
              height={40}
            ></Image>
          </div>

          <div className={styles["logo-mobile"]}>
            <Image
              src="/logo.svg"
              alt="спортресурс"
              width={151}
              height={22}
            ></Image>
          </div>

          <div className={styles["footer--socials"]}>
            <p className={styles["footer--socials--text"]}>
              Наші соціальні мережі:
            </p>
            <ul className={styles["footer--socials--list"]}>
              <li className={styles["footer--socials--item"]}>
                <a
                  className={styles["footer--socials--item--link"]}
                  href="https://www.facebook.com/"
                >
                  <Image
                    src="/facebook.svg"
                    alt="facebook link"
                    width={31}
                    height={31}
                  />
                </a>
              </li>
              <li className={styles["footer--socials--item"]}>
                <a
                  className={styles["footer--socials--item--link"]}
                  href="https://www.instagram.com/"
                >
                  <Image
                    src="/insta.svg"
                    alt="facebook link"
                    width={31}
                    height={31}
                  />
                </a>
              </li>
              <li className={styles["footer--socials--item"]}>
                <a
                  className={styles["footer--socials--item--link"]}
                  href="https://twitter.com/"
                >
                  <Image
                    src="/twitter.svg"
                    alt="facebook link"
                    width={31}
                    height={31}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles["flex-wrapper"]}>
          <div className={styles["footer--courts"]}>
            <h3 className={styles["footer--courts--title"]}>Майданчики</h3>
            <div className={styles["footer--courts--wrapper"]}>
              <ul
                className={`${styles["footer--courts--list"]} ${styles["footer--courts--list-left"]}`}
              >
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Спортивний</a>
                  </Link>
                </li>
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Дитячий</a>
                  </Link>
                </li>
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Стріт воркаут</a>
                  </Link>
                </li>
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Скейт-майданчик</a>
                  </Link>
                </li>
              </ul>
              <ul
                className={`${styles["footer--courts--list"]} ${styles["footer--courts--list-right"]}`}
              >
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Баскетбольний</a>
                  </Link>
                </li>
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Тенісний </a>
                  </Link>
                </li>
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Футбольний з штучним покриттям </a>
                  </Link>
                </li>
                <li className={styles["footer--courts--link"]}>
                  <Link href={"/"}>
                    <a>Бігові доріжки</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles["footer--contacts"]}>
            <h3 className={styles["footer--contacts--title"]}>Контакти</h3>
            <address className={styles["footer--contacts--address"]}>
              <p>79008, Львів,</p>
              <p>пл. Ринок, 1, каб. 516</p>
              <a href="tel:+38012345678">+38012345678</a>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
