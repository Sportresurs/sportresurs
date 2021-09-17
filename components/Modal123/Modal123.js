import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Modal123.module.scss";
import Search from "../SearchOnMap";

const cx = classNames.bind(styles);

const Modal123 = () => {
  const [coord, setCoord] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.box}>
      <Search setCoordinates={setCoord} onToggle={handleToggleModal} />
      {coord && (
        <div>
          <p>Lat: {coord.lat}</p>
          <p>Lng: {coord.lng}</p>
        </div>
      )}
      <div
        className={cx("modal", {
          open: isOpen,
        })}
      ></div>
    </div>
  );
};

export default Modal123;
