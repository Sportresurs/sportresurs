import React, { useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from "react-magic-slider-dots";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import styles from "./Slider.module.scss";
import Arrow from "../../public/svg/sliderArrow.svg";
import useWindowSize from "../../utils/hooks/findWindowSize";

const cx = classnames.bind(styles);

const SlickSlider = ({
  children,
  isDots,
  slidesToShow,
  slidesToScroll,
  slideIndex,
  setChildClicked,
  speed,
  isInfinite,
  isLazyLoad,
  isSwipe,
  isVariableWidth,
  isAutoplay,
  autoplaySpeed,
  withArrows,
  responsive,
  isModal,
  isArrowColorBlack,
  arrayLength,
  classNameBox,
  classNameArrow,
  classNameDots,
  classNameDotsModal,
}) => {
  const size = useWindowSize();
  const slider = useRef();

  useEffect(() => {
    slider.current.slickGoTo(Number(slideIndex));
  }, [slideIndex]);

  function setWidthOfDot(isForModal, windowSize) {
    let dotWidth = 29;
    if (isForModal && windowSize > 767) {
      dotWidth = 29;
    }
    if (isForModal && windowSize < 768) {
      dotWidth = 20;
    }
    if (isForModal === false && windowSize > 767) {
      dotWidth = 33;
    }
    if (isForModal === false && windowSize < 768) {
      dotWidth = 28.5;
    }

    return dotWidth;
  }

  const widthOfDot = useMemo(
    () => setWidthOfDot(isModal, size.width),
    [isModal, size]
  );

  const NextArrow = ({ onClick }) => (
    <button
      type="button"
      className={cx("arrow", classNameArrow, "next", {
        black: isArrowColorBlack,
      })}
      onClick={onClick}
      style={{ display: onClick === null ? "none" : "block" }}
    >
      <Arrow className={styles.arrowIcon} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      type="button"
      className={cx("arrow", classNameArrow, "prev", {
        black: isArrowColorBlack,
      })}
      onClick={onClick}
      style={{ display: onClick === null ? "none" : "block" }}
    >
      <Arrow className={styles.arrowIcon} />
    </button>
  );

  const settings = {
    dotsClass: cx("dotsWrap", classNameDots, {
      modal: isModal === true,
      [classNameDotsModal]: isModal === true,
    }),
    dots: isDots,
    slidesToShow,
    slidesToScroll,
    slideIndex,
    speed,
    infinite: isInfinite,
    lazyLoad: isLazyLoad,
    swipe: isSwipe,
    variableWidth: isVariableWidth,
    autoplay: isAutoplay,
    autoplaySpeed,
    arrows: withArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive,
    afterChange(current) {
      if (setChildClicked) {
        return children.length
          ? setChildClicked(Number(children[current].key))
          : null;
      }
      return null;
    },
    appendDots(dots) {
      return (
        <div>
          <MagicSliderDots
            dots={dots}
            numDotsToShow={arrayLength > 5 ? 5 : arrayLength}
            dotWidth={widthOfDot}
            dotContainerClassName={cx("dotsBar")}
          />
        </div>
      );
    },
  };

  return (
    <div className={classnames(styles.sliderWrap, classNameBox)}>
      <Slider ref={slider} {...settings}>
        {children}
      </Slider>
    </div>
  );
};

SlickSlider.defaultProps = {
  isDots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  slideIndex: 0,
  isInfinite: false,
  speed: 500,
  isLazyLoad: true,
  isSwipe: true,
  isVariableWidth: false,
  isAutoplay: false,
  autoplaySpeed: 3000,
  withArrows: true,
  responsive: null,
  isModal: false,
  isArrowColorBlack: false,
};

SlickSlider.propTypes = {
  isDots: PropTypes.oneOf([true, false]),
  slidesToShow: PropTypes.number.isRequired,
  slidesToScroll: PropTypes.number.isRequired,
  isInfinite: PropTypes.oneOf([true, false]),
  speed: PropTypes.number,
  isLazyLoad: PropTypes.oneOf([true, false]),
  isSwipe: PropTypes.oneOf([true, false]),
  isVariableWidth: PropTypes.oneOf([true, false]),
  isAutoplay: PropTypes.oneOf([true, false]),
  autoplaySpeed: PropTypes.number,
  slideIndex: PropTypes.number,
  withArrows: PropTypes.oneOf([true, false]).isRequired,
  isModal: PropTypes.oneOf([true, false]).isRequired,
  isArrowColorBlack: PropTypes.oneOf([true, false]),
  arrayLength: PropTypes.number.isRequired,
  responsive: PropTypes.arrayOf(
    PropTypes.shape({
      breakpoint: PropTypes.number.isRequired,
      settings: PropTypes.object.isRequired,
    })
  ),
  classNameBox: PropTypes.string,
  classNameArrow: PropTypes.string,
  classNameDots: PropTypes.string,
  classNameDotsModal: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SlickSlider;
