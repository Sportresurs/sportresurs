import React from "react";
import Slider from "../Slider";
import styles from "./PlaygroundsSlider.module.scss";
import PlaygroundItem from "../PlaygroundItem";

const PlaygroundsSlider = ({
  playgrounds,
  markerIndex,
  setChildClicked,
  childClicked,
}) => (
  <div className={styles.sliderWrapper}>
    <Slider
      childClicked={childClicked}
      setChildClicked={setChildClicked}
      slideIndex={markerIndex}
      isModal={false}
      slidesToShow={1}
      withArrows={true}
      isArrowColorBlack={true}
      isDots={false}
      arrayLength={playgrounds.length}
      slidesToScroll={1}
      classNameBox={styles.sliderBox}
      classNameArrow={styles.customArrow}
    >
      {playgrounds.map((playground) => (
        <div key={playground.id}>
          <PlaygroundItem playground={playground} />
        </div>
      ))}
    </Slider>
  </div>
);

export default PlaygroundsSlider;
