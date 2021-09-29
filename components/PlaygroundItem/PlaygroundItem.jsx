import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import CourtCardInfo from "../CourtCardInfo";
import styles from "./PlaygroundItem.module.scss";
import Tag from "../Tag";
import useWindowSize from "../../utils/hooks/findWindowSize";

const PlaygroundItem = ({ playground, isActive, handleClick, refProp }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", field: "type" },
    { label: "Графік", field: "opening" },
    { label: "Покриття", field: "covering" },
  ];

  const screenWidth = useWindowSize().width;

  if (isActive && screenWidth > 950) {
    // eslint-disable-next-line no-unused-expressions
    refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }
  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.bgImage}
            src={playground.img}
            alt=""
            layout="fill"
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={playground.color} text={playground.district} />
        </div>
        <CourtCardInfo
          rating={playground.rating}
          color={playground.color}
          address={playground.address}
          courtNumber={playground.id}
          playground={playground}
          showExtendedInfo={isActive}
          playgroundInfoFields={playgroundInfoFields}
          isList={true}
        />
      </div>
    </div>
  );
};

PlaygroundItem.propTypes = {
  playground: PropTypes.object,
  isActive: PropTypes.bool,
  handleClick: PropTypes.func,
  refProp: PropTypes.object,
};

export default PlaygroundItem;
