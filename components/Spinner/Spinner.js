import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// Instruction - for color props use varibles from '../../styles/exportColorVar.module.scss
// awaiting size props to adjust the size of the spinner (by default as in the design)
// thickness influences width of the spin circle (by default as in design)

export default function Spinner({
  size = "20px",
  thickness = 1.5,
  color = "white",
}) {
  const useStyles = makeStyles(() => ({
    spinner: {
      color,
    },
  }));
  const classes = useStyles();

  return (
    <CircularProgress
      size={size}
      thickness={thickness}
      className={classes.spinner}
    />
  );
}
