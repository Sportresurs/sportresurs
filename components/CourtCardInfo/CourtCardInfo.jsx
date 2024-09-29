import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Rating from "../Rating/Rating";
import Button from "../Button";
import PlaygroundInfoRow from "../PlaygroundInfoRow";
import styles from "./CourtCardInfo.module.scss";
import image from "../../public/img/court-placeholder.jpg";

const playground = {
  id: 1,
  address: "Тернопільська, 13а, Львів",
  districtColor: "yellow",
  district: "Сихівський",
  type: "спортивний",
  purpose: "не зазначено",
  area: "1630 м. кв.",
  covering: "штучна трава",
  access: "безкоштовний",
  opening: "08:00 - 22:00",
  lighting: "є",
  additionally:
    "огорожа, ворота, тенісний стіл, вуличні тренажери,смітники, лавки, комерційні години (бронювання за телефоном)",
  img: image,
};

const CourtCardInfo = ({
  courtNumber,
  address,
  rating,
  color,
  showExtendedInfo,
  playgroundInfoFields,
  isList = false,
  openModal,
}) => {
  const addressStyleWrapper = classNames(styles.addressOuter, {
    [styles.addressList]: isList,
  });

  return (
    <>
      <p className={styles.courtNumber}>майданчик №{courtNumber}</p>
      <p className={addressStyleWrapper}>{address}</p>
      <div className={styles.ratingOuter}>
        <Rating readOnly={true} value={rating} color={color} />
      </div>
      {showExtendedInfo ? (
        <div className={styles.infoWrapper}>
          {playgroundInfoFields.map(({ label, field }) => (
            <PlaygroundInfoRow
              key={field}
              label={label}
              value={playground[field]}
              isList={isList}
            />
          ))}
        </div>
      ) : null}
      <Button size="small" color={color} onClick={openModal}>
        Детальніше
      </Button>
    </>
  );
};
CourtCardInfo.propTypes = {
  isList: PropTypes.bool,
  playground: PropTypes.object,
  playgroundInfoFields: PropTypes.arrayOf(PropTypes.object),
  showExtendedInfo: PropTypes.bool,
  courtNumber: PropTypes.number,
  address: PropTypes.string,
  rating: PropTypes.number,
  color: PropTypes.string,
  openModal: PropTypes.func,
};

export default CourtCardInfo;
