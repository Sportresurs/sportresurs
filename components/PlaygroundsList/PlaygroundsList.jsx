import React, { useEffect, useState, createRef } from "react";
import PlaygroundItem from "../PlaygroundItem";
import styles from "./PlaygroundsList.module.scss";

const PlaygroundsList = ({ playgrounds, childClicked, setChildClicked }) => {
  const [activeItemId, setActiveItemId] = useState(null);
  const handleClick = (id) => {
    setActiveItemId(id);
  };

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(playgrounds.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [playgrounds]);

  useEffect(() => {
    setChildClicked(activeItemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItemId]);

  useEffect(() => {
    setActiveItemId(childClicked);
  }, [childClicked]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {playgrounds.map((playground, i) => (
          <li ref={elRefs[i]} className={styles.listItem} key={playground.id}>
            <PlaygroundItem
              refProp={elRefs[i]}
              playground={playground}
              isActive={
                Number(childClicked) === playground.id ||
                activeItemId === playground.id
              }
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
