import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/* import MagicSliderDots from "react-magic-slider-dots"; */
import styled from "styled-components";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import styles from "./Slider.module.scss";
import Arrow from "../../public/svg/sliderArrow.svg";
/* import useWindowSize from "./hook"; */

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
  isAutoplay,
  autoplaySpeed,
  isArrows,
  responsive,
  margin,
  isModal,
  /* arrayLength, */
}) => {
  const [indexImage, setIndexImage] = useState(0);
  /* const size = useWindowSize();

  let widthOfDot = 28.5;
  if (isModal && size.width > 767) {
    widthOfDot = 28.5;
  }
  if (isModal && size.width < 768) {
    widthOfDot = 20;
  }
  if (isModal === false && size.width > 767) {
    widthOfDot = 32.5;
  }
  if (isModal === false && size.width < 768) {
    widthOfDot = 28.5;
  } */

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
    autoplay: isAutoplay,
    autoplaySpeed,
    arrows: isArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive,
    beforeChange: (current, next) => setIndexImage(next),
    /* appendDots: (dots) => (
      <div>
        <MagicSliderDots
          dots={dots}
          numDotsToShow={arrayLength > 5 ? 5 : arrayLength}
          dotWidth={widthOfDot}
          dotContainerClassName={cx("dotsBar")}
        />
      </div>
    ), */
  };

  return (
    <SliderWrap margin={margin}>
      <Slider {...settings}>{children}</Slider>
    </SliderWrap>
  );
};

SlickSlider.defaultProps = {
  isDots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  isInfinite: false,
  speed: 500,
  islazyLoad: true,
  isSwipe: true,
  isVariableWidth: false,
  isAutoplay: false,
  autoplaySpeed: 3000,
  isArrows: true,
  responsive: null,
  isModal: false,
  margin: 30,
};

SlickSlider.propTypes = {
  isDots: PropTypes.oneOf([true, false]),
  slidesToShow: PropTypes.number.isRequired,
  slidesToScroll: PropTypes.number.isRequired,
  isInfinite: PropTypes.oneOf([true, false]),
  speed: PropTypes.number,
  islazyLoad: PropTypes.oneOf([true, false]),
  isSwipe: PropTypes.oneOf([true, false]),
  isVariableWidth: PropTypes.oneOf([true, false]),
  isAutoplay: PropTypes.oneOf([true, false]),
  autoplaySpeed: PropTypes.number,
  isArrows: PropTypes.oneOf([true, false]).isRequired,
  isModal: PropTypes.oneOf([true, false]).isRequired,
  margin: PropTypes.number.isRequired,
  responsive: PropTypes.arrayOf(
    PropTypes.shape({
      breakpoint: PropTypes.number.isRequired,
      settings: PropTypes.object.isRequired,
    })
  ),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SlickSlider;
