import React, { useState } from "react";
import PlaygroundItem from "../PlaygroundItem";
import styles from "./PlaygroundsList.module.scss";

const PlaygroundsList = ({ playgrounds }) => {
  const [activeItemId, setActiveItemId] = useState(null);
  const handleClick = (id) => {
    setActiveItemId(id);
  };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {playgrounds.map((playground) => (
          <li className={styles.listItem} key={playground.id}>
            <PlaygroundItem
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
