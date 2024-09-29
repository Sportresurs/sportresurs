import Rating from "@material-ui/lab/Rating";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

import PropTypes from "prop-types";
import s from "./Rating.module.scss";

// if you want to be able to change value dinamically send "readOnly" property with false,
// in opposite case send true

export default function Ratings({
  value = 3.5,
  precision = 0.5,
  readOnly = false,
  color = "#0000",
  onChange,
}) {
  return (
    <div className={s.rating}>
      <p className={s.value} style={{ color }}>
        {Number(value).toFixed(1)}
      </p>
      <Rating
        style={{ color }}
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
          <StarBorderRoundedIcon fontSize="inherit" style={{ color }} />
        }
      />
    </div>
  );
}

Ratings.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  precision: PropTypes.number,
  readOnly: PropTypes.bool,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
