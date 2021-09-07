import PropTypes from "prop-types";
import s from "./Background.module.scss";
import BasketBg from "../../public/svg/basketBg.svg";
import FootballBg from "../../public/svg/footballBg.svg";
import FootballBgLilac from "../../public/svg/footballBgLilac.svg";
import TenisBg from "../../public/svg/tenisBg.svg";
import TenisBgGreen from "../../public/svg/tenisBgGreen.svg";
import colors from "../../styles/exportColorVars.module.scss";

const Background = ({ variant }) => (
  <>
    {variant === "homePage" && (
      <>
        <div className={s.homeTopLeftBasketBg}>
          <BasketBg fill={colors.colorAccentGreen} />
        </div>
        <div className={s.homeTopRightBasketBg}>
          <BasketBg fill={colors.colorAccentBlue} />
        </div>
        <div className={s.homeBottomLeftBasketBg}>
          <TenisBg />
        </div>
        <div className={s.homeBottomRightBasketBg}>
          <FootballBg />
        </div>
      </>
    )}
    {variant === "playgroundsPage" && (
      <>
        <div className={s.playgroundsLeftBg}>
          <FootballBgLilac />
        </div>
        <div className={s.playgroundsRightBg}>
          <BasketBg />
        </div>
      </>
    )}
    {variant === "mapList" && (
      <>
        <div className={s.mapTenisBg}>
          <TenisBgGreen />
        </div>
      </>
    )}
  </>
);

export default Background;

Background.propTypes = {
  variant: PropTypes.oneOf(["playgroundsPage", "mapList", "homePage"])
    .isRequired,
};
