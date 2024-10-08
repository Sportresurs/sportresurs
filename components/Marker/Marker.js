import * as React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./Marker.module.scss";
import MapMarker from "../../public/svg/mapMarker.svg";
import DefaultMarker from "../../public/svg/defaultMarker.svg";
import selectIconPurpose from "./model/select-icon";
import UnbrokenDark from "../../public/svg/dark-unbroken.svg";

const Marker = ({
  courtPurpose,
  district,
  isCourtMarker,
  isUnbroken = false,
}) => {
  const groundIcon = selectIconPurpose(courtPurpose);

  const { color } = district;

  return (
    <>
      {isCourtMarker ? (
        <>
          {isUnbroken && <UnbrokenDark />}
          <button className={styles.btnMarker}>
            <MapMarker style={{ fill: color }} />

            <div className={styles.icon}>
              <Image src={groundIcon} alt="PIN" width={20} height={20} />
            </div>
          </button>
        </>
      ) : (
        <button className={styles.btnMarker}>
          <DefaultMarker />
        </button>
      )}
    </>
  );
};

Marker.defaultProps = {
  courtPurpose: [{ title: "футбольний" }],
  district: { name: "Шевченківський", color: "#d12421" },
  isCourtMarker: true,
};

Marker.propTypes = {
  courtPurpose: PropTypes.array.isRequired,
  district: PropTypes.object.isRequired,
  isCourtMarker: PropTypes.oneOf([true, false]).isRequired,
};

export default Marker;
