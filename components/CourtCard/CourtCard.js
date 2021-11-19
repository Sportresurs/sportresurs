import PropTypes from "prop-types";
import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./CourtCard.module.scss";
import Tag from "../Tag";
import CourtCardInfo from "../CourtCardInfo";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import getDistrictColor from "../../utils/getDistrictColor";
import placeholderImg from "../../public/img/placeholderImgCard.png";
import getPicture from "../../utils/getImageFromDB";

export default function CourtCard({ courtInfo, variant = "topList" }) {
  const {
    district = "Інший",
    address = "Адреса не вказана",
    number = 0,
    rating = 3,
  } = courtInfo;

  const color = getDistrictColor(district);

  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    getPicture(courtInfo.id, setIsImage);
  }, []);

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();

  return (
    <>
      <div className={classNames(styles.card, styles[variant])}>
        <div className={styles.inner}>
          <div className={styles.district}>
            <Tag text={district} color={color}></Tag>
          </div>
          <Image
            className={styles.image}
            src={
              isImage
                ? `${process.env.NEXT_PUBLIC_HOST}api/images/${courtInfo.id}`
                : placeholderImg
            }
            alt="court"
            layout="fill"
            unoptimized={!!isImage}
          />
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
