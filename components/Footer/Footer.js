import Link from "next/link";
import s from "./Footer.module.scss";
import Logo from "../../public/svg/logo.svg";
import LogoMobile from "../../public/svg/logoMobile.svg";
import FacebookIcon from "../../public/svg/facebook.svg";
import InstaIcon from "../../public/svg/insta.svg";

const socialLinks = [
  {
    className: ["footerSocialsItemLink facebook"],
    link: "https://www.facebook.com/lkpsportresurs/",
    icon: <FacebookIcon className={s.socialIcon} />,
  },
  {
    className: ["footerSocialsItemLink insta"],
    link: "https://www.instagram.com/sport_resurs/?hl=en",
    icon: <InstaIcon className={s.socialIcon} />,
  },
];

const courtsLink = [
  { link: "/", name: "Волейбольний" },
  { link: "/", name: "Дитячий" },
  { link: "/", name: "Футбольний" },
  { link: "/", name: "Гімнастичний" },
  { link: "/", name: "Баскетбольний" },
  { link: "/", name: "Тенісний" },
  { link: "/", name: "Гандбольний" },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.logo}>
          <div className={s.logoDesktop}>
            <Link passHref={true} href={"/"}>
              <a className={s.logoLink}>
                <Logo />
              </a>
            </Link>
          </div>

          <div className={s.logoMobile}>
            <Link href={"/"}>
              <a className={s.logoLink}>
                <LogoMobile />
              </a>
            </Link>
          </div>
        </div>

        <div className={s.footerSocials}>
          <p className={s.footerSocialsText}>Наші соціальні мережі:</p>
          <ul className={s.footerSocialsList}>
            {socialLinks.map((item) => (
              <li key={item.link} className={s.footerSocialsItem}>
                <a
                  className={item.className}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.flexWrapper}>
          <div className={s.footerCourts}>
            <h3 className={s.footerCourtsTitle}>Майданчики</h3>

            <ul className={s.footerCourtsList}>
              {courtsLink.map((item) => (
                <li key={item.name} className={s.footerCourtsLink}>
                  <Link href={item.link}>
                    <a>{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.footerContacts}>
            <h3 className={s.footerContactsTitle}>Контакти</h3>
            <address className={s.footerContactsAddress}>
              <p>79008, Львів,</p>
              <p>пл. Ринок, 1, каб. 516</p>
              <a href="tel:+38012345678" className={s.footerTelephone}>
                +38012345678
              </a>
            </address>
          </div>
        </div>

        <div className={s.legal}>
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
