import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

// Instruction - for color props use varibles from '../../styles/exportColorVar.module.scss
// if you want to be able to change value dinamically send "readOnly" property with false,
// in opposite case send true

export default function Ratings({
  onChange,
  defaultValue = 3.5,
  precision = 0.5,
  readOnly = false,
  color = "#150223",
}) {
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
    <Rating
      className={classes.root}
      name="rating"
      defaultValue={defaultValue}
      precision={precision}
      readOnly={readOnly}
      onChange={onChange}
      size={"small"}
      icon={<StarRoundedIcon fontSize="inherit" />}
      emptyIcon={
        <StarBorderRoundedIcon
          fontSize="inherit"
          className={classes.emptyStar}
        />
      }
    />
  );
}
