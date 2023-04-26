import * as React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./Marker.module.scss";
import BasketballCourt from "../../public/img/basketballCourt.png";
import TennisCourt from "../../public/img/tennisCourt.png";
import ChildCourt from "../../public/img/childCourt.png";
import FootballCourt from "../../public/img/footballCourt.png";
import HandballCourt from "../../public/img/handballCourt.png";
import VolleyballCourt from "../../public/img/volleyballCourt.png";
import GymnasticCourt from "../../public/img/gymnasticCourt.png";
import MultiSelectCourt from "../../public/img/multiSelectCourt.png";
import WithoutTypeCourt from "../../public/img/withoutTypeCourt.png";
import MapMarker from "../../public/svg/mapMarker.svg";
import DefaultMarker from "../../public/svg/defaultMarker.svg";
import Gym from "../../public/img/gym.png";
import Stadium from "../../public/img/stadium.png";
import SwimmingPool from "../../public/img/swimming_pool.png";
import SkatePark from "../../public/img/skate_park.png";
import MartialArts from "../../public/img/martial_arts.png";
import Workout from "../../public/img/workout.png";

const Marker = ({ typeOfCourt, district, isCourtMarker }) => {
  const courtIcons = {
    BasketballCourt,
    TennisCourt,
    ChildCourt,
    FootballCourt,
    HandballCourt,
    VolleyballCourt,
    GymnasticCourt,
    MultiSelectCourt,
    WithoutTypeCourt,
    Gym,
    Stadium,
    SwimmingPool,
    SkatePark,
    MartialArts,
    Workout,
    Inclusive,
    InclusiveElements,
  };

  const districtToColor = {
    Halitskyi: "red",
    Zaliznychnyi: "lilac",
    Lychakivskyi: "orange",
    Sykhivskyi: "yellow",
    Frankivskyi: "blue",
    Shevchenkivskyi: "green",
    Another: "black",
  };
  return (
    <>
      {isCourtMarker ? (
        <button className={styles.btnMarker}>
          <MapMarker className={styles[districtToColor[district]]} />

          <div className={styles.icon}>
            <Image
              src={courtIcons[typeOfCourt]}
              alt={typeOfCourt}
              width={20}
              height={20}
            />
          </div>
        </button>
      ) : (
        <button className={styles.btnMarker}>
          <DefaultMarker />
        </button>
      )}
    </>
  );
};

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
    "Gym",
    "Stadium",
    "SwimmingPool",
    "SkatePark",
    "MartialArts",
    "Workout",
    "Inclusive",
    "InclusiveElements",
  ]).isRequired,
  district: PropTypes.oneOf([
    "Halitskyi",
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
