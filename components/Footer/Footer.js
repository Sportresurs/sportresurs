import Link from "next/link";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Image from "next/dist/client/image";
import styles from "./Footer.module.scss";
import Logo from "../../public/svg/logo.svg";
import LogoMobile from "../../public/svg/logoMobile.svg";
import FacebookIcon from "../../public/svg/facebook.svg";
import InstaIcon from "../../public/svg/insta.svg";
import axiosInstance from "../../api/axiosInstance";
import keenLogo from "../../public/img/keen-logo.png";

const cx = classNames.bind(styles);

const socialLinks = [
  {
    className: cx("footerSocialsItemLink", "facebook"),
    link: "https://www.facebook.com/lkpsportresurs/",
    icon: FacebookIcon,
  },
  {
    className: cx("footerSocialsItemLink", "insta"),
    link: "https://www.instagram.com/sport_resurs/?hl=en",
    icon: InstaIcon,
  },
];
export default function Footer() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axiosInstance.get("/purpose").then((res) => {
      setTypes(res.data.purposes.slice(0, 9));
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoDesktop}>
            <Link passHref={true} href={"/"}>
              <a className={styles.logoLink}>
                <Logo />
              </a>
            </Link>
          </div>

          <div className={styles.logoMobile}>
            <Link href={"/"}>
              <a className={styles.logoLink}>
                <LogoMobile />
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.footerSocials}>
          <p className={styles.footerSocialsText}>Наші соціальні мережі:</p>
          <ul className={styles.footerSocialsList}>
            {socialLinks.map(({ link, className, icon: Icon }) => (
              <li key={link} className={styles.footerSocialsItem}>
                <a
                  className={className}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {<Icon className={styles.socialIcon} />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.flexWrapper}>
          <div className={styles.footerCourts}>
            <h3 className={styles.footerCourtsTitle}>
              Спортивна та дитяча інфраструктура
            </h3>

            <ul className={styles.footerCourtsList}>
              {types?.map((item) => (
                <li key={item.title} className={styles.footerCourtsLink}>
                  <Link href={`/playgrounds?purposeOfAreas=${item.title}`}>
                    <a data-id={item.title}>{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerContacts} id="navigateToContacts">
            <h3 className={styles.footerContactsTitle}>Контакти</h3>
            <address className={styles.footerContactsAddress}>
              <p>79008, Львів,</p>
              <p>пл. Маланюка, 6</p>
              <a href="tel:+380322546078" className={styles.footerTelephone}>
                +380322546078
              </a>
              <a href="tel:+380972160985" className={styles.footerTelephone}>
                +380972160985
              </a>
            </address>
          </div>
        </div>

        <div className={styles.legal}>
          <p className={styles.keenText}>
            @2021. Усі права захищені. Сайт розроблено
          </p>
          <a href="https://keenethics.com/" target="_blank" rel="noreferrer">
            <Image src={keenLogo} width={150} height={40} alt="keen-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
