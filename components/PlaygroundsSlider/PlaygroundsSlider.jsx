import React from "react";
import Slider from "../Slider";
import styles from "./PlaygroundsSlider.module.scss";
import PlaygroundItem from "../PlaygroundItem";

const PlaygroundsSlider = ({ playgrounds, markerIndex, setChildClicked }) => (
  <div className={styles.sliderWrapper}>
    <Slider
      setChildClicked={setChildClicked}
      slideIndex={markerIndex}
      isModal={false}
      slidesToShow={1}
      isArrows={true}
      isArrowColorBlack={true}
      isDots={false}
      arrayLength={playgrounds.length}
      slidesToScroll={1}
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
