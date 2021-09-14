import React, { useState } from "react";
import image from "../PlaygroundItem/images/image.png";
import PlaygroundItem from "../PlaygroundItem";
import styles from "./PlaygroundsList.module.scss";

const PlaygroundsList = () => {
  const playgrounds = [
    {
      id: 23,
      address: "вул.Довженка 23 ",
      color: "green",
      district: "Шевченківський",
      type: "спортивний",
      covering: "штучна трава",
      opening: "08:00 - 22:00",
      rating: 4.5,
      img: image,
    },
    {
      id: 24,
      address: "вул.Довженка 24 ",
      color: "yellow",
      district: "Сихівський",
      type: "спортивний",
      covering: "штучна трава",
      opening: "08:00 - 22:00",
      rating: 4.5,
      img: image,
    },
    {
      id: 25,
      address: "вул.Довженка 25 ",
      color: "red",
      district: "Сихівський",
      type: "спортивний",
      covering: "штучна трава",
      opening: "08:00 - 22:00",
      rating: 4.5,
      img: image,
    },
  ];
  const [activeItemId, setActiveItemId] = useState(null);
  const handleClick = (id) => {
    setActiveItemId(id);
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapperHeading}>Майданчики поблизу</h1>
      <ul className={styles.list}>
        {playgrounds.map((playground) => (
          <li className={styles.listItem} key={playground.id}>
            <PlaygroundItem
              onModalOpen={onModalOpen}
              playground={playground}
              isActive={activeItemId === playground.id}
              handleClick={() => {
                handleClick(playground.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaygroundsList;
