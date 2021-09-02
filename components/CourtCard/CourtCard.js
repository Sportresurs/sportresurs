import PropTypes from "prop-types";
import cn from "classnames";
import s from "./CourtCard.module.scss";
import Rating from "../Rating";
import Button from "../button";
import Tag from "../Tag";
import colorMatch from "../../utils/testData/testArrs";

export default function CourtCard({ courtInfo, variant = "topList" }) {
  const { district, address, courtNumber, rating, image } = courtInfo;

  // to match color with color in Button and Tag components
  const districtColor = (region) =>
    colorMatch.districtColors.find((item) => item.district === region).color;

  const color = districtColor(district);

  return (
    <>
      <div className={cn(s.card, s[variant])}>
        <div>
          <div className={s.district}>
            <Tag text={district} color={color}></Tag>
          </div>

          <img className={s.image} src={image} alt="court" />
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
