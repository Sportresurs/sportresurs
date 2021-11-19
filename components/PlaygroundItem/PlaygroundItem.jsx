import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import CourtCardInfo from "../CourtCardInfo";
import styles from "./PlaygroundItem.module.scss";
import Tag from "../Tag";
import useWindowSize from "../../utils/hooks/findWindowSize";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import getDistrictColor from "../../utils/getDistrictColor";
import placeholderImg from "../../public/img/placeholderImgCard.png";
import getPicture from "../../utils/getImageFromDB";

const PlaygroundItem = ({ playground, isActive, handleClick, refProp }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", field: "type" },
    { label: "Графік", field: "opening" },
    { label: "Покриття", field: "covering" },
  ];

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
  const color = getDistrictColor(playground.district);

  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    getPicture(playground.id, setIsImage);
  }, []);

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.bgImage}
            src={
              isImage
                ? `${process.env.NEXT_PUBLIC_HOST}api/images/${playground.id}`
                : placeholderImg
            }
            alt=""
            layout="fill"
            unoptimized={!!isImage}
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={color} text={playground.district} />
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
        color={color}
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
