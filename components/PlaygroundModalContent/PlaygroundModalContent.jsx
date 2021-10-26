import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./PlaygroundModalContent.module.scss";
import Ratings from "../Rating";
import PlaygroundInfoRow from "../PlaygroundInfoRow";
import Tag from "../Tag";
import ContactUsButton from "../ContactUsButton";
import Slider from "../Slider";
import placeholderImage from "../../public/img/placeholderImgModal.png";

const PlaygroundModalContent = ({ playground, color }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", value: playground.type },
    {
      label: "Призначення",
      value: playground.Purposes.map((purpose, index, arr) =>
        index === arr.length - 1 ? purpose.title : `${purpose.title}, `
      ),
    },
    { label: "Метраж", value: playground.size },
    { label: "Покриття", value: playground.coating },
    { label: "Доступ", value: playground.access },
    {
      label: "Час роботи",
      value: `${playground.open_time.substring(
        0,
        5
      )} - ${playground.close_time.substring(0, 5)}`,
    },
    { label: "Освітлення", value: playground.light ? "є" : "немає" },
    { label: "Додатково", value: playground.additional },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        {playground.images ? (
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
        ) : (
          <Image
            src={placeholderImage}
            alt="placeholderImg"
            layout="responsive"
          ></Image>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={color} text={playground.district} />
        </div>
        <h1 className={styles.heading}>Майданчик № {playground.number}</h1>
        <p className={styles.street}>{playground.address}</p>
        <Ratings color={color} readOnly={true} value={playground.rating} />
        <div className={styles.infoWrapper}>
          {playgroundInfoFields.map(({ label, value }) => (
            <PlaygroundInfoRow key={value} label={label} value={value} />
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
