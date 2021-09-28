import * as React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Marker.module.scss";
import BasketballCourt from "../../public/img/basketballCourt.png";
import TennisCourt from "../../public/img/tennisCourt.png";
import ChildCourt from "../../public/img/childCourt.png";
import FootballCourt from "../../public/img/footballCourt.png";
import HandballCourt from "../../public/img/handballCourt.png";
import VolleyballCourt from "../../public/img/volleyballCourt.png";
import GymnasticCourt from "../../public/img/gymnasticCourt.png";
import MultiSelectCourt from "../../public/svg/multiSelectCourt.svg";
import WithoutTypeCourt from "../../public/img/withoutTypeCourt.png";
import MapMarker from "../../public/svg/mapMarker.svg";
import DefaultMarker from "../../public/svg/defaultMarker.svg";

const cx = className.bind(styles);

const Marker = ({ typeOfCourt, district, isCourtMarker }) => (
  <>
    {isCourtMarker ? (
      <button className={styles.btnMarker}>
        <MapMarker
          className={cx({
            red: district === "Halytskyi",
            lilac: district === "Zaliznychnyi",
            orange: district === "Lychakivskyi",
            yellow: district === "Sykhivskyi",
            blue: district === "Frankivskyi",
            green: district === "Shevchenkivskyi",
            black: district === "Another",
          })}
        />

        {typeOfCourt === "BasketballCourt" && (
          <div className={styles.icon}>
            <Image
              src={BasketballCourt}
              alt={typeOfCourt}
              width="20"
              height="20"
            />
          </div>
        )}
        {typeOfCourt === "TennisCourt" && (
          <div className={styles.icon}>
            <Image src={TennisCourt} alt={typeOfCourt} width="20" height="20" />
          </div>
        )}
        {typeOfCourt === "ChildCourt" && (
          <div className={styles.icon}>
            <Image src={ChildCourt} alt={typeOfCourt} width="20" height="20" />
          </div>
        )}
        {typeOfCourt === "FootballCourt" && (
          <div className={styles.icon}>
            <Image
              src={FootballCourt}
              alt={typeOfCourt}
              width="20"
              height="20"
            />
          </div>
        )}
        {typeOfCourt === "HandballCourt" && (
          <div className={styles.icon}>
            <Image
              src={HandballCourt}
              alt={typeOfCourt}
              width="20"
              height="20"
            />
          </div>
        )}
        {typeOfCourt === "VolleyballCourt" && (
          <div className={styles.icon}>
            <Image
              src={VolleyballCourt}
              alt={typeOfCourt}
              width="20"
              height="20"
            />
          </div>
        )}
        {typeOfCourt === "GymnasticCourt" && (
          <div className={styles.icon}>
            <Image
              src={GymnasticCourt}
              alt={typeOfCourt}
              width="20"
              height="20"
            />
          </div>
        )}

        {typeOfCourt === "WithoutTypeCourt" && (
          <div className={styles.icon}>
            <Image
              src={WithoutTypeCourt}
              alt={typeOfCourt}
              width="20"
              height="20"
            />
          </div>
        )}
        {typeOfCourt === "MultiSelectCourt" && (
          <MultiSelectCourt className={styles.icon} />
        )}
      </button>
    ) : (
      <button className={styles.btnMarker}>
        <DefaultMarker />
      </button>
    )}
  </>
);

Marker.defaultProps = {
  typeOfCourt: "FootballCourt",
  district: "Shevchenkivskyi",
  isCourtMarker: true,
};

Marker.propTypes = {
  typeOfCourt: PropTypes.oneOf([
    "GymnasticCourt",
    "VolleyballCourt",
    "ChildCourt",
    "BasketballCourt",
    "TennisCourt",
    "FootballCourt",
    "HandballCourt",
    "MultiSelectCourt",
    "WithoutTypeCourt",
  ]).isRequired,
  district: PropTypes.oneOf([
    "Halytskyi",
    "Zaliznychnyi",
    "Lychakivskyi",
    "Sykhivskyi",
    "Frankivskyi",
    "Shevchenkivskyi",
    "Another",
  ]).isRequired,
  isCourtMarker: PropTypes.oneOf([true, false]).isRequired,
};

export default Marker;
