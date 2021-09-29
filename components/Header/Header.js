import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import className from "classnames/bind";
import IconBtnMenu from "../../public/svg/btnMenu.svg";
import IconLogoHead from "../../public/svg/logoHead.svg";
import styles from "./Header.module.scss";
import ContactUsButton from "../ContactUsButton";
import LoginButton from "../LoginButton";

const cx = className.bind(styles);

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [session] = useSession();

  useEffect(() => {
    if (session) {
      setIsAdminLoggedIn(true);
    }
  }, [isAdminLoggedIn, session]);

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleMenuActiveFalse = () => {
    setMenuActive(false);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <button className={styles.btnMenu} onClick={handleMenuActive}>
            <IconBtnMenu />
          </button>
          <Link href="/">
            <a className={styles.navLogo} onClick={handleMenuActiveFalse}>
              <IconLogoHead />
            </a>
          </Link>

          <div
            className={cx("backdrop", {
              isOpen: menuActive,
            })}
            onClick={handleMenuActiveFalse}
          >
            <div className={styles.box}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/playgrounds">
                    <a className={styles.navLink}>майданчики</a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="">
                    <a className={styles.navLink}>карта</a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="">
                    <a className={styles.navLink}>про нас</a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="">
                    <a className={styles.navLink}>новини</a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="">
                    <a className={styles.navLink}>контакти</a>
                  </Link>
                </li>
              </ul>
              {isAdminLoggedIn ? (
                <LoginButton setIsAdminLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <ContactUsButton shouldLockScreen={true} />
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
