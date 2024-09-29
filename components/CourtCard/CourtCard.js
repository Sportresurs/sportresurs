import { useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import classNames from "classnames";
import placeholderImg from "../../public/img/placeholderImgCard.png";
import styles from "./CourtCard.module.scss";
import Tag from "../Tag";
import CourtCardInfo from "../CourtCardInfo";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import getDistrictColor from "../../utils/getDistrictColor";
import handleImgError from "../../utils/handleImgError";

export default function CourtCard({
  courtInfo,
  variant = "topList",
  addHashToUrl,
  removeHashFromUrl,
  urlHash,
}) {
  const {
    district = "Інший",
    address = "Адреса не вказана",
    id = 0,
    number = 0,
    rating = 3,
  } = courtInfo;

  const color = getDistrictColor(district);

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();

  useEffect(() => {
    if (!isModalShown && urlHash && urlHash.slice(1) === id) {
      // eslint-disable-line
      handleOpenModal();
    } else if (isModalShown && urlHash && urlHash.slice(1) !== id) {
      // eslint-disable-line
      handleCloseModal();
    }
  }, [urlHash, isModalShown, id, handleOpenModal, handleCloseModal]);

  const src = courtInfo.has_poster
    ? `${process.env.NEXT_PUBLIC_HOST}api/images/${courtInfo.id}`
    : placeholderImg.src;
  return (
    <>
      <div className={classNames(styles.card, styles[variant])}>
        <div className={styles.inner}>
          <div className={styles.district}>
            <Tag text={district} color={color}></Tag>
          </div>
          <Image
            onError={handleImgError}
            className={styles.image}
            src={src}
            alt="court"
            layout="fill"
            unoptimized={true}
          />
          <p className={styles.address}>{address}</p>
        </div>
        <div className={styles.outer}>
          <CourtCardInfo
            courtNumber={number}
            address={address}
            color={color}
            rating={rating}
            openModal={() => {
              addHashToUrl && addHashToUrl(); // eslint-disable-line
              handleOpenModal();
            }}
          />
        </div>
      </div>
      <PlaygroundModal
        color={color}
        visible={isModalShown}
        onClose={() => {
          removeHashFromUrl && removeHashFromUrl(); // eslint-disable-line
          handleCloseModal();
        }}
        playground={courtInfo}
      />
    </>
  );
}

CourtCard.propTypes = {
  courtInfo: PropTypes.shape({
    district: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }),
  variant: PropTypes.oneOf(["topList", "courtList"]),
};

CourtCard.defaultProps = {
  addHashToUrl: null,
  removeHashFromUrl: null,
  urlHash: "",
};
