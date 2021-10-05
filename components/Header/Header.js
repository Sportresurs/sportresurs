/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import className from "classnames/bind";
import IconBtnMenu from "../../public/svg/btnMenu.svg";
import IconLogoHead from "../../public/svg/logoHead.svg";
import styles from "./Header.module.scss";
import ContactUsButton from "../ContactUsButton";
import useWindowSize from "../../utils/hooks/findWindowSize";
import setHeightOfHeader from "../../utils/findHeightOfHeader";

const cx = className.bind(styles);

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const router = useRouter();
  const size = useWindowSize();
  const heightOfHeader = useMemo(() => setHeightOfHeader(size.width), [size]);

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleMenuActiveFalse = (e) => {
    if (router.route === "/") {
      e.preventDefault();

      setMenuActive(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setMenuActive(false);
  };

  const handleScrollToAnchor = (e) => {
    e.preventDefault();

    const anchor = document.getElementById(e.target.attributes.anchor.value);
    if (anchor) {
      const y =
        anchor.getBoundingClientRect().top +
        window.pageYOffset +
        heightOfHeader;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSetRoute = (e) => {
    e.preventDefault();

    router.push({
      pathname: "/",
      query: { anchorName: e.target.attributes.anchor.value },
    });
  };

  const scrollToAnchor = useCallback(
    (id) => {
      const anchorTarget = document.getElementById(id);
      if (anchorTarget) {
        const y =
          anchorTarget.getBoundingClientRect().top +
          window.pageYOffset +
          heightOfHeader;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [heightOfHeader]
  );

  useEffect(() => {
    if (router.query.anchorName) {
      setTimeout(() => {
        scrollToAnchor(router.query.anchorName);
      }, 0);
    }
  }, [router, router.query.anchorName, scrollToAnchor]);

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
            onClick={() => setMenuActive(false)}
          >
            <div className={styles.box}>
              <ul className={styles.navList}>
                <li
                  className={cx("navItem", {
                    active: router.pathname === "/playgrounds",
                  })}
                >
                  <Link href="/playgrounds">
                    <a className={styles.navLink}>майданчики</a>
                  </Link>
                </li>
                <li
                  className={cx("navItem", {
                    active: router.pathname === "/map",
                  })}
                >
                  <Link href="/map">
                    <a className={styles.navLink}>карта</a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/?anchorName=navigateToAboutUs">
                    <a
                      className={styles.navLink}
                      anchor="navigateToAboutUs"
                      onClick={
                        router.route === "/"
                          ? handleScrollToAnchor
                          : handleSetRoute
                      }
                    >
                      про нас
                    </a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/?anchorName=navigateToNews">
                    <a
                      className={styles.navLink}
                      anchor="navigateToNews"
                      onClick={
                        router.route === "/"
                          ? handleScrollToAnchor
                          : handleSetRoute
                      }
                    >
                      новини
                    </a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/?anchorName=navigateToContacts">
                    <a
                      className={styles.navLink}
                      anchor="navigateToContacts"
                      onClick={
                        router.route === "/"
                          ? handleScrollToAnchor
                          : handleSetRoute
                      }
                    >
                      контакти
                    </a>
                  </Link>
                </li>
              </ul>

              <ContactUsButton shouldLockScreen={true} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
