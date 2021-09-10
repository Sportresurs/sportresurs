import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import classnames from "classnames/bind";
import styles from "./Slider.module.scss";
import Arrow from "../../public/svg/sliderArrow.svg";

const cx = classnames.bind(styles);

const SliderWrap = styled.div`
  ${(props) =>
    props.margin &&
    `.slick-slider {
    position: relative;
    .slick-list {
      margin: 0 -${props.margin / 2}px;
      .slick-track {
        .slick-slide > div {
          padding: 0 ${props.margin / 2}px;
        }
      }
    }
  }`}
`;

const SlickSlider = ({
  children,
  isDots,
  slidesToShow,
  slidesToScroll,
  speed,
  isInfinite,
  islazyLoad,
  isSwipe,
  isVariableWidth,
  isArrows,
  responsive,
  spaceBetween,
  isModal,
}) => {
  const [indexImage, setIndexImage] = useState(0);

  const NextArrow = ({ onClick }) => (
    <button
      type="button"
      className={classnames(styles.arrow, styles.next)}
      onClick={onClick}
    >
      <Arrow className={styles.arrowIcon} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      type="button"
      className={cx("arrow", "prev", {
        hidden: indexImage === 0,
      })}
      onClick={onClick}
    >
      <Arrow className={styles.arrowIcon} />
    </button>
  );

  const settings = {
    dotsClass: cx("dotsWrap", {
      modal: isModal === true,
    }),
    dots: isDots,
    slidesToShow,
    slidesToScroll,
    speed,
    infinite: isInfinite,
    lazyLoad: islazyLoad,
    swipe: isSwipe,
    variableWidth: isVariableWidth,
    arrows: isArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setIndexImage(next),
    responsive,
  };

  return (
    <SliderWrap margin={spaceBetween}>
      <h2> Multiple items </h2>
      <Slider {...settings}>{children}</Slider>
    </SliderWrap>

    /* <div className={s.sliderBox}>
      <h2> Multiple items </h2>
      <Slider {...settings}>{children}</Slider>
    </div> */
  );
};

export default SlickSlider;
