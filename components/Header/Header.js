import { useState } from "react";
import Link from "next/link";
import className from "classnames";
import IconBtnMenu from "../../public/svg/btnMenu.svg";
import IconLogoHead from "../../public/svg/logoHead.svg";
import s from "./Header.module.scss";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const combineClassName = className(s.backdrop, s.isOpen);

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleMenuActiveFalse = () => {
    setMenuActive(false);
  };

  return (
    <>
      <header className={s.header}>
        <nav className={s.nav}>
          <button className={s.btnMenu} onClick={handleMenuActive}>
            <IconBtnMenu />
          </button>
          <Link href="">
            <a className={s.navLogo} onClick={handleMenuActiveFalse}>
              <IconLogoHead />
            </a>
          </Link>

          <div
            className={menuActive ? combineClassName : s.backdrop}
            onClick={handleMenuActiveFalse}
          >
            <div className={s.box}>
              <ul className={s.navList}>
                <li className={s.navItem}>
                  <Link href="">
                    <a className={s.navLink}>майданчики</a>
                  </Link>
                </li>
                <li className={s.navItem}>
                  <Link href="">
                    <a className={s.navLink}>карта</a>
                  </Link>
                </li>
                <li className={s.navItem}>
                  <Link href="">
                    <a className={s.navLink}>про нас</a>
                  </Link>
                </li>
                <li className={s.navItem}>
                  <Link href="">
                    <a className={s.navLink}>новини</a>
                  </Link>
                </li>
                <li className={s.navItem}>
                  <Link href="">
                    <a className={s.navLink}>контакти</a>
                  </Link>
                </li>
              </ul>

              <button className={s.btnContact}>Зв’яжіться зі мною</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
