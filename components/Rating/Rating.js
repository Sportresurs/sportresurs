import Rating from "@material-ui/lab/Rating";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { useMemo } from "react";
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
  onChange,
}) {
  // allow rating to use static colors which is used in Button and Tags
  function colorFinder(colorToMatch) {
    const matchedColor = dataCompare.colorDescription.find(
      (item) => item.color === colorToMatch
    ).hex;
    return { color: matchedColor };
  }
  const hexColor = useMemo(() => colorFinder(color), [color]);

  return (
    <div className={s.rating}>
      <p className={s.value} style={hexColor}>
        {Number(value).toFixed(1)}
      </p>
      <Rating
        style={hexColor}
        className={s.rate}
        name="rating"
        value={Number(value)}
        max={5}
        precision={precision}
        readOnly={readOnly}
        onChange={onChange}
        size={"small"}
        icon={<StarRoundedIcon fontSize="inherit" />}
        emptyIcon={
          <StarBorderRoundedIcon fontSize="inherit" style={hexColor} />
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
  onChange: PropTypes.func,
};
