import PropTypes from "prop-types";
import Image from "next/image";
import cn from "classnames";
import s from "./CourtCard.module.scss";
import Rating from "../Rating";
import Button from "../Button";
import Tag from "../Tag";
import placeholderImg from "../../public/img/court-placeholder.jpg";
import colorMatch from "../../utils/testData/testArrs";

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
          <p className={s.courtNumber}>майданчик №{courtNumber}</p>
          <p className={s.addressOuter}>{address}</p>
          <div className={s.ratingOuter}>
            <Rating readOnly={true} value={rating} color={color} />
          </div>

          <Button size={"small"} variant={color}>
            Детальніше
          </Button>
        </div>
      </div>
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
