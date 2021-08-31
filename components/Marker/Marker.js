import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import s from "./Marker.module.scss";
import BasketballCourt from "../../public/svg/basketballCourt.svg";
import TenisCourt from "../../public/svg/tenisCourt.svg";
import TreadmillsCourt from "../../public/svg/treadmillsCourt.svg";
import ChildrenCourt from "../../public/svg/childrenCourt.svg";
import FootballCourt from "../../public/svg/footballCourt.svg";
import StreetWorkoutCourt from "../../public/svg/streetWorkoutCourt.svg";
import SkateCourt from "../../public/svg/skateCourt.svg";
import SportsCourt from "../../public/svg/sportsCourt.svg";

const cx = cn.bind(s);

const Marker = ({ typeOfCourt, bgColor }) => (
  <button className={s.btnMarker}>
    <svg
      width="40"
      height="51"
      viewBox="0 0 40 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={s[bgColor]}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.86479 5.87525C9.61416 2.11918 14.6976 0.00626657 20 0C25.3024 0.00626657 30.3858 2.11918 34.1352 5.87525C37.8846 9.63131 39.9937 14.7238 40 20.0357C40.0062 24.3746 38.5914 28.5957 35.9727 32.0517L35.9709 32.0571C35.9709 32.0571 35.4236 32.7748 35.3436 32.8713L20 51L4.66365 32.8804C4.57456 32.7766 4.02911 32.0571 4.02911 32.0571C1.40908 28.5997 -0.00632943 24.3766 2.1278e-05 20.0357C0.00627667 14.7238 2.11542 9.63131 5.86479 5.87525Z"
        fill="#9C1A87"
      />
    </svg>

    {typeOfCourt === "Скейт-майданчик" && (
      <SkateCourt
        className={cx("icon", {
          blackColor: typeOfCourt === "Скейт-майданчик",
        })}
      />
    )}
    {typeOfCourt === "Спортивний" && <SportsCourt className={s.iconS} />}
    {typeOfCourt === "Дитячий" && <ChildrenCourt className={s.icon} />}
    {typeOfCourt === "Баскетбольний" && <BasketballCourt className={s.icon} />}
    {typeOfCourt === "Тенісний" && <TenisCourt className={s.icon} />}
    {typeOfCourt === "Футбольний" && <FootballCourt className={s.icon} />}
    {typeOfCourt === "Бігові доріжки" && <TreadmillsCourt className={s.icon} />}
    {typeOfCourt === "Стріт воркаут" && (
      <StreetWorkoutCourt className={s.icon} />
    )}
  </button>
);

Marker.defaultProps = {
  typeOfCourt: "Футбольний",
  bgColor: "green",
};

Marker.propTypes = {
  typeOfCourt: PropTypes.oneOf([
    "Скейт-майданчик",
    "Спортивний",
    "Дитячий",
    "Баскетбольний",
    "Тенісний",
    "Футбольний",
    "Бігові доріжки",
    "Стріт воркаут",
  ]).isRequired,
  bgColor: PropTypes.oneOf([
    "lilac",
    "red",
    "blue",
    "yellow",
    "orange",
    "green",
    "black",
  ]).isRequired,
};

export default Marker;
