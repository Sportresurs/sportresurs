import Rating from "@material-ui/lab/Rating";
import s from "./Rating.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { useState } from "react";

// Instruction - for color props use varibles from '../../styles/exportColorVar.module.scss
// if you want to be able to change value dinamically send "readOnly" property with false,
// in opposite case send true

export default function Ratings({
  value = 3.5,
  precision = 0.5,
  readOnly = false,
  color = "#150223",
}) {
  const [rating, setRating] = useState(value);
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const useStyles = makeStyles(() => ({
    root: {
      color,
    },
    emptyStar: {
      color,
    },
  }));
  const classes = useStyles();

  return (
    <div className={s.rating}>
      <p className={s.value} style={{ color: color }}>
        {rating}
      </p>
      <Rating
        className={classes.root}
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
            className={classes.emptyStar}
          />
        }
      />
    </div>
  );
}
