import Rating from "@material-ui/lab/Rating";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Rating.module.scss";
import dataCompare from "../../utils/testData/testArrs";

// if you want to be able to change value dinamically send "readOnly" property with false,
// in opposite case send true

export default function Ratings({
  value = 3.5,
  precision = 0.5,
  readOnly = false,
  color = "black",
}) {
  const [rating, setRating] = useState(value);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // allow rating to use static colors which is used in Button and Tags
  const colorFinder = (colorToMatch) =>
    dataCompare.colorDescription.find((item) => item.color === colorToMatch)
      .hex;
  const matchedColor = colorFinder(color);

  return (
    <div className={s.rating}>
      <p className={s.value} style={{ color: matchedColor }}>
        {rating.toFixed(1)}
      </p>
      <Rating
        style={{ color: matchedColor }}
        className={s.rate}
        name="rating"
        value={Number(rating)}
        max={5}
        precision={precision}
        readOnly={readOnly}
        onChange={handleRatingChange}
        size={"small"}
        icon={<StarRoundedIcon fontSize="inherit" />}
        emptyIcon={
          <StarBorderRoundedIcon
            fontSize="inherit"
            style={{ color: matchedColor }}
          />
        }
      />
    </div>
  );
}

Ratings.propTypes = {
  value: PropTypes.number,
  precision: PropTypes.number,
  readOnly: PropTypes.bool,
  color: PropTypes.oneOf([
    "orange",
    "green",
    "blue",
    "lilac",
    "black",
    "red",
    "yellow",
  ]).isRequired,
};
