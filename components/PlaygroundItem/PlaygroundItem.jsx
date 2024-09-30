import { useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import CourtCardInfo from "../CourtCardInfo";
import styles from "./PlaygroundItem.module.scss";
import Tag from "../Tag";
import useWindowSize from "../../utils/hooks/findWindowSize";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";

import handleImgError from "../../utils/handleImgError";

const PlaygroundItem = ({ playground, isActive, handleClick, refProp }) => {
  const playgroundInfoFields = [
    { label: "Тип", field: "type" },
    { label: "Графік", field: "opening" },
    { label: "Покриття", field: "covering" },
  ];

  const { color, name } = playground?.District || {
    color: "#f2ba4c",
    name: "Інший",
  };

  const screenWidth = useWindowSize().width;
  useEffect(() => {
    if (isActive && screenWidth > 950) {
      // eslint-disable-next-line no-unused-expressions
      refProp?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [screenWidth, isActive, refProp]);

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();

  const src = `${process.env.NEXT_PUBLIC_HOST}api/images/${playground.id}`;

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            onError={handleImgError}
            className={styles.bgImage}
            src={src}
            alt=""
            layout="fill"
            unoptimized={true}
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={color} text={name} />
        </div>
        <CourtCardInfo
          rating={playground.rating}
          color={color}
          address={playground.address}
          courtNumber={playground.number}
          playground={playground}
          showExtendedInfo={isActive}
          playgroundInfoFields={playgroundInfoFields}
          isList={true}
          openModal={handleOpenModal}
        />
      </div>
      <PlaygroundModal
        visible={isModalShown}
        onClose={handleCloseModal}
        playground={playground}
      />
    </div>
  );
};

PlaygroundItem.propTypes = {
  playground: PropTypes.object,
  isActive: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default PlaygroundItem;
