import Link from "next/link";
import s from "./Footer.module.scss";
import Logo from "../../public/svg/logo.svg";
import LogoMobile from "../../public/svg/logoMobile.svg";
import FacebookIcon from "../../public/svg/facebook.svg";
import InstaIcon from "../../public/svg/insta.svg";
import TwitterIcon from "../../public/svg/twitter.svg";

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
            <li className={s.footerSocialsItem}>
              <a
                className={(s.footerSocialsItemLink, s.facebook)}
                href="https://www.facebook.com/"
              >
                <FacebookIcon className={s.socialIcon} />
              </a>
            </li>
            <li className={s.footerSocialsItem}>
              <a
                className={(s.footerSocialsItemLink, s.insta)}
                href="https://www.instagram.com/"
              >
                <InstaIcon className={s.socialIcon} />
              </a>
            </li>
            <li className={s.footerSocialsItem}>
              <a
                className={(s.footerSocialsItemLink, s.twitter)}
                href="https://twitter.com/"
              >
                <TwitterIcon className={s.socialIcon} />
              </a>
            </li>
          </ul>
        </div>

        <div className={s.flexWrapper}>
          <div className={s.footerCourts}>
            <h3 className={s.footerCourtsTitle}>Майданчики</h3>
            <div className={s.footerCourtsWrapper}>
              <ul className={`${s.footerCourtsList} ${s.footerCourtsListLeft}`}>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Спортивний</a>
                  </Link>
                </li>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Дитячий</a>
                  </Link>
                </li>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Стріт воркаут</a>
                  </Link>
                </li>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Скейт-майданчик</a>
                  </Link>
                </li>
              </ul>
              <ul
                className={`${s.footerCourtsList} ${s.footerCourtsListRight}`}
              >
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Баскетбольний</a>
                  </Link>
                </li>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Тенісний </a>
                  </Link>
                </li>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Футбольний з штучним покриттям </a>
                  </Link>
                </li>
                <li className={s.footerCourtsLink}>
                  <Link href={"/"}>
                    <a>Бігові доріжки</a>
                  </Link>
                </li>
              </ul>
            </div>
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
          <p>@2021. Сайт розроблено KeenEthics . Усі права захищені</p>
        </div>
      </div>
    </footer>
  );
}
