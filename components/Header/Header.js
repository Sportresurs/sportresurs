import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const menuOpen = `${styles.backdrop} ${styles.isOpen}`;

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleMenuActiveFalse = () => {
    setMenuActive(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button className={styles.btn_menu} onClick={handleMenuActive}>
          <Image src="/btnMenu.svg" alt="menu" width={34} height={23}></Image>
        </button>
        <Link href="">
          <a className={styles.nav__logo} onClick={handleMenuActiveFalse}>
            <Image
              src="/logoHead.svg"
              alt="logo"
              width={105}
              height={15}
            ></Image>
          </a>
        </Link>

        <div
          className={menuActive ? menuOpen : styles.backdrop}
          onClick={handleMenuActiveFalse}
        >
          <div className={styles.box}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <Link href="">
                  <a className={styles.nav__link}>майданчики</a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="">
                  <a className={styles.nav__link}>карта</a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="">
                  <a className={styles.nav__link}>про нас</a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="">
                  <a className={styles.nav__link}>новини</a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="">
                  <a className={styles.nav__link}>контакти</a>
                </Link>
              </li>
            </ul>

            <button className={styles.btn_contact}>Зв’яжіться зі мною</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
