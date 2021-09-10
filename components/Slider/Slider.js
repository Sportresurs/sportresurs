import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import PropTypes from "prop-types";
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
    dotsClass: cx("dotsBar", {
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

SlickSlider.defaultProps = {
  isDots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  isInfinite: false,
  speed: 500,
  islazyLoad: true,
  isSwipe: true,
  isVariableWidth: false,
  isArrows: true,
  responsive: null,
  isModal: false,
  spaceBetween: 30,
};

SlickSlider.propTypes = {
  isDots: PropTypes.oneOf([true, false]).isRequired,
  slidesToShow: PropTypes.number.isRequired,
  slidesToScroll: PropTypes.number.isRequired,
  isInfinite: PropTypes.oneOf([true, false]).isRequired,
  speed: PropTypes.number,
  islazyLoad: PropTypes.oneOf([true, false]).isRequired,
  isSwipe: PropTypes.oneOf([true, false]).isRequired,
  isVariableWidth: PropTypes.oneOf([true, false]),
  isArrows: PropTypes.oneOf([true, false]).isRequired,
  isModal: PropTypes.oneOf([true, false]).isRequired,
  spaceBetween: PropTypes.number,
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
