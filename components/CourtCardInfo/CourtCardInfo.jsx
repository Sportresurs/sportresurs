import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Rating from "../Rating/Rating";
import Button from "../Button";
import PlaygroundInfoRow from "../PlaygroundInfoRow";
import styles from "./CourtCardInfo.module.scss";

const CourtCardInfo = ({
  courtNumber,
  address,
  rating,
  color,
  showExtendedInfo,
  playgroundInfoFields,
  playground,
  isList = false,
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
      <Button size={"small"} variant={color}>
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
};

export default CourtCardInfo;
