import PropTypes from "prop-types";
import Image from "next/image";
import classNames from "classnames";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CourtCard.module.scss";
import Tag from "../Tag";
import CourtCardInfo from "../CourtCardInfo";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import getDistrictColor from "../../utils/getDistrictColor";
import placeholderImg from "../../public/img/placeholderImgCard.png";

export default function CourtCard({ courtInfo, variant = "topList" }) {
  const {
    district = "Інший",
    address = "Адреса не вказана",
    number = 0,
    rating = 3,
  } = courtInfo;

  const [images, setImages] = useState(null);

  const color = getDistrictColor(district);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/images/${courtInfo.id}`)
      .then(({ data }) => {
        setImages(data);
      });
  }, []);

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();

  const picture = new Blob(images, { type: ["image/jpg", "image/png"] });

  return (
    <>
      <div className={classNames(styles.card, styles[variant])}>
        <div className={styles.inner}>
          <div className={styles.district}>
            <Tag text={district} color={color}></Tag>
          </div>
          <Image
            className={styles.image}
            src={images ? images[0] : placeholderImg}
            alt="court"
            layout="fill"
          />
          <img src={picture} alt="playground" />

          <p className={styles.address}>{address}</p>
        </div>
        <div className={styles.outer}>
          <CourtCardInfo
            courtNumber={number}
            address={address}
            color={color}
            rating={rating}
            openModal={handleOpenModal}
          />
        </div>
      </div>
      <PlaygroundModal
        color={color}
        visible={isModalShown}
        onClose={handleCloseModal}
        playground={courtInfo}
      />
    </>
  );
}

CourtCard.propTypes = {
  courtInfo: PropTypes.shape({
    district: PropTypes.oneOf([
      "Шевченківський",
      "Франківський",
      "Личаківський",
      "Залізничний",
      "Сихівський",
      "Галицький",
      "Інший",
    ]).isRequired,
    address: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }),
  variant: PropTypes.oneOf(["topList", "courtList"]),
};
