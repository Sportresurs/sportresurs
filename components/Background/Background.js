import PropTypes from "prop-types";
import s from "./Background.module.scss";

const Background = ({ variant }) => (
  <>
    {variant === "homePage" && (
      <>
        <div className={s.homeTopLeftBasketBg}></div>
        <div className={s.homeTopRightBasketBg}></div>
        <div className={s.homeBottomLeftTenisBg}></div>
        <div className={s.homeBottomRightBasketBg}></div>
      </>
    )}
    {variant === "playgroundsPage" && (
      <>
        <div className={s.playgroundsLeftBg}></div>
        <div className={s.playgroundsRightBg}></div>
      </>
    )}
    {variant === "mapList" && (
      <>
        <div className={s.mapTenisBg}></div>
      </>
    )}
  </>
);

export default Background;

Background.propTypes = {
  variant: PropTypes.oneOf(["playgroundsPage", "mapList", "homePage"])
    .isRequired,
};
