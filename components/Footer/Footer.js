import Link from "next/link";
import classNames from "classnames/bind";
import { useContext } from "react";
import styles from "./Footer.module.scss";
import Logo from "../../public/svg/logo.svg";
import LogoMobile from "../../public/svg/logoMobile.svg";
import FacebookIcon from "../../public/svg/facebook.svg";
import InstaIcon from "../../public/svg/insta.svg";
import { Context } from "../../context";
import { changeGender, capitalize } from "../../utils/strings";

const cx = classNames.bind(styles);

const courtsLink = [
  { link: "/playgrounds", name: "волейбольний" },
  { link: "/playgrounds", name: "дитячий" },
  { link: "/playgrounds", name: "футбольний" },
  { link: "/playgrounds", name: "гімнастичний" },
  { link: "/playgrounds", name: "баскетбольний" },
  { link: "/playgrounds", name: "тенісний" },
  { link: "/playgrounds", name: "гандбольний" },
];

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
  const { handleFilterPurpose } = useContext(Context);
  const handleFilterClick = (ev) => {
    const target = ev.currentTarget;
    handleFilterPurpose({
      value: target.dataset.id,
      label: capitalize(target.dataset.id),
    });
  };
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
              Спортивна інфраструктура
            </h3>

            <ul className={styles.footerCourtsList}>
              {courtsLink.map((item) => (
                <li key={item.name} className={styles.footerCourtsLink}>
                  <Link href={item.link}>
                    <a data-id={item.name} onClick={handleFilterClick}>
                      {changeGender(item.name)}
                    </a>
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
          <p>
            @2021. Усі права захищені. Сайт розроблено
            <a href="https://keenethics.com/" target="_blank" rel="noreferrer">
              KeenEthics
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
