import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import cn from "classnames";
import s from "./CourtCard.module.scss";
import Tag from "../Tag";
import placeholderImg from "../../public/img/court-placeholder.jpg";
import colorMatch from "../../utils/testData/testArrs";
import CourtCardInfo from "../CourtCardInfo";
import PlaygroundModal from "../PlaygroundModal";

export default function CourtCard({ courtInfo, variant = "topList" }) {
  const {
    district = "Інший",
    address = "Адреса не вказана",
    courtNumber = 0,
    rating = 3,
    /* image, */ // for future data base
  } = courtInfo;

  // to match color with color in Button and Tag components
  const districtColor = (region) =>
    colorMatch.districtColors.find((item) => item.district === region).color;

  const color = districtColor(district);

  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <div className={cn(s.card, s[variant])}>
        <div className={s.inner}>
          <div className={s.district}>
            <Tag text={district} color={color}></Tag>
          </div>
          <Image src={placeholderImg} alt="court" layout="fill" />
          <p className={s.address}>{address}</p>
        </div>
        <div className={s.outer}>
          <CourtCardInfo
            courtNumber={courtNumber}
            address={address}
            color={color}
            rating={rating}
            modal={handleOpen}
          />
        </div>
      </div>
      <PlaygroundModal
        visible={modal}
        onClose={handleClose}
        playground={courtInfo}
      />
    </>
  );
}

CourtCard.propTypes = {
  courtInfo: PropTypes.shape({
    district: PropTypes.oneOf([
      "Шевченківський",
      "Франківський",
      "Личаківський",
      "Залізничний",
      "Сихівський",
      "Галицький",
      "Інший",
    ]).isRequired,
    address: PropTypes.string.isRequired,
    courtNumber: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }),
  variant: PropTypes.oneOf(["topList", "courtList"]),
};
