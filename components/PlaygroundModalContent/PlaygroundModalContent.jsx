import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./PlaygroundModalContent.module.scss";
import Ratings from "../Rating";
import PlaygroundInfoRow from "../PlaygroundInfoRow";
import Tag from "../Tag";
import ContactUsButton from "../ContactUsButton";
import Slider from "../Slider";

const PlaygroundModalContent = ({ playground }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", field: "type" },
    { label: "Призначення", field: "purpose" },
    { label: "Метраж", field: "area" },
    { label: "Покриття", field: "covering" },
    { label: "Доступ", field: "access" },
    { label: "Час роботи", field: "opening" },
    { label: "Освітлення", field: "lighting" },
    { label: "Додатково", field: "additionally" },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <Slider
          slidesToShow={1}
          slidesToScroll={1}
          withArrows={true}
          isModal={true}
          classNameBox={styles.sliderBox}
          classNameDots={styles.dots}
          classNameDotsModal={styles.modalDots}
          isArrowColorBlack={false}
          arrayLength={playground.images.length}
        >
          {playground.images.map((img, i) => (
            <Image
              className={styles.bgImage}
              src={img}
              alt=""
              layout="responsive"
              key={i}
            />
          ))}
        </Slider>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={playground.color} text={playground.district} />
        </div>
        <h1 className={styles.heading}>Майданчик № {playground.courtNumber}</h1>
        <p className={styles.street}>вул. {playground.address}</p>
        <Ratings
          color={playground.color}
          readOnly={true}
          value={playground.rating}
        />
        <div className={styles.infoWrapper}>
          {playgroundInfoFields.map(({ label, field }) => (
            <PlaygroundInfoRow
              key={field}
              label={label}
              value={playground[field]}
            />
          ))}
        </div>
        <div className={styles.contactBtn}>
          <ContactUsButton shouldLockScreen={false} />
        </div>
      </div>
    </div>
  );
};

PlaygroundModalContent.propTypes = {
  playground: PropTypes.object,
};

export default PlaygroundModalContent;
