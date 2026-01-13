/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import placeholderImg from "../../public/img/placeholderImgCard.png";
import styles from "./CourtCard.module.scss";
import Tag from "../Tag";
import CourtCardInfo from "../CourtCardInfo";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import handleImgError from "../../utils/handleImgError";

export default function CourtCard({ courtInfo, variant = "topList", isModal }) {
  const router = useRouter();
  const {
    District,
    address = "Адреса не вказана",
    id,
    title = "",
    rating = 3,
  } = courtInfo;

  const { color, name } = District || { color: "#f2ba4c", name: "Інший" };

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();

  const handleAction = () => {
    if (isModal) {
      handleOpenModal();
    } else {
      router.push(`/playground/${id}`);
    }
  };

  const src = courtInfo.imageCount > 0
    ? `${process.env.NEXT_PUBLIC_HOST}api/images/${courtInfo.id}`
    : placeholderImg.src;

  return (
    <>
      <div
        className={classNames(styles.card, styles[variant])}
        onClick={handleAction}
      >
        <div className={styles.inner}>
          <div className={styles.district}>
            <Tag text={name} color={color}></Tag>
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
            title={title}
            address={address}
            color={color}
            rating={rating}
            openModal={() => {
              handleAction();
            }}
          />
        </div>
      </div>
      {isModal && (
        <PlaygroundModal
          visible={isModalShown}
          onClose={() => {
            handleCloseModal();
          }}
          playground={courtInfo}
          isModal={isModal}
        />
      )}
    </>
  );
}

CourtCard.propTypes = {
  courtInfo: PropTypes.shape({
    District: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    number: PropTypes.number,
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }),
  variant: PropTypes.oneOf(["topList", "courtList"]),
  isModal: PropTypes.bool.isRequired,
};

CourtCard.defaultProps = {
  addHashToUrl: null,
  removeHashFromUrl: null,
  urlHash: "",
  isModal: true,
};
